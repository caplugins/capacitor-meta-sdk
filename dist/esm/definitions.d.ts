export type PlatformType = 'web' | 'android' | 'ios';
/**
 * Initialization options for the Meta SDK.
 */
export interface MetaSDKInitOptions {
    /**
     * Disable the SDK completely for specific platforms.
     * For example, ['web'] will disable the SDK when running in a browser.
     *
     * @default [] (Enabled on all supported platforms)
     */
    disabledPlatforms?: PlatformType[];
    /**
     * The Meta App ID.
     * It is highly recommended to inject this via environment variables.
     */
    appId: string;
    /**
     * The Meta Client Token (required for initialization in some environments).
     */
    clientToken?: string;
    /**
     * The name of the application.
     */
    appName?: string;
    /**
     * Enable debug logging during development.
     *
     * @default false
     */
    debug?: boolean;
}
/**
 * Standard Events recognized by the Meta Pixel and App Events SDK.
 * Passing any of these strings to `logEvent` triggers standard mapping natively.
 */
export type MetaStandardEvent = 'AddPaymentInfo' | 'AddToCart' | 'AddToWishlist' | 'CompleteRegistration' | 'Contact' | 'CustomizeProduct' | 'Donate' | 'FindLocation' | 'InitiateCheckout' | 'Lead' | 'Purchase' | 'Schedule' | 'Search' | 'StartTrial' | 'SubmitApplication' | 'Subscribe' | 'ViewContent';
/**
 * The standard interface for the MetaSDK plugin.
 */
export interface MetaSDKPlugin {
    /**
     * Initialize the Meta SDK.
     * You should call this as early as possible in your app lifecycle.
     *
     * @param options Initialization configuration and API keys.
     * @returns Promise that resolves when the internal SDK has been initialized.
     */
    initialize(options: MetaSDKInitOptions): Promise<void>;
    /**
     * Log a standard or custom App Event to Meta.
     *
     * @param options The event name and optional payload of parameters.
     * @returns Promise that resolves when the event has been dispatched.
     */
    logEvent(options: {
        name: MetaStandardEvent | string;
        parameters?: Record<string, any>;
    }): Promise<void>;
    /**
     * Log a purchase event to Meta.
     *
     * @param options Information about the purchase, including amount, currency, and optional metadata.
     * @returns Promise that resolves when the purchase has been logged.
     */
    logPurchase(options: {
        amount: number;
        currency: string;
        parameters?: Record<string, any>;
    }): Promise<void>;
    /**
     * Set advanced user matching data for the Conversions API.
     *
     * @param options User identifiable information to be hashed by the Meta SDK.
     * @returns Promise resolving when the user data is set natively.
     */
    setUserData(options: {
        email?: string;
        phone?: string;
        [key: string]: string | undefined;
    }): Promise<void>;
    /**
     * Enable or disable automatic event logging.
     * On iOS and Android, this corresponds to the `AutoLogAppEventsEnabled` setting.
     */
    setAutoLogAppEventsEnabled(options: {
        enabled: boolean;
    }): Promise<void>;
    /**
     * Enable or disable advertiser tracking.
     * On iOS, this should be called after handling the App Tracking Transparency (ATT) prompt.
     * This is a no-op on Android and Web platforms.
     */
    setAdvertiserTrackingEnabled(options: {
        enabled: boolean;
    }): Promise<void>;
    /**
     * Enable or disable advertiser ID collection.
     * On iOS and Android, this corresponds to the `AdvertiserIDCollectionEnabled` setting.
     */
    setAdvertiserIDCollectionEnabled(options: {
        enabled: boolean;
    }): Promise<void>;
}
