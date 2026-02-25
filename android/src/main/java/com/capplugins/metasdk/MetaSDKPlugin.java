package com.capplugins.metasdk;

import android.os.Bundle;
import android.util.Log;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.math.BigDecimal;
import java.util.Currency;
import java.util.Iterator;
import org.json.JSONException;

@CapacitorPlugin(name = "MetaSDK")
public class MetaSDKPlugin extends Plugin {

    private static final String TAG = "MetaSDKPlugin";
    private boolean isInitialized = false;
    private AppEventsLogger logger;
    private boolean isDisabled = false;

    @PluginMethod
    public void initialize(PluginCall call) {
        try {
            // Check for disabled platforms
            if (call.getArray("disabledPlatforms") != null) {
                for (int i = 0; i < call.getArray("disabledPlatforms").length(); i++) {
                    if ("android".equals(call.getArray("disabledPlatforms").getString(i))) {
                        this.isDisabled = true;
                        if (Boolean.TRUE.equals(call.getBoolean("debug", false))) {
                            Log.d(TAG, "Android platform is disabled via init options.");
                        }
                        call.resolve();
                        return;
                    }
                }
            }

            if (isInitialized) {
                call.resolve();
                return;
            }

            String appId = call.getString("appId");
            if (appId == null || appId.isEmpty()) {
                call.reject("appId must be provided to initialize the Android plugin.");
                return;
            }

            String clientToken = call.getString("clientToken");

            FacebookSdk.setApplicationId(appId);
            if (clientToken != null && !clientToken.isEmpty()) {
                FacebookSdk.setClientToken(clientToken);
            }

            FacebookSdk.sdkInitialize(getContext());

            this.logger = AppEventsLogger.newLogger(getContext());
            this.isInitialized = true;

            if (Boolean.TRUE.equals(call.getBoolean("debug", false))) {
                Log.d(TAG, "Initialized Meta SDK with App ID: " + appId);
            }

            call.resolve();
        } catch (Exception e) {
            call.reject("Failed to initialize Meta SDK", e);
        }
    }

    @PluginMethod
    public void logEvent(PluginCall call) {
        if (isDisabled) {
            call.resolve();
            return;
        }

        if (!isInitialized || logger == null) {
            call.reject("logEvent called before initialization.");
            return;
        }

        String name = call.getString("name");
        if (name == null || name.isEmpty()) {
            call.reject("Event name is required.");
            return;
        }

        JSObject parameters = call.getObject("parameters", new JSObject());
        Bundle bundle = new Bundle();

        try {
            Iterator<String> keys = parameters.keys();
            while (keys.hasNext()) {
                String key = keys.next();
                bundle.putString(key, parameters.getString(key));
            }
        } catch (Exception e) {
            Log.w(TAG, "Failed to parse parameters for logEvent: " + e.getMessage());
        }

        String eventNameToLog = name;

        switch (name) {
            case "AddPaymentInfo":
                eventNameToLog = com.facebook.appevents.AppEventsConstants.EVENT_NAME_ADDED_PAYMENT_INFO;
                break;
            case "AddToCart":
                eventNameToLog = com.facebook.appevents.AppEventsConstants.EVENT_NAME_ADDED_TO_CART;
                break;
            case "AddToWishlist":
                eventNameToLog = com.facebook.appevents.AppEventsConstants.EVENT_NAME_ADDED_TO_WISHLIST;
                break;
            case "CompleteRegistration":
                eventNameToLog = com.facebook.appevents.AppEventsConstants.EVENT_NAME_COMPLETED_REGISTRATION;
                break;
            case "Contact":
                eventNameToLog = com.facebook.appevents.AppEventsConstants.EVENT_NAME_CONTACT;
                break;
            case "CustomizeProduct":
                eventNameToLog = com.facebook.appevents.AppEventsConstants.EVENT_NAME_CUSTOMIZE_PRODUCT;
                break;
            case "Donate":
                eventNameToLog = com.facebook.appevents.AppEventsConstants.EVENT_NAME_DONATED;
                break;
            case "FindLocation":
                eventNameToLog = com.facebook.appevents.AppEventsConstants.EVENT_NAME_FIND_LOCATION;
                break;
            case "InitiateCheckout":
                eventNameToLog = com.facebook.appevents.AppEventsConstants.EVENT_NAME_INITIATED_CHECKOUT;
                break;
            case "Lead":
                eventNameToLog = com.facebook.appevents.AppEventsConstants.EVENT_NAME_LEAD;
                break;
            case "Purchase":
                eventNameToLog = com.facebook.appevents.AppEventsConstants.EVENT_NAME_PURCHASED;
                break;
            case "Schedule":
                eventNameToLog = com.facebook.appevents.AppEventsConstants.EVENT_NAME_SCHEDULE;
                break;
            case "Search":
                eventNameToLog = com.facebook.appevents.AppEventsConstants.EVENT_NAME_SEARCHED;
                break;
            case "StartTrial":
                eventNameToLog = com.facebook.appevents.AppEventsConstants.EVENT_NAME_START_TRIAL;
                break;
            case "SubmitApplication":
                eventNameToLog = com.facebook.appevents.AppEventsConstants.EVENT_NAME_SUBMIT_APPLICATION;
                break;
            case "Subscribe":
                eventNameToLog = com.facebook.appevents.AppEventsConstants.EVENT_NAME_SUBSCRIBE;
                break;
            case "ViewContent":
                eventNameToLog = com.facebook.appevents.AppEventsConstants.EVENT_NAME_VIEWED_CONTENT;
                break;
        }

        logger.logEvent(eventNameToLog, bundle);
        call.resolve();
    }

    @PluginMethod
    public void logPurchase(PluginCall call) {
        if (isDisabled) {
            call.resolve();
            return;
        }

        if (!isInitialized || logger == null) {
            call.reject("logPurchase called before initialization.");
            return;
        }

        Double amount = call.getDouble("amount");
        if (amount == null) {
            call.reject("Purchase amount is required.");
            return;
        }

        String currencyString = call.getString("currency");
        if (currencyString == null || currencyString.isEmpty()) {
            call.reject("Purchase currency is required.");
            return;
        }

        JSObject parameters = call.getObject("parameters", new JSObject());
        Bundle bundle = new Bundle();

        try {
            Iterator<String> keys = parameters.keys();
            while (keys.hasNext()) {
                String key = keys.next();
                bundle.putString(key, parameters.getString(key));
            }
        } catch (Exception e) {
            Log.w(TAG, "Failed to parse parameters for logPurchase: " + e.getMessage());
        }

        try {
            Currency currency = Currency.getInstance(currencyString);
            logger.logPurchase(BigDecimal.valueOf(amount), currency, bundle);
            call.resolve();
        } catch (IllegalArgumentException e) {
            call.reject("Invalid currency code provided: " + currencyString, e);
        }
    }

    @PluginMethod
    public void setUserData(PluginCall call) {
        if (isDisabled) {
            call.resolve();
            return;
        }

        if (!isInitialized) {
            call.reject("setUserData called before initialization.");
            return;
        }

        String email = call.getString("email");
        String phone = call.getString("phone");

        // Advanced Matching user data API
        // facebook-android-sdk usually relies on AppEventsLogger.setUserData

        Bundle advancedMatchingData = new Bundle();
        if (email != null && !email.isEmpty()) {
            advancedMatchingData.putString("em", email);
        }
        if (phone != null && !phone.isEmpty()) {
            advancedMatchingData.putString("ph", phone);
        }

        JSObject rawData = call.getData();
        Iterator<String> keys = rawData.keys();
        while (keys.hasNext()) {
            String key = keys.next();
            if (!key.equals("email") && !key.equals("phone")) {
                try {
                    advancedMatchingData.putString(key, rawData.getString(key));
                } catch (Exception ignored) {}
            }
        }

        AppEventsLogger.setUserData(
            advancedMatchingData.getString("em"),
            null, // firstName
            null, // lastName
            advancedMatchingData.getString("ph"),
            null, // dateOfBirth
            null, // gender
            null, // city
            null, // state
            null, // zip
            null // country
        );

        // Note: Advanced matching also supports custom data in newer SDKs,
        // passing simple standard sets here based on traditional docs, but raw bundles
        // can be used in setUserID or setUserData where applicable.

        call.resolve();
    }
}
