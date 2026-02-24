# AI Context / Developer Documentation

## Overview

This repository contains `@capplugins/capacitor-meta-sdk`, a Capacitor plugin bridging the Meta (Facebook) SDK across iOS, Android, and Web platforms.

The primary goals of this project are:

1. Provide a robust, Typesafe interface for Meta App Events and the Conversions API.
2. Support programmatic initialization and environment variable injection for CI/CD flows, avoiding hardcoded XML parsing where possible.
3. Allow runtime disabling for specific platforms (e.g. turning off the SDK when running a web-build in a local dev simulator).

## Current State

- **Scaffolding:** Hand-crafted using standard npm Typescript library patterns since the interactive `@capacitor/create-plugin` prompt was unsupported.
- **Implementations:**
  - **Typescript (`src/`):** API definitions, JSDocs, and Web injecting `fbevents.js`.
  - **iOS (`ios/Plugin/`):** Swift wrapper around `FBSDKCoreKit` supporting programmatic initialization, `logEvent`, `logPurchase` and `setUserData` via Graph APIs.
  - **Android (`android/src/main/java/`):** Java wrapper utilizing `facebook-core:17.0.0` with mapping handlers.
- **Code Quality:** Configured Husky (`pre-commit`), `lint-staged` with `eslint` (`@ionic/eslint-config`) and `prettier` (including `prettier-plugin-java`).
- **CI/CD:** Added GitHub Actions workflows (`.github/workflows`) for `CI` (lint + format + build on PR/main) and `Release` (build + npm publish on GitHub Release tags).

## Future Steps / Pending Work

If you are initializing a new session to continue work on this plugin, the next logical steps are:

1. **Local Linking & Testing:** Create a blank Capacitor application (`npx create-capacitor-app`), link this plugin locally (`npm install ../capacitor-meta-sdk`), run it on an Xcode iOS simulator and Android Studio emulator to trace graph API requests.
2. **Automated Testing:** Setting up unit tests using Jest/Karma to verify the web bridging wrapper behaves as expected.

## Useful Commands

- `npm run build` - Cleans and compiles the TS definitions into Rollup bundles.
- `npm run lint` - Executes ESLint rules.
