package com.sahillatif.reelbored

import android.accessibilityservice.AccessibilityService
import android.view.accessibility.AccessibilityEvent
import android.view.accessibility.AccessibilityNodeInfo
import android.util.Log

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise


import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.uimanager.ViewManager

import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.Arguments


import com.facebook.react.modules.core.DeviceEventManagerModule

import android.view.WindowManager
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Button
import android.graphics.PixelFormat
import android.view.Gravity
import android.view.LayoutInflater
import android.os.Build
import android.content.Context
import android.view.ViewGroup
import android.view.View

import android.os.Handler
import android.os.Looper

import android.accessibilityservice.GestureDescription
import android.graphics.Path
import android.graphics.Point

import android.content.Intent
import android.view.MotionEvent

import java.time.LocalDateTime

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
// Corrected BreakTime Data Class
data class BreakTime(
    var yt: Double,
    var fb: Double,
    var insta: Double,
    var snap: Double,
    var maxLimit: Double
)
var timeInSec:Long = 0L
var startTime:Long = 0L
var endTime:Long = 0L
class MyAccessibilityModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    init {
        ReactContextSingleton.setContext(reactContext)
    }
    override fun getName(): String {
        return "MyAccessibilityService"
    }

    @ReactMethod
    fun sendMessageToReact(yt: Double,fb: Double, insta: Double, snap: Double, maxLimit: Double,  promise: Promise) {
        val bTime = BreakTime(yt, fb, insta, snap, maxLimit);
        val bTimeMap = Arguments.createMap()
        bTimeMap.putDouble("yt", bTime.yt)
        bTimeMap.putDouble("fb", bTime.fb)
        bTimeMap.putDouble("insta", bTime.insta)
        bTimeMap.putDouble("snap", bTime.snap)
        bTimeMap.putDouble("maxLimit", bTime.maxLimit)
        promise.resolve(bTimeMap)
    }

    @ReactMethod
    fun receiveMessageFromReact(promise: Promise) {
        // Send data back to React Native
        val data = "timeInSec"
        promise.resolve(data)
    }
}

class MyAccessibilityService : AccessibilityService() {
    private lateinit var windowManager: WindowManager
    private lateinit var overlayView: View
    var showingOverlay = false
    var reelOn = false
    var count = 0
     private fun getScreenCenter(): Point {
        val windowManager = getSystemService(WINDOW_SERVICE) as WindowManager
        val display = windowManager.defaultDisplay

        val size = Point()
        display.getSize(size) // Get the screen dimensions

        return Point(size.x / 2, size.y / 2) // Calculate the center point
    }
    override fun onAccessibilityEvent(event: AccessibilityEvent?) {
        val reactContext = ReactContextSingleton.getContext()
        val source = event?.source ?: return
    // Log.d("MyAccessibilityService", event.toString())
    
    if (event?.packageName == "com.google.android.youtube") {

    // Search for the Reels RecyclerView using the identified view_id
    val reelNodes = source.findAccessibilityNodeInfosByViewId("com.google.android.youtube:id/reel_recycler")

    if (reelNodes.isNotEmpty() && !showingOverlay) {
        if(!reelOn)
            startTime = System.currentTimeMillis()
        reelOn = true
        Log.d("MyAccessibilityService", "Reels")
        count = 0
        timeInSec = (System.currentTimeMillis() - startTime) / 1000
        Log.d("MyAccessibilityService", "Time in seconds: $timeInSec")
        if(timeInSec>100){
            Log.d("MyAccessibilityService", "Time limit exceeded")
            val screenCenter = getScreenCenter()
            performTap(screenCenter.x.toFloat(), screenCenter.y.toFloat()) 
            showingOverlay = true
            showOverlay("Time limit exceeded!")
        }
        // Found the Reels screen, you can now take action, e.g., dismiss, close, or block
        // for (reelNode in reelNodes) {
            // Example: Scroll back or dismiss the Reels screen
            // performGlobalAction(GLOBAL_ACTION_BACK)
            // showingOverlay = true
            // val screenCenter = getScreenCenter()
            // performTap(screenCenter.x.toFloat(), screenCenter.y.toFloat())
            // performTap(100f, 100f)
            // Log.d("MyAccessibilityService", "Shorts detected and blocked.")
            // showOverlay("Reel or Shorts detected!")
        // performGlobalAction(GLOBAL_ACTION_BACK)
        
            // reelNode.performAction(AccessibilityNodeInfo.ACTION_SCROLL_BACKWARD)
        // }
    }
    else if(!reelNodes.isNotEmpty()){
        count++
        // Log.d("MyAccessibilityService", event.source)
        if(reelOn && count>60){
            reelOn = false
        }
    }
        // Log.d("MyAccessibilityService", "Event from YouTube detected")
        
        // val rootNode: AccessibilityNodeInfo? = rootInActiveWindow
        // if (rootNode != null) {
        //     Log.d("MyAccessibilityService", "Root node is not null, traversing nodes")
        //     reactContext?.let { traverseNode(rootNode, it) }
        // } else {
        //     Log.d("MyAccessibilityService", "Root node is null")
        // }
    } else{
        Log.d("MyAccessibilityService", "Event from other package: ${event?.packageName}")
    }
}
    private fun performTap(x: Float, y: Float) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            val path = Path().apply {
                moveTo(x, y)
            }

            val gesture = GestureDescription.Builder()
                .addStroke(GestureDescription.StrokeDescription(path, 0, 100))
                .build()
            dispatchGesture(gesture, object : GestureResultCallback() {
                override fun onCompleted(gestureDescription: GestureDescription?) {
                    super.onCompleted(gestureDescription)
                    Log.d("performTap", "Tap performed successfully")
                }

                override fun onCancelled(gestureDescription: GestureDescription?) {
                    super.onCancelled(gestureDescription)
                    Log.d("performTap", "Tap cancelled")
                }
            }, null)
        } else {
            Log.e("MyAccessibilityService", "Gesture not supported on this version of Android")
        }
    }
    private fun showOverlay(message: String) {
        windowManager = getSystemService(Context.WINDOW_SERVICE) as WindowManager

        val params = WindowManager.LayoutParams(
            WindowManager.LayoutParams.MATCH_PARENT,
            WindowManager.LayoutParams.MATCH_PARENT,
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O)
                WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
            else
                WindowManager.LayoutParams.TYPE_PHONE,
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
            PixelFormat.TRANSLUCENT
        )


    val inflater = getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
    overlayView = inflater.inflate(R.layout.overlay_layout, null)

    val linearLayout = overlayView.findViewById<LinearLayout>(R.id.box)

    val textView = overlayView.findViewById<TextView>(R.id.overlay_text)
    textView.text = message

    val closeButton = overlayView.findViewById<Button>(R.id.close_button)
    linearLayout.setOnTouchListener { view, motionEvent ->
        Log.d("MainActivity", "LinearLayout touched: $motionEvent")
        Log.d("MainActivity", view.toString())

        if (motionEvent.action==MotionEvent.ACTION_DOWN) {
            Log.d("MainActivity", "LinearLayout touched: ACTION_DOWN")
            showingOverlay = false;
            windowManager.removeView(overlayView)
            performGlobalAction(GLOBAL_ACTION_BACK)
        }
        true
    }
    closeButton.setOnClickListener {
        showingOverlay = false;
        windowManager.removeView(overlayView)
        val intent = Intent(this, MainActivity::class.java)
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        startActivity(intent)
    //     //  Handler(Looper.getMainLooper()).postDelayed({
    //     // Re-enable the service or trigger a reset of the event flow
    //     performGlobalAction(GLOBAL_ACTION_BACK)
    // // }, 500)
    }

    windowManager.addView(overlayView, params)
    overlayView.alpha = 0f
    overlayView.animate()
        .alpha(1f)
        .setDuration(300)
    }
    override fun onInterrupt() {
        if (::overlayView.isInitialized) {
            windowManager.removeView(overlayView)
            showingOverlay = false;
            //  Handler(Looper.getMainLooper()).postDelayed({
            // Re-enable the service or trigger a reset of the event flow
            performGlobalAction(GLOBAL_ACTION_BACK)
        }

    }
}