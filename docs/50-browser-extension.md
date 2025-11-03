---
sidebar_label: "Browser extension: autofill"
sidebar_position: 50
---

# Browser Extension for PassHub.net

As opposed to annoying password manager extensions, the PassHub extension is a non-intrusive tool to fill username/password fields in login forms and bank card data on payment pages.

By no means is the PassHub extension a silver bullet, but rather a semi-manual assistant that shows a choice of the appropriate accounts and fills usernames and passwords into login forms on websites. Automatic form filling is more about guessing, not about well-defined algorithms. Generally, the PassHub extension works on approximately 80% of sites. For other cases, use the basic Copy/Paste functionality within PassHub.net itself.


## Installation

### Chrome, Opera, Vivaldi..


On a desktop Chrome, Microsoft Edge, Opera, Vivaldi, Brave, and other Chromium-based browsers, follow this link: 
https://chrome.google.com/webstore/detail/passhub/bamjbfhfacpdkenilcibkmpdahkgfejh

Alternatively, go to the [Chrome Web Store](https://chrome.google.com/webstore/category/extensions) and find the PassHub.net extension. Click **Add to Chrome**.

NOTE: In the Chrome browser, pin the PassHub extension icon to the toolbar. To do so, click on the puzzle piece-shaped Extensions icon next to the account icon and then click the pushpin next to the PassHub extension.

![Chrome pin extension](/img/ChromePinExtension.png)

Jump to the section [how to use the extension](#how-to-use) below.


### Microsoft Edge

Microsoft has its own add-ons (extensions) repository; you can use the following link to install the Passhub add-on: 
https://microsoftedge.microsoft.com/addons/detail/passhubnet/epmmbjnnghpopnhkilkoomaahpinjpkc?hl=en-US

Alternatively, due to Microsoft Edge and Chrome extensions compatibility, you may use the Chrome extension: https://chrome.google.com/webstore/detail/passhub/bamjbfhfacpdkenilcibkmpdahkgfejh.

From the user point of view, the Edge and Chrome extensions are essentially identical, including the "pin" step, described above.  

Jump to the section [how to use the extension](#how-to-use) below.


### Safari Browser on Mac

To get the Safari extension, go to the Mac App Store https://apps.apple.com/ch/app/passhub-net/id6478985505?l=en-GB&mt=12 and install the app as usual. 

Next, go to the Safari menu and navigate to Safari > Settings (or Preferences).

Click Extensions.

Select the checkbox next to the extension's name (see https://support.apple.com/en-us/102343). 

![Safari enable extension](/img/safari_enable_extension.jpg)


The PassHub icon appears to the left of the page address. When Safari asks for the PassHub extension permissions, choose "Always Allow on Every Website.."

![Safari permissions](/img/safari_permissions.jpg)

## How To Use

The extension works in the presence of an open PassHub.net tab, as well as with business implementaions - \*.passhub.us or \*.passhub.eu. The browser extension communicates with the PassHub tab to find the appropriate credentials. You must be signed in to PassHub to use the extension.

#### 1. Autofill Login Form

Open the login page of the website you want to sign in to. Click the PassHub logo in the upper right corner. The extension consults the PassHub browser tab if appropriate accounts are stored for the current page URL. There may be more than one suitable account. All will be shown in the extension's pop-up.

Choose the desired account. When the login form is filled in, click the "Sign in" button on the form.

![PassHub Extension popup](/img/PassHubExtScreen640.png)

**NOTE:** Some sites use one page for the username and another for the password. Just click the browser extension icon on every page. The extension is smart enough to substitute proper credentials.

#### 2. Alternatively

You may click the website URL directly on the PassHub page or in the password record dialog.

![PassHub Alternative way](/img/UseExtension1.png)

The selected site tab then opens and the login form is automatically filled in.

![PassHub alternative login](/img/ExtensionAlternativeMethod2.png)

**NOTE:** Sometimes, the username/password form appears with some delay, so the last method only opens the login page but does not fill the form. Just continue by opening the extension popup as described above.

#### 3. Payment Card Autofill

When the extension icon is clicked on a page with a payment card form, the extension detects specific field names and shows a list of stored cards. Just select the desired card to autofill its data.

![Card autofill](/img/card-autofill.png)

## Firefox

Due to differences in browser architecture, the Firefox and Chrome/Safari extensions are different too. Particularly, the Firefox extension is more self-contained: you need to log in directly to the extension.

### Installation

On your desktop Firefox, open the link https://addons.mozilla.org/en-US/firefox/addon/passhub-net/.

Click the "Add to Firefox" button.

![Add Extension Page](/img/firefox-add-extension.png)

Confirm extension installation:

![Confirm Extension](/img/firefox-confirm-extension.png)

Now the PassHub icon appears in the upper right corner. It is safe to run the extension in incognito pages.

![Extension Icon](/img/firefox-extension-icon.png)

### Configuring the Extension

As opposed to the Chrome extension, the Firefox extension can only work with one predefined PassHub server. To use the extension with your own PassHub instance, do the following:

- Right-click on the extension icon and select the 'Manage Extension' item.

![Manage extension](/img/manage-extension.png)

- Select the 'Options' tab, enter the URL (or just a hostname) of the server and click the 'Change' button.

![Manage extension](/img/extension-dialog.png)

The new server name appears on the extension popup window.

### How To Use

Go to the login page of a site with credentials stored in PassHub.net. Click on the extension icon. If you are not logged in to the PassHub extension, the QR code will be shown. Scan the code with the WWPass Key app as usual.

![Extension Login](/img/firefox-extension-login.png)

When logged in, the PassHub extension shows the list of accounts available for the active page. Click to select the desired account.

![Extension advise](/img/firefox-extension-advise.png)

The extension fills in the login form with the selected credentials. You only have to press the "Sign-in" button.

![Form filled](/img/firefox-extension-form-filled.png)

As for payment card autofill, the Firefox extension and Chrome extension behave the same way; see the [Payment Card autofill](/doc/browser-extension#3-payment-card-autofill) section above.
