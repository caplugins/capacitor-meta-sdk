import { WebPlugin } from '@capacitor/core';
import type { MetaSDKInitOptions, MetaSDKPlugin } from './definitions';
/**
 * Web implementation of the Meta SDK.
 * This injects the Meta Pixel (fbevents.js) into the DOM and bridges the App Event calls to fbq().
 */
export declare class MetaSDKWeb extends WebPlugin implements MetaSDKPlugin {
  private isInitialized;
  private isDisabled;
  /**
   * Internal fbq queue checking wrapper.
   */
  private get fbq();
  initialize(options: MetaSDKInitOptions): Promise<void>;
  logEvent(options: { name: string; parameters?: Record<string, any> }): Promise<void>;
  logPurchase(options: { amount: number; currency: string; parameters?: Record<string, any> }): Promise<void>;
  setUserData(options: { email?: string; phone?: string; [key: string]: string | undefined }): Promise<void>;
}
