package com.reelbored

import android.accessibilityservice.AccessibilityService
import android.view.accessibility.AccessibilityEvent
import android.view.accessibility.AccessibilityNodeInfo
import android.util.Log

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.uimanager.ViewManager

import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.Arguments

import com.facebook.react.modules.core.DeviceEventManagerModule

import android.view.WindowManager
import android.widget.TextView
import android.widget.ImageButton
import android.graphics.PixelFormat
import android.view.Gravity
import android.view.LayoutInflater
import android.os.Build
import android.content.Context
import android.view.ViewGroup
import android.view.View

import android.os.Handler
import android.os.Looper

object ReactContextSingleton {
    private var reactApplicationContext: ReactApplicationContext? = null

    fun setContext(context: ReactApplicationContext) {
        this.reactApplicationContext = context
    }

    fun getContext(): ReactApplicationContext? {
        return reactApplicationContext
    }
}


class MyAccessibilityPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        // Add your custom accessibility service module
        return listOf(MyAccessibilityModule(reactContext))
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        // If you don't have any custom views, return an empty list
        return emptyList()
    }
}

class MyAccessibilityModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    init {
        ReactContextSingleton.setContext(reactContext)
    }
    override fun getName(): String {
        return "MyAccessibilityService"
    }
    // Method to send event to React Native
    private fun sendEvent(eventName: String, params: WritableMap?) {
        reactApplicationContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
    }

    @ReactMethod
    fun triggerPopup(message: String) {
        val params = Arguments.createMap()
        params.putString("message", message)
        sendEvent("reelDetected", params)
    }
}

class MyAccessibilityService : AccessibilityService() {
    private lateinit var windowManager: WindowManager
    private lateinit var overlayView: View

    override fun onAccessibilityEvent(event: AccessibilityEvent?) {
        val reactContext = ReactContextSingleton.getContext()

        val source = event?.source ?: return
    Log.d("MyAccessibilityService", "Accessibility Event received")
    
    if (event?.packageName == "com.google.android.youtube") {

    // Search for the Reels RecyclerView using the identified view_id
    val reelNodes = source.findAccessibilityNodeInfosByViewId("com.google.android.youtube:id/reel_recycler")

    if (reelNodes.isNotEmpty()) {
        Log.d("MyAccessibilityService", "Reels")
        // Found the Reels screen, you can now take action, e.g., dismiss, close, or block
        // for (reelNode in reelNodes) {
            // Example: Scroll back or dismiss the Reels screen
            // performGlobalAction(GLOBAL_ACTION_BACK)
        performGlobalAction(GLOBAL_ACTION_BACK)
        
            // reelNode.performAction(AccessibilityNodeInfo.ACTION_SCROLL_BACKWARD)
        // }
    }
        // Log.d("MyAccessibilityService", "Event from YouTube detected")
        
        // val rootNode: AccessibilityNodeInfo? = rootInActiveWindow
        // if (rootNode != null) {
        //     Log.d("MyAccessibilityService", "Root node is not null, traversing nodes")
        //     reactContext?.let { traverseNode(rootNode, it) }
        // } else {
        //     Log.d("MyAccessibilityService", "Root node is null")
        // }
    } else {
        Log.d("MyAccessibilityService", "Event from other package: ${event?.packageName}")
    }
}

    private fun traverseNode(info: AccessibilityNodeInfo,  reactContext: ReactApplicationContext) {
    for (i in 0 until info.childCount) {
        val child = info.getChild(i)
        if (child != null) {
            Log.d("MyAccessibilityService", "Node text: ${child.text}, Class: ${child.className}")

            if (child.text != null && child.text.toString().contains("Shorts")) {
                Log.d("MyAccessibilityService", "Shorts detected and blocked.")
                // val params = Arguments.createMap()
                // params.putString("message", "Reel or Shorts detected!")
                // reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                //     .emit("reelDetected", params)
                showOverlay("Reel or Shorts detected!")
                showOverlay(child.className.toString())
                performGlobalAction(GLOBAL_ACTION_BACK)
                // child.performAction(AccessibilityNodeInfo.ACTION_CLICK)  // Optionally close the Shorts video
            }

            traverseNode(child, reactContext)
        }
    }
}
    private fun showOverlay(message: String) {
        windowManager = getSystemService(Context.WINDOW_SERVICE) as WindowManager

        val params = WindowManager.LayoutParams(
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.WRAP_CONTENT,
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O)
                WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
            else
                WindowManager.LayoutParams.TYPE_PHONE,
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
            PixelFormat.TRANSLUCENT
        )

        params.gravity = Gravity.CENTER

    val inflater = getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
    overlayView = inflater.inflate(R.layout.overlay_layout, null)

    val textView = overlayView.findViewById<TextView>(R.id.overlay_text)
    textView.text = message

    val closeButton = overlayView.findViewById<ImageButton>(R.id.close_button)
    // closeButton.text = "Close"
    closeButton.setOnClickListener {
        // Remove overlay when the close button is clicked
        windowManager.removeView(overlayView)
         Handler(Looper.getMainLooper()).postDelayed({
        // Re-enable the service or trigger a reset of the event flow
        performGlobalAction(GLOBAL_ACTION_BACK)
    }, 500)
    }

    windowManager.addView(overlayView, params)
    overlayView.alpha = 0f
    overlayView.animate()
        .alpha(1f)
        .setDuration(300)
    }
    override fun onInterrupt() {
        // Handle interruption
        if (::overlayView.isInitialized) {
            windowManager.removeView(overlayView)
        }

    }
}