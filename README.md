# Bus Ticketing App

This is a [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

This app has been tested on the following devices:
- [Sunmi V2s_STGL](https://www.sunmi.com/en/v2s/) (Build #3.1.9)
  - Connected to [mitsuharu's React Native Library](https://www.npmjs.com/package/@mitsuharu/react-native-sunmi-printer-library)
  - Other possible libraries include: [januslo's](https://www.npmjs.com/package/react-native-sunmi-v2-printer), [hjfruit's](https://www.npmjs.com/package/react-native-printer-sunmi)  
- SOON [Noryox NB55S](https://www.noryox.com/product/handheld-pos-terminal-2/) (Build #1.0.9_B231214.144538)
  - As of now, it seems like the API for this is proprietary

Features that possibly can be implemented further:
- NFC Integration
- Integration with better database
- Passenger dashboard
- Multi-language support
- Support for additional printer models
- Added branding to the app
- Easier user flow
- Receipt header
Cnter-aligned header


# Environment Variables

The following environment variables (or constants) are required for proper operation:

 - `GOOGLE_APPS_SCRIPT_URL`: The endpoint for saving ticket data to Google Apps Script. Set this in `src/constants/googleAppsScriptConstants.ts`.
   Example: `export const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/.../exec';`

# Getting Started (developers)

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.
To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

# User Flow

1. **User opens the app** and is presented with the bus ticketing form.
2. **User fills out the form** and submits their ticket details.
3. On submission:
  - The app detects the device model (e.g., Sunmi V2s, generic Android, etc.).
  - If the device is supported (e.g., Sunmi V2s), the ticket is printed using the Sunmi printer library.
  - If the device is not supported, a generic print fallback is used (e.g., console log or alternate method).
  - The ticket data is also sent to a Google Apps Script endpoint for record-keeping.
4. **User receives a printed ticket and the data is saved remotely.**

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
