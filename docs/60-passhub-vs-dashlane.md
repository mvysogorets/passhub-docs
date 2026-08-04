---
sidebar_label: "PassHub vs Dashlane"
sidebar_position: 60
---

# PassHub vs Dashlane

_December 2021_

Dashlane is a popular password manager with about 15 million users. Dashlane can store a wide range of user private data including passwords, security notes, files, bank cards and accounts, and many types of IDs.
Dashlane features a user-friendly interface that is both nice looking and easy to understand.

### Pricing

Dashlane has three different plans for the end-user.

- The free tier is rather lean - up to 50 passwords, no file storage, no security notes, and only one device. You can move your account from one device to another, but the burden of the transfer and limited amount of passwords you can keep in Dashlane prevents any practical use of this free plan.

- The premium and family plans ($5/month) give unlimited passwords and up to 1 GB of file storage.

:::note PassHub.net

PassHub free plan includes 200 records and 100 MB storage. With a premium account you get 1 GB of file space for $4/month. There are no limits on the number of devices you can use with your PassHub.net account.

:::

### Record groups

Dashlane has no concept of folders. The only available attribute of the records is a “category” – business, shopping, entertainment, etc.

:::note PassHub.net

PassHub.net fully implements the tree-like folders and subfolders model. This fine structure brings full import/export compatibility with e.g. Keepass - a well-known password manager app with local storage.

:::

### Sharing

Dashlane shares records on a per-item basis. You cannot share a group of credentials in a single step. The recipient gets either limited or full rights. With limited rights, the recipient cannot see passwords, it is only possible to login with form Autofill (see [Security and Privacy Pitfalls](#security-and-privacy-pitfalls)).

:::note PassHub.net

As opposed to sharing individual items, PassHub.net's minimum shareable unit is a top-level folder, called a "safe". The safe becomes a "common space" to keep sensitive information of the involved users. For example, when Alice wants to share a record with Bob, she creates a safe named "Bob" and puts one or more records (passwords, notes or files) in it. Later on, Bob can put his documents into the safe so Alice can use them.

A safe shared with a group of users provides a robust solution for IT departments and for "Virtual Data Rooms".

:::

### File Storage

Files in Dashline are attachments in Secure Notes.

The way Dashlane implements file storage is, unfortunately, really disappointing.

The first problem is that Dashlane does not support arbitrary file types. The list of allowed types only includes mainstream files: DOCX, PDF, JPG/PNG, ZIP, etc. For all the other types (e.g., XML, CRT, MD, JSON) Dashlane shows an error dialog reading "File type not supported".

Hence it is not possible to store and share files like SSL certificates and private keys &ndash; the most sensitive information in IT departments.

Another issue is that it is not possible to share files. Users cannot use Dashlane's security features and client-side encryption to share sensitive files with their family, partners or customers.

:::note PassHub.net

Passhub.net's file storage is a real relief in this situation. File storage is available on all platforms, all browsers, and for all file types.
Files are shared the same way as other records in a safe. Moreover, to view the content of PDF and image files, you do not need to download them first to the local disk. The "in-memory view" option keeps your disk clean and free from sensitive documents.

Passhub.net's file storage combined with fine-grained sharing control allows a user to exchange documents and to implement the functionality of a "virtual data room" or just keep and share scans of your personal documents with family members.

:::

### Authentication

To sign in to Dashlane, a user provides an email and a master password. For new devices, a 6-digit verification code is sent to the registered email. It is not possible to change the email after account creation. Hint: do not use an email address you can lose (say, your college or work emails).

A user can add a second factor – TOTP (Google Authenticator, for example) and/or the U2F Yubico hardware token (premium only). However, Dashlane has no plans to support U2F in the future.

:::note PassHub.net

PassHub.net's multifactor authentication, based on WWPass technology, is not a premium feature. It's the very point where security starts. As a part of the strong authentication process, the WWPass Key provides a cipher key for client-side encryption. The key has true 256-bit entropy, not known to the user, and cannot be derived from any master password or similar credentials.

WWPass authentication is fully anonymous for both the WWPass network and PassHub.net web servers. The client-side encryption key is also not known to WWPass or PassHub.net servers. Being fundamental to the PassHub.net architecture, the WWPass strong multifactor authentication is included both in free and premium plans.

:::

### Security and Privacy Pitfalls

Dashlane has some security and privacy pitfalls. Here are three of them.

1. When a password record is shared with a user with limited rights, the password itself is shown as a string of stars and is not visible to the recipient. The "Show Password" control is disabled. However, a curious user with a little knowledge of web technology may reveal the password in a short time.

2. While the password records are client-side encrypted and their content is not known to Dashlane, the URL of the website is sent to Dashlane servers unencrypted. We can assume that the reason is to obtain a logo of the site. That means Dashlane knows the addresses of all the sites you store in your account.

3. Using an email as a username, while widely used, is an additional attribute that can be used to link your accounts to independent websites and services.

:::note PassHub.net

PassHub.net does not show website favicons because the way they are obtained may infringe user privacy.

:::

### Import and Export

Dashlane has its own proprietary backup format (DASH). For all other purposes, CSV files are used.

### Dashlane to PassHub.net Migration

At the date of writing, it is only possible to migrate Password records.

**Dashlane:**

Go to Settings (My account), select the “Export data” item. Click the “Export to CSV” button. Dashlane creates and stores a ZIP file with different types of records packed into separate CVS files. Unzip the archive to get the _credentials.csv_ file.

**PassHub:**

Go to Account, Import, select "Import into a new safe". Drag and drop (or use Browse button) the _credentials.csv_ file. Click the "Import" button.
