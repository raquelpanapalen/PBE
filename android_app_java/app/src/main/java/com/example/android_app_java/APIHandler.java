package com.example.android_app_java;

import android.content.Context;
import android.content.Intent;
import android.widget.TableRow;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Cache;
import com.android.volley.Network;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.BasicNetwork;
import com.android.volley.toolbox.DiskBasedCache;
import com.android.volley.toolbox.HurlStack;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Iterator;

import android.widget.TableLayout;

class APIHandler {
    private Context context;
    private RequestQueue queue;
    private String DOMAIN;

    public APIHandler(Context oricontext , String domain) {
        context = oricontext; //=MainActivity
        //queue = Volley.newRequestQueue(context);
        DOMAIN = domain;

        // Instantiate the cache
        Cache cache = new DiskBasedCache(context.getCacheDir(), 1024 * 1024); // 1MB cap
        // Set up the network to use HttpURLConnection as the HTTP client.
        Network network = new BasicNetwork(new HurlStack());
        // Instantiate the RequestQueue with the cache and network.
        queue = new RequestQueue(cache, network);
        // Start the queue
        queue.start();

    }


    public void authenticate(String username, String userid) {
        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET, DOMAIN + "/" + userid, null

            ,new Response.Listener<JSONObject>() {
                    @Override
             public void onResponse(JSONObject response) {
                        Toast.makeText(context.getApplicationContext(), "Login OK", Toast.LENGTH_LONG).show();
                        Intent myIntent=new Intent(context, DashboardActivity.class);
                        myIntent.putExtra("url", DOMAIN);
                        myIntent.putExtra("userid", userid);
                        myIntent.putExtra("username", username);
                        context.startActivity(myIntent);
                        }}

            ,new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(context.getApplicationContext(), error.toString(), Toast.LENGTH_LONG).show();
            }}

        );

        // Add the request to the RequestQueue.
        queue.add(jsonObjectRequest);
    }

    public void sendRequest(String username, String userid, String query, TableLayout table_layout) {
        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(Request.Method.GET, DOMAIN + "/" + userid + "/" + query, null
                ,new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray response) {
                Toast.makeText(context, "OK", Toast.LENGTH_LONG).show();
                try {
                    createTable(response, table_layout);
                } catch (JSONException e) {
                    Toast.makeText(context, e.toString(), Toast.LENGTH_LONG).show();
                }
            }}

                ,new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(context, error.toString(), Toast.LENGTH_LONG).show();
            }}

        );

        // Add the request to the RequestQueue.
        queue.add(jsonArrayRequest);
    }


    public void createTable( JSONArray jsonArray,TableLayout table_layout) throws JSONException {
        table_layout.removeAllViews();
        TableRow row = new TableRow(context);
        JSONObject jsonObject = jsonArray.getJSONObject(0);
        Iterator<String> iterator = jsonObject.keys();
        while (iterator.hasNext()) {
            String key = iterator.next();
            TextView t= new TextView(context);
            t.setText(key);
            //textview = TextView(this)
            //textview.text = key
            row.addView(t);
        }
        table_layout.addView(row);
        for (int i = 0; i<jsonArray.length(); i++) {
            TableRow trow = new TableRow(context);
            jsonObject = jsonArray.getJSONObject(i);
            iterator = jsonObject.keys();
            while (iterator.hasNext()) {
                String key = iterator.next();
                TextView t = new TextView(context);
                t.setText(jsonObject.getString(key));
                trow.addView(t);
            }
            table_layout.addView(trow);
        }
    }

}
