# @capplugins/capacitor-meta-sdk

Capacitor plugin for Meta SDK integration. Fully typesafe, modular, and designed to support standard App Events, Purchases, and Advanced Matching via the Conversions API.

## Install

```bash
npm install @capplugins/capacitor-meta-sdk
npx cap sync
```

## Configuration

It is highly recommended to inject your Meta App ID and Client Token via Environment Variables or programmatic initialization.

### iOS

If you are using programmatic initialization, no `Info.plist` changes are strictly required as you will pass the credentials via `initialize()`.

However, if you want Facebook to auto-initialize or if you use deep linking, add the following to your `Info.plist`:

```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
  <key>CFBundleURLSchemes</key>
  <array>
    <string>fb[YOUR_APP_ID]</string>
  </array>
  </dict>
</array>
<key>FacebookAppID</key>
<string>[YOUR_APP_ID]</string>
<key>FacebookClientToken</key>
<string>[YOUR_CLIENT_TOKEN]</string>
<key>FacebookDisplayName</key>
<string>[YOUR_APP_NAME]</string>
```

_Note: You can use `xcconfig` files to inject these `[YOUR_APP_ID]` values via CI/CD environment variables._

### Android

In your `android/app/src/main/AndroidManifest.xml`, add the following inside the `<application>` tag:

```xml
<meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id"/>
<meta-data android:name="com.facebook.sdk.ClientToken" android:value="@string/facebook_client_token"/>
```

In your `android/app/src/main/res/values/strings.xml`, define the values:

```xml
<string name="facebook_app_id">[YOUR_APP_ID]</string>
<string name="facebook_client_token">[YOUR_CLIENT_TOKEN]</string>
```

_Note: You can also inject these into `strings.xml` or via `manifestPlaceholders` in `build.gradle` using environment variables._

## API Usage

1. **Initialization:**
   Call this as early as possible in your app lifecycle. You can optionally disable tracking on certain platforms (e.g., when running in a local web browser simulator that blocks scripts).

```typescript
import { MetaSDK } from "@capplugins/capacitor-meta-sdk";

// Initialize the SDK
await MetaSDK.initialize({
  appId: process.env.VITE_META_APP_ID, // Use environment variables!
  clientToken: process.env.VITE_META_CLIENT_TOKEN,
  disabledPlatforms: ["web"], // Disable the web pixel if desired
  debug: true,
});
```

2. **Logging Standard Events:**

```typescript
await MetaSDK.logEvent({
  name: "CompletedTutorial",
  parameters: {
    success: true,
    time_taken: 120,
  },
});
```

3. **Logging Purchases:**

```typescript
await MetaSDK.logPurchase({
  amount: 29.99,
  currency: "USD",
  parameters: {
    item_id: "sub_123",
    tier: "premium",
  },
});
```

4. **Advanced Conversions API Matching:**
   Set user data to improve match rates for Conversions API.

```typescript
await MetaSDK.setUserData({
  email: "user@example.com",
  phone: "16505551234",
  external_id: "user_xyz123",
});
```
