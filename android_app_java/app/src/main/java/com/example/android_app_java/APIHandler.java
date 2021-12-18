package com.example.android_app_java;


import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.widget.TableLayout;
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


class APIHandler {
    private Context context;
    private RequestQueue queue;
    private String DOMAIN;
    private LayoutInflater layoutInflater;
    private TableLayout tableLayout;

    public APIHandler(Context context , String domain, Object... params) {
        this.context = context;
        DOMAIN = domain;
        if (params.length > 0) {
            layoutInflater = (LayoutInflater) params[0];
            tableLayout = (TableLayout) params[1];
        }

        // Instantiate the cache
        Cache cache = new DiskBasedCache(this.context.getCacheDir(), 1024 * 1024); // 1MB cap
        // Set up the network to use HttpURLConnection as the HTTP client.
        Network network = new BasicNetwork(new HurlStack());
        // Instantiate the RequestQueue with the cache and network.
        queue = new RequestQueue(cache, network);
        // Start the queue
        queue.start();

    }


    public void authenticate(String credentials) {
        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET, DOMAIN + "/" + credentials, null

            ,new Response.Listener<JSONObject>() {
                    @Override
             public void onResponse(JSONObject response) {
                        //Toast.makeText(context.getApplicationContext(), "Login OK", Toast.LENGTH_LONG).show();
                        Intent myIntent=new Intent(context, DashboardActivity.class);
                        myIntent.putExtra("url", DOMAIN);
                        try {
                            myIntent.putExtra("userid", response.getString("id"));
                            myIntent.putExtra("username", response.getString("username"));
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
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

    public void sendRequest(String query) {
        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(Request.Method.GET, DOMAIN + "/" + query, null
                ,new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray response) {
                //Toast.makeText(context, "OK", Toast.LENGTH_LONG).show();
                try {
                    createTable(response);
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

    public void createTable(JSONArray jsonArray) throws JSONException {
        tableLayout.removeAllViews();
        TableRow row = new TableRow(context);

        JSONObject jsonObject = jsonArray.getJSONObject(0);
        Iterator<String> iterator = jsonObject.keys();
        while (iterator.hasNext()) {
            String key = iterator.next();
            TextView t = (TextView) layoutInflater.inflate(R.layout.headertext, null);
            t.setText(key);
            row.addView(t);
        }
        tableLayout.addView(row);
        for (int i = 0; i<jsonArray.length(); i++) {
            TableRow trow = new TableRow(context);
            jsonObject = jsonArray.getJSONObject(i);
            iterator = jsonObject.keys();
            while (iterator.hasNext()) {
                String key = iterator.next();
                TextView t = (TextView) layoutInflater.inflate(R.layout.rowtext, null);
                t.setText(jsonObject.getString(key));
                trow.addView(t);
            }
            tableLayout.addView(trow);
        }
    }

}
