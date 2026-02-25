# Contributing to `@caplugins/capacitor-meta-sdk`

First off, thank you for considering contributing to the Capacitor Meta SDK plugin! It's people like you that make this tool great for everyone.

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue, assessing changes, and helping you finalize your pull requests.

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report. Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related reports.

- **Ensure the bug was not already reported** by searching on GitHub under [Issues](https://github.com/caplugins/capacitor-meta-sdk/issues).
- If you're unable to find an open issue addressing the problem, open a new one. Be sure to include a **title and clear description**, as much relevant information as possible, and a **code sample** or an **executable test case** demonstrating the expected behavior that is not occurring.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion, including completely new features and minor improvements to existing functionality.

- **Ensure the enhancement was not already suggested** by searching on GitHub under [Issues](https://github.com/caplugins/capacitor-meta-sdk/issues).
- If you are unable to find an open issue suggesting the enhancement, open a new one. Provide a **detailed description** of the proposed enhancement, the motivation for the feature, and specific examples showing how it would be used or what its API would look like.

### Pull Requests

The process described here has several goals:

- Maintain the plugin's quality
- Fix problems that are important to users
- Engage the community in working toward the best possible open source code base
- Enable a sustainable developer ecosystem

Please follow these steps to have your contribution considered by the maintainers:

1.  **Fork the repository** on GitHub.
2.  **Clone the project** to your own machine.
3.  **Create a new branch** to contain your feature, change, or fix: `git checkout -b feature/my-awesome-feature`.
4.  **Install dependencies**:
    ```bash
    npm install
    ```
5.  **Make your changes** and commit them. Be sure to write clear, concise commit messages.
6.  **Verify your changes**: Ensure the project builds properly and that your code adheres to standard formatting.
    ```bash
    npm run build
    npm run fmt
    npm run lint
    ```
7.  **Push your branch** to your fork: `git push origin feature/my-awesome-feature`.
8.  **Open a Pull Request** with a clear title and description against the `main` branch.

## Development Setup

To test changes locally, you can create a test Capacitor project and link this plugin to it:

1. Build the plugin in the plugin directory:

```bash
npm run build
```

2. Open your test Capacitor app directory and link the local plugin folder:

```bash
npm install /path/to/capacitor-meta-sdk
npx cap sync
```

Changes made to the plugin source (especially native code) mean you will need to re-run `npx cap sync` in your test app to copy over the new changes. TypeScript web changes will often just be picked up via Node module resolution if linked correctly.

## Code Style

- We use `eslint` and `prettier` to enforce code patterns. Run `npm run fmt` before committing.
- Commit messages should be descriptive and use standard conventional commit prefixes (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `perf:`).

Thank you for contributing!
