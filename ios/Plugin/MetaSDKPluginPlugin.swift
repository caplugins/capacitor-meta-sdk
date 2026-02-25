import Foundation
import Capacitor

@objc(MetaSDKPluginPlugin)
public class MetaSDKPluginPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "MetaSDKPluginPlugin"
    public let jsName = "MetaSDK"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "initialize", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "logEvent", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "logPurchase", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setUserData", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setAutoLogAppEventsEnabled", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setAdvertiserTrackingEnabled", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setAdvertiserIDCollectionEnabled", returnType: CAPPluginReturnPromise)
    ]
}
