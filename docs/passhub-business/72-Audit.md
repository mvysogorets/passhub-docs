---
sidebar_label: "Audit"
sidebar_position: 72
---


# Audit

## Internal Logs

To access Passhub event logs, click the `Audit` link on the admin page.

You can use filters to view a particular user or event type, and to define the time window. You can also sort records by any column.

## Microsoft Sentinel SIEM

If your company relies on a centralized SIEM (Security Information and Event Management), you may connect the Passhub instance to the company's Sentinel.

Here are the main steps to configure the Passhub to Sentinel connection:

1. Azure: Register an external app in the Azure tenant
2. Azure: Define the information flow and set the data exchange format
3. Passhub: Add the connection parameters obtained in the above steps to the Passhub configuration


You may already be familiar with the first two steps (provided you already use Sentinel). If so, skip the next two sections.

Please note that the steps described in the following text may change over time, as Azure evolves.


### 1. Register your Passhub Application

1. From Azure Home select **App Registration > New Registration**
2. Set the name of the app (e.g. "myPasshub SIEM connector") and check that "Single tenant only" is set in the account type, click **Register** button

You will be presented with a set of the following constants

-------------


**Display name**: myPasshub SIEM Connector

**Application (client) ID:** cccccccc-cccc-cccc-cccc-cccccccccccc

**Directory (tenant) ID:** tttttttt-tttt-tttt-tttt-tttttttttttt

Client credentials: Add a certificate or secret

.....

-----------

Now click the **Client Credentials** link, go to the **New client secret** page, and copy the **Value** field ssssssssssssss immediately (it is shown only once).

### 2. Define data flow and custom table

#### Create the Data Collection Endpoint (DCE)

1. Search for "Data Collection Endpoints" in the Azure page's top search bar
2. Click `+Create`
3. Use an existing resource group or create a new one (e.g. `my-test-dce`) and set the resource group to `Sentinel`
   
4. Click **Review + Create**
5. On the next page, click **Create**
6. When the new DCE appears in the DCE list, click on its link, and get the **Log ingestion** parameter:
   
   https://*the-dce-name*-igcm.eastus-1.ingest.monitor.azure.com


#### Create custom table (DCR-based)

1. Search for "Log Analytics workspaces" in the Azure page's top search bar
2. Create a new workspace, e.g. `ms-test-analytics-ws`
3. Once created, go to the resource
4. On the left pane select **Settings -> Tables**; the "Create a custom log" page opens
5. Set the name `myTest` (Azure adds a `_CL` suffix automatically), select the `Basic` plan (reasonably billed), select the freshly created DCE (e.g. `my-test-dce`), and set the new DCR to `myTestDCR`
6. Click Next -> Schema: Upload a log JSON example
7.
   ```json
   {
       "TimeGenerated": "2026-07-22T17:30:37+00:00",
       "EventType": "iam_audit",
       "Source": "passhub",
       "Severity": "High",
       "Category": "identity_access_management",
       "Actor": "xyz@example.com",
       "Operation": "Login",
       "TargetUser": "",
       "Company": "example",
       "Group": "",
       "AccessCode": "",
       "SourceIp": "1.1.1.1",
       "UserAgent": "",
       "SessionId": "111",
       "ServerName": "phub"
   }
   ```

8. Get the DCR ID: **Home > Resource Groups > Sentinel**, select `myTestDCR`, and copy the **Immutable ID** `dcr-dddddddddddddddddd`
   
#### Get the stream name

**Resource Group > Sentinel**: Select your DCR. On the DCR page, select **Data Sources** on the left, then
switch to the `classic version` in the blue horizontal bar.

Read the Data Source name (starts with Custom_, ends with _CL): Custom-nnnnnnnnn_CL

### 3. Configure Passhub

Add the following constants, obtained above, to the Passhub configuration file:

```php
define('MS_SENTINEL_ENABLED', true);
define('MS_SENTINEL_TENANT_ID',"tttttttt-tttt-tttt-tttt-tttttttttttt");  
define('MS_SENTINEL_CLIENT_ID', "cccccccc-cccc-cccc-cccc-cccccccccccc");
define('MS_SENTINEL_CLIENT_SECRET',"ssssssssssssssssssssssssssssssssssssssss");
define('MS_SENTINEL_DCE_ENDPOINT', "https://*the-dce-name*-igcm.eastus-1.ingest.monitor.azure.com");
define('MS_SENTINEL_DCR_IMMUTABLE_ID', "dcr-dddddddddddd");
define('MS_SENTINEL_STREAM_NAME','Custom-nnnnnnnnn_CL'); // Data Source Name
```

Now, in addition to collecting events in its own database, Passhub will send each event's data to the Sentinel table.

