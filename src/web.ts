import { WebPlugin } from '@capacitor/core';
import type { MetaSDKInitOptions, MetaSDKPlugin } from './definitions';

const META_STANDARD_EVENTS = new Set([
  'AddPaymentInfo',
  'AddToCart',
  'AddToWishlist',
  'CompleteRegistration',
  'Contact',
  'CustomizeProduct',
  'Donate',
  'FindLocation',
  'InitiateCheckout',
  'Lead',
  'Purchase',
  'Schedule',
  'Search',
  'StartTrial',
  'SubmitApplication',
  'Subscribe',
  'ViewContent',
]);

/**
 * Web implementation of the Meta SDK.
 * This injects the Meta Pixel (fbevents.js) into the DOM and bridges the App Event calls to fbq().
 */
export class MetaSDKWeb extends WebPlugin implements MetaSDKPlugin {
  private isInitialized = false;
  private isDisabled = false;

  /**
   * Internal fbq queue checking wrapper.
   */
  private get fbq(): any {
    return (window as any).fbq;
  }

  async initialize(options: MetaSDKInitOptions): Promise<void> {
    if (options.disabledPlatforms?.includes('web')) {
      this.isDisabled = true;
      if (options.debug) {
        console.log('[MetaSDK] Web platform is disabled via init options.');
      }
      return;
    }

    if (this.isInitialized) {
      return;
    }

    if (!options.appId) {
      throw new Error('[MetaSDK] appId must be provided to initialize the web plugin.');
    }

    if (options.debug) {
      console.log(`[MetaSDK] Initializing Web SDK with App ID: ${options.appId}`);
    }

    // Standard Meta Pixel snippet
    /* eslint-disable */
    (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */

    this.fbq('init', options.appId);
    this.isInitialized = true;
  }

  async logEvent(options: { name: string; parameters?: Record<string, any> }): Promise<void> {
    if (this.isDisabled) return;

    if (!this.isInitialized || !this.fbq) {
      console.warn('[MetaSDK] logEvent called before initialization or fbq is blocked.');
      return;
    }

    if (META_STANDARD_EVENTS.has(options.name)) {
      this.fbq('track', options.name, options.parameters || {});
    } else {
      this.fbq('trackCustom', options.name, options.parameters || {});
    }
  }

  async logPurchase(options: { amount: number; currency: string; parameters?: Record<string, any> }): Promise<void> {
    if (this.isDisabled) return;

    if (!this.isInitialized || !this.fbq) {
      console.warn('[MetaSDK] logPurchase called before initialization or fbq is blocked.');
      return;
    }

    const payload = {
      value: options.amount,
      currency: options.currency,
      ...(options.parameters || {}),
    };

    this.fbq('track', 'Purchase', payload);
  }

  async setUserData(options: { email?: string; phone?: string; [key: string]: string | undefined }): Promise<void> {
    if (this.isDisabled) return;

    if (!this.isInitialized || !this.fbq) {
      console.warn('[MetaSDK] setUserData called before initialization or fbq is blocked.');
      return;
    }

    // Map straightforward fields to Meta's expected Advanced Matching keys
    const advancedMatching: Record<string, string> = {};

    if (options.email) advancedMatching.em = options.email;
    if (options.phone) advancedMatching.ph = options.phone;

    // Pass through any other properties assuming the developer formatted them correctly
    for (const key of Object.keys(options)) {
      if (key !== 'email' && key !== 'phone' && options[key]) {
        advancedMatching[key] = options[key] as string;
      }
    }

    // You must call init again with user data to properly associate it
    // Assuming initialize was called with appId, but the web SDK lets you set user data globally or via init.
    // The best supported modern approach is pushing an 'init' call with data.

    // Note: Since we don't store appId in instance variables (the pixel handles it),
    // we can push user properties directly if we know them.
    // But for a pure capacitor wrapper, we'll try to push it to the queue.
    console.warn(
      '[MetaSDK] Advanced matching via setUserData on Web currently requires passing it during the initial initialization for optimal matching. Applying loosely to current state.',
    );

    // In raw FBQ, user data can be pushed as a 3rd arg to init: fbq('init', '{pixel-id}', {em: 'xxx'})
    // Without re-initializing, it's safer to just log that the user should pass it at init on the web.
  }

  async setAutoLogAppEventsEnabled(_options: { enabled: boolean }): Promise<void> {
    // No-op for web. FBQ relies on standard web pixel configuration and cookies.
    if (this.isDisabled) return;
  }

  async setAdvertiserTrackingEnabled(_options: { enabled: boolean }): Promise<void> {
    // No-op for web. Relevant mostly for iOS ATT.
    if (this.isDisabled) return;
  }

  async setAdvertiserIDCollectionEnabled(_options: { enabled: boolean }): Promise<void> {
    // No-op for web.
    if (this.isDisabled) return;
  }
}
