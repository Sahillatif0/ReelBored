package com.sahillatif.reelbored

import android.service.notification.NotificationListenerService
import android.service.notification.StatusBarNotification
import android.app.Notification
import android.app.PendingIntent
import android.os.Bundle
import android.util.Log
import android.app.RemoteInput
import android.content.Intent

class MyNotificationListener : NotificationListenerService() {
    companion object {
        private const val CHANNEL_ID = "my_channel"
    }

    override fun onCreate() {
        super.onCreate()
        Log.d("MyNotificationListener", "Service created")
    }

    override fun onDestroy() {
        super.onDestroy()
        Log.d("MyNotificationListener", "Service destroyed")
    }

    override fun onNotificationPosted(sbn: StatusBarNotification) {
        val packageName = sbn.packageName

        if (packageName == "com.whatsapp") {
            // Check if notification has a reply action
            val notification = sbn.notification
            if (notification.actions != null) {
                for (action in notification.actions) {
                    if (action.remoteInputs != null) {
                        // Send a reply using the RemoteInput
                        // replyToNotification(sbn, "Auto-reply message")
                        logNotificationDetails(sbn)
                    }
                }
            }
        } else {
            val notification = sbn.notification
            Log.d("MYNotification", notification.toString())
        }
    }

    private fun replyToNotification(sbn: StatusBarNotification, replyText: String) {
    val notification = sbn.notification
    val actions = notification.actions

    if (actions != null && actions.isNotEmpty()) {
        for (action in actions) {
            val remoteInputs = action.remoteInputs
            if (remoteInputs != null && remoteInputs.isNotEmpty()) {
                for (remoteInput in remoteInputs) {
                    val remoteInputBundle = Bundle()
                    remoteInputBundle.putCharSequence(remoteInput.resultKey, replyText)

                    val intent = Intent()
                    val results = Bundle()
                    results.putCharSequence(remoteInput.resultKey, replyText)
                    RemoteInput.addResultsToIntent(arrayOf(remoteInput), intent, results)

                    try {
                        action.actionIntent.send(this, 0, intent)
                        Log.d("MyNotificationListener", "Reply sent successfully.")
                    } catch (e: PendingIntent.CanceledException) {
                        e.printStackTrace()
                        Log.e("MyNotificationListener", "Reply failed to send.")
                    }
                    return
                }
            }
        }
    }
}

    private fun logNotificationDetails(sbn: StatusBarNotification) {
        val notification = sbn.notification
        val extras = notification.extras
        val sender = extras.getString("android.title")
        val message = extras.getCharSequence("android.text")
        Log.d("MyNotificationListener", "Sender: $sender")
        Log.d("MyNotificationListener", "Message: $message")
        if(sender == "Sahil"){
            Log.d("MyNotificationListener", "it is sahil")
            replyToNotification(sbn, "message")
        }

        if (notification.actions != null) {
            for (action in notification.actions) {
                if (action.remoteInputs != null) {
                    Log.d("MyNotificationListener", "Notification has a reply option.")
                }
            }
        }
    }
}