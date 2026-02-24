import { registerPlugin } from '@capacitor/core';
import type { MetaSDKPlugin } from './definitions';

const MetaSDK = registerPlugin<MetaSDKPlugin>('MetaSDK', {
  web: () => import('./web').then((m) => new m.MetaSDKWeb()),
});

export * from './definitions';
export { MetaSDK };
