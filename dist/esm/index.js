import { registerPlugin } from '@capacitor/core';
const MetaSDK = registerPlugin('MetaSDK', {
  web: () => import('./web').then((m) => new m.MetaSDKWeb()),
});
export * from './definitions';
export { MetaSDK };
//# sourceMappingURL=index.js.map
