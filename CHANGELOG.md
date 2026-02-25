# Changelog

All notable changes to this project will be documented in this file.

## [0.0.4] - 2026-02-25

### Fixed

- Fixed missing TypeScript interface definitions for `setAutoLogAppEventsEnabled`, `setAdvertiserTrackingEnabled`, and `setAdvertiserIDCollectionEnabled` so they are successfully recognized by IDEs and compilers.

## [0.0.3] - 2026-02-25

### Fixed

- Fixed TypeScript declaration references in `package.json` (`types`, `module`) so that the plugin resolves properly in consuming TS projects.

## [1.0.0] - 2026-02-25

### Initial Release

- **Core SDK**: Initial release of the `@caplugins/capacitor-meta-sdk` for Capacitor 8.
- **Cross-Platform**: Full implementations for iOS, Android, and Web platforms.
- **Methods**: Implemented robust typed methods for `initialize()`, `logEvent()`, `logPurchase()`, and `setUserData()`.
- **Standard Events**: Seamless mapping of 17 Meta Standard Events (e.g., `Purchase`, `CompleteRegistration`, `AddToCart`) natively to both iOS and Android SDKs.

### Privacy & Configuration Controls

- Added runtime programmatic SDK toggles for advanced privacy compliance:
  - `setAutoLogAppEventsEnabled({ enabled: boolean })`
  - `setAdvertiserTrackingEnabled({ enabled: boolean })` (Applies natively to iOS 14+ ATT)
  - `setAdvertiserIDCollectionEnabled({ enabled: boolean })`

### Organizational & Polish

- Rebranded and updated all namespaces, manifests, and documentation to properly utilize the `caplugins` organization.
- Added standard Open Source files including `LICENSE` (MIT) and `CONTRIBUTING.md` guidelines.
- Standardized TypeScript JSDoc and TSDoc comments for enhanced developer experience.

### CI/CD

- Automated release workflow configured to push directly to NPM on GitHub Release creation.
- Automated Linting, Prettier formatting, and TypeScript compilation pipeline running on Node 22 to match modern Capacitor environments.
