import Foundation
import Capacitor
import FBSDKCoreKit

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(MetaSDKPlugin)
public class MetaSDKPlugin: CAPPlugin {
    private var isInitialized = false
    private var disabledPlatforms: [String] = []

    public override func load() {
        // Notification for app launch is typically handled in AppDelegate,
        // but Facebook allows programmatic initialization.
    }

    @objc func initialize(_ call: CAPPluginCall) {
        let disabled = call.getArray("disabledPlatforms", String.self) ?? []
        self.disabledPlatforms = disabled

        if disabledPlatforms.contains("ios") {
            let debug = call.getBool("debug", false)
            if debug {
                print("[MetaSDK] iOS platform is disabled via init options.")
            }
            call.resolve()
            return
        }

        if isInitialized {
            call.resolve()
            return
        }

        guard let appId = call.getString("appId") else {
            call.reject("[MetaSDK] appId must be provided to initialize the iOS plugin.")
            return
        }

        let clientToken = call.getString("clientToken") 
        let appName = call.getString("appName")
        let debug = call.getBool("debug", false)

        if debug {
            print("[MetaSDK] Initializing iOS SDK with App ID: \(appId)")
        }

        // Programmatically configure FBSDKSettings
        Settings.shared.appID = appId
        if let token = clientToken {
            Settings.shared.clientToken = token
        }
        if let name = appName {
            Settings.shared.displayName = name
        }

        ApplicationDelegate.shared.initializeSDK()
        self.isInitialized = true
        
        call.resolve()
    }

    @objc func logEvent(_ call: CAPPluginCall) {
        if disabledPlatforms.contains("ios") {
            call.resolve()
            return
        }

        guard isInitialized else {
            call.reject("[MetaSDK] logEvent called before initialization.")
            return
        }

        guard let name = call.getString("name") else {
            call.reject("[MetaSDK] Event name is required.")
            return
        }

        let parameters = call.getObject("parameters") as? [String: Any]

        var eventNameToLog = AppEvents.Name(name)

        switch name {
        case "AddPaymentInfo": eventNameToLog = AppEvents.Name.addedPaymentInfo
        case "AddToCart": eventNameToLog = AppEvents.Name.addedToCart
        case "AddToWishlist": eventNameToLog = AppEvents.Name.addedToWishlist
        case "CompleteRegistration": eventNameToLog = AppEvents.Name.completedRegistration
        case "Contact": eventNameToLog = AppEvents.Name.contact
        case "CustomizeProduct": eventNameToLog = AppEvents.Name.customizeProduct
        case "Donate": eventNameToLog = AppEvents.Name.donated
        case "FindLocation": eventNameToLog = AppEvents.Name.findLocation
        case "InitiateCheckout": eventNameToLog = AppEvents.Name.initiatedCheckout
        case "Lead": eventNameToLog = AppEvents.Name.lead
        case "Purchase": eventNameToLog = AppEvents.Name.purchased
        case "Schedule": eventNameToLog = AppEvents.Name.schedule
        case "Search": eventNameToLog = AppEvents.Name.searched
        case "StartTrial": eventNameToLog = AppEvents.Name.startTrial
        case "SubmitApplication": eventNameToLog = AppEvents.Name.submitApplication
        case "Subscribe": eventNameToLog = AppEvents.Name.subscribe
        case "ViewContent": eventNameToLog = AppEvents.Name.viewedContent
        default: break
        }
        
        if let params = parameters, !params.isEmpty {
            AppEvents.shared.logEvent(eventNameToLog, parameters: params)
        } else {
            AppEvents.shared.logEvent(eventNameToLog)
        }
        
        call.resolve()
    }

    @objc func logPurchase(_ call: CAPPluginCall) {
        if disabledPlatforms.contains("ios") {
            call.resolve()
            return
        }

        guard isInitialized else {
            call.reject("[MetaSDK] logPurchase called before initialization.")
            return
        }

        guard let amount = call.getDouble("amount") else {
            call.reject("[MetaSDK] Purchase amount is required.")
            return
        }

        guard let currency = call.getString("currency") else {
            call.reject("[MetaSDK] Purchase currency is required.")
            return
        }

        let parameters = call.getObject("parameters") ?? [:]

        AppEvents.shared.logPurchase(amount: amount, currency: currency, parameters: parameters)
        call.resolve()
    }

    @objc func setUserData(_ call: CAPPluginCall) {
        if disabledPlatforms.contains("ios") {
            call.resolve()
            return
        }

        guard isInitialized else {
            call.reject("[MetaSDK] setUserData called before initialization.")
            return
        }

        let email = call.getString("email")
        let phone = call.getString("phone")

        if let em = email {
            AppEvents.shared.setUserEmail(em)
        }
        
        if let ph = phone {
            AppEvents.shared.setUserPhone(ph)
        }

        // Advanced matching natively lets you set user data via custom fields 
        // usually passed in standard hashing keys. FBSDK handles standard keys.
        if let rawObject = call.getObject("") {
            var customData: [String: String] = [:]
            
            for (key, value) in rawObject {
                if key != "email" && key != "phone", let strValue = value as? String {
                    customData[key] = strValue
                }
            }
            
            if !customData.isEmpty {
                 AppEvents.shared.setUserData(customData.description, forType: AppEvents.UserDataType.custom)
            }
        }

        call.resolve()
    }
}
