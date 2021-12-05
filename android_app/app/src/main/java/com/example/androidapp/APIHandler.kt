package com.example.androidapp
import android.content.Context
import android.net.wifi.p2p.WifiP2pManager
import android.widget.Toast
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import org.json.JSONArray
import org.json.JSONObject

class APIHandler(context: Context, domain: String) {
    private val context = context
    private val queue = Volley.newRequestQueue(context)
    private val DOMAIN = domain

    fun sendRequest(query: String, responseListener:  Response.Listener<JSONArray>) {
        val jsonArrayRequest = JsonArrayRequest(Request.Method.GET, "$DOMAIN/$query", null,
            responseListener,
            { error ->
                Toast.makeText(context, String(error.networkResponse.data), Toast.LENGTH_LONG).show()
            }
        )

        // Add the request to the RequestQueue.
        queue.add(jsonArrayRequest)
    }

    fun authenticate(userid: String, responseListener:  Response.Listener<JSONObject>) {
        val jsonObjectRequest = JsonObjectRequest(Request.Method.GET, "$DOMAIN/$userid", null,
            responseListener,
            { error ->
                Toast.makeText(context, String(error.networkResponse.data), Toast.LENGTH_LONG).show()
            }
        )

        // Add the request to the RequestQueue.
        queue.add(jsonObjectRequest)
    }

}