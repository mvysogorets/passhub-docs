---
sidebar_label: "Integrations"
sidebar_position: 50
---

# SIEM

## Microsoft Sentinel

How to Connect Passhub to the Microsoft Sentinel in your Azure account

### Register you Passhub Application:

1. From Azure Home select **App Registration > New Registration**
2. Set the name of the app (e.g. "myPasshub SIEM connector") and check that "Single tenant only" is set in the account type, click **Register** button

You will be presented with a set of the following constants

**Display name**: myPasshub SIEM Connector

**Application (client) ID:** cccccccc-cccc-cccc-cccc-cccccccccccc

Object ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

**Directory (tenant) ID:** tttttttt-tttt-tttt-tttt-tttttttttttt

Supported account types: My organization only

Client credentials: Add a certificate or secret

Redirect URIs: Add a Redirect URI

Application ID URI: Add an Application ID URI

Managed application in local directory: Demo Passhub SIEM Connector2

State: Activated


Now click on **Client Credentials** link get to the page **New client secret** and copy the **Value** field ssssssssssssss immediately (it is shown only once) 


### Create the Data Collection Endpoint (DCE)

1. Search "Data Collection Endpoints" on the Azure page top searcg bar
2. Click +Create
3. Use existing or create a new resource group (I enetred Endpoint Name: mv-test-dce and a set resource group to sentinel)
   
4. click Review + Create 
5. Click Create
6. When the new DCE appears in the DCE list, clink on its link, and get **Log ingestion** parameter:https://*the-dce-name*-igcm.eastus-1.ingest.monitor.azure.com


### Create custom table (DCR-based)

1. Search "Log Analytics workspaces" on the Azure page top searcg bar
2. Create ms-test-analytics-ws
3. When created, go to resource
4. On the left pane select **Setting -> Tables** -> page "Create a custom log" opens
5. Set the name `myTest` (Azure adds  a `_CL` suffix automatially), `Basic` plan (reasonably billed), select the freshly created DCE (mvv-test-dce), and set new DCR  `mvTestDCR`,
6. Click Next -> Schema: Upload log JSON example
7.   {
            "TimeGenerated": "2026-07-22T17:30:37+00:00",
            "EventType": "iam_audit",
            "Source": "passhub",
            "Severity": "High",
            "Category":"identity_access_management",
            "Actor": "xyz@example.com,
            "Operation": "Login",
            "TargetUser": ",
            "Company": => "exаmple",
            "Group":"",
            "AccessCode":"",
            "SourceIp":"1.1.1.1",
            "UserAgent": "",
            "SessionId" "111",
            "ServerName": "phub",
 };

8. Get DCR ID: **Home > Resource Groups > Sentinel** Select mvTestDCR, copy **Immutable ID** `dcr-dddddddddddddddddd`
   
Get the stream name

**Resource Group > Sentinel** Select your DCR; On the DCR page select **Data Sources** on the left; 
Swicth to the `classic version` in the blue horizontal bar

Read the Data Source name ( starts with Custom_, ends with _CL): Custom-nnnnnnnnn_CL




### Configure Passhub instance to communicate with Sentinel

Now we are ready to add the connection parameters to the Passhub configuration file:

```php
define('MS_SENTINEL_ENABLED', true);
define('MS_SENTINEL_TENANT_ID',"tttttttt-tttt-tttt-tttt-tttttttttttt");  
define('MS_SENTINEL_CLIENT_ID', "cccccccc-cccc-cccc-cccc-cccccccccccc");
define('MS_SENTINEL_CLIENT_SECRET',"ssssssssssssssssssssssssssssssssssssssss");
define('MS_SENTINEL_DCE_ENDPOINT', "https://passhubendpoint-dw8j.eastus-1.ingest.monitor.azure.com");
define('MS_SENTINEL_DCR_IMMUTABLE_ID', "dcr-dddddddddddd");
define('MS_SENTINEL_STREAM_NAME','Custom-PasshubAuditLogs_CL'); // Data Source Name
```
With the folowing  name conversion


`MS_SENTINEL_TENANT_ID` - **Directory (tenant) ID**<br/>
`MS_SENTINEL_CLIENT_ID` - **Application (client) ID**<br/>
`MS_SENTINEL_CLIENT_SECRET` - use the **Value** (not the **Secret ID**) secret obtained on the Azure page **Certificates & secrets**


-------------------------------

## Setup Instructions

### 1. Create the Log Analytics custom table, DCE, and DCR

1. In the Azure Portal, open (or create) the Log Analytics workspace linked to your Microsoft Sentinel instance.
(**???????????????????????????????????????????**)

-------------------------------


2. Create a **Data Collection Endpoint (DCE)** in the same region as the workspace.
3. Create a custom table (e.g. `PassHubAuditLogs_CL`) via **Tables > Create > New custom log (DCR-based)**, using the JSON sample above as the schema source, and select the DCE created above.
4. Note the **Data Collection Rule (DCR) Immutable ID** and the stream name generated for the table (typically `Custom-PassHubAuditLogs_CL`).
5. Note the DCE's **Logs ingestion** URL (looks like `https://<dce-name>-xxxx.<region>.ingest.monitor.azure.com`).

### 2. Create an Azure AD App Registration

1. In **Microsoft Entra ID > App registrations**, create a new app registration (e.g. "PassHub SIEM Connector").
2. Create a **client secret** under **Certificates & secrets** and record its value immediately.
3. Note the **Application (client) ID** and **Directory (tenant) ID**.
4. On the Data Collection Rule created above, go to **Access control (IAM)** and assign the app registration the **Monitoring Metrics Publisher** role.

### 3. PassHub Configuration

Edit your PassHub configuration file (`config/config.php`) and add:

```php
// Enable Microsoft Sentinel connector
define('MS_SENTINEL_ENABLED', true);

// Azure AD app registration (client credentials flow)
define('MS_SENTINEL_TENANT_ID', 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX');
define('MS_SENTINEL_CLIENT_ID', 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX');
define('MS_SENTINEL_CLIENT_SECRET', 'your_client_secret_here');

// Data Collection Endpoint ingestion URL
define('MS_SENTINEL_DCE_ENDPOINT', 'https://your-dce.ingest.monitor.azure.com');

// Data Collection Rule immutable ID
define('MS_SENTINEL_DCR_IMMUTABLE_ID', 'dcr-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');

// Stream name mapped to the custom table (must end in "_CL")
define('MS_SENTINEL_STREAM_NAME', 'Custom-nnnnnnnnn_CL');
```

### 4. Test the Integration

1. Restart your web server after configuration changes.
2. Perform a test IAM operation (e.g., invite a user).
3. Check PassHub logs (`LOG_DIR/siem-*.log`) for successful transmission messages.
4. In Log Analytics, run `PassHubAuditLogs_CL | take 10` to confirm events are arriving (ingestion can take a few minutes the first time).

## Event Severity Levels

Same severity mapping as the CrowdStrike connector:

**High Severity:** `deleteAccount`, `statusAdmin`, `statusDisabled`, `Delete group`, `deleteInvitation`

**Medium Severity:** `statusActive`, `Create account`, `addCompany`, `setCompanyProfile`

**Low Severity:** all other operations (invitations, group membership changes, etc.)

## Error Handling and Monitoring

### Logging

- Success: `LOG_DIR/siem-YYMMDD.log`
- Errors: `LOG_DIR/passhub-YYMMDD.err`

**Important**: SIEM integration failures do not affect PassHub's core audit logging functionality. Events are always stored in the local MongoDB `audit` collection regardless of Sentinel connectivity.

## Troubleshooting

1. **Events not appearing in Sentinel/Log Analytics**
   - Confirm the app registration has the `Monitoring Metrics Publisher` role on the DCR.
   - Verify the DCE endpoint, DCR immutable ID, and stream name are correct.
   - Check PassHub error logs for HTTP status codes returned by the ingestion API.
2. **Authentication failures (HTTP 401/403)**
   - Verify tenant ID, client ID, and client secret.
   - Confirm the client secret has not expired.
3. **Ingestion failures (HTTP 4xx from the DCE)**
   - Ensure the JSON payload fields match the custom table schema exactly (column names/types).

## Security Considerations

1. Store the Azure AD client secret securely; rotate it periodically.
2. Use the least-privilege role (`Monitoring Metrics Publisher`) scoped to the DCR only, not the whole subscription.
3. Restrict access to `config/config.php`.
4. Use TLS (enforced by the ingestion endpoint) for all traffic.

## Version History

- **v1.0**: Initial Microsoft Sentinel integration
  - Real-time IAM event forwarding via Azure Monitor Logs Ingestion API
  - Azure AD OAuth2 client-credentials authentication with token refresh
  - Configurable severity levels
  - Comprehensive error handling and logging
