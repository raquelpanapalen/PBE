package com.example.mongo02;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import java.io.BufferedInputStream;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.HttpURLConnection;

import android.app.Activity;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONObject;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONObject;

public class MainActivity extends AppCompatActivity {

    private EditText url_text;
    private EditText user_text;
    private EditText password_text;
    private TextView debug_text;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        url_text=(EditText) findViewById(R.id.url_address_field);
        user_text=(EditText) findViewById(R.id.username_field);
        password_text=(EditText) findViewById(R.id.password_field);
        debug_text=(TextView) findViewById(R.id.debug_text);
    }

    public void onLogin(View view){
        //conect on datebase

        String url = url_text.getText().toString(); //val url = "http://192.168.1.53:3001"
        String username = user_text.getText().toString();
        String userid = password_text.getText().toString(); //val userid = "8AACFA3F"

        // Auth
        APIHandler apiHandler = new APIHandler(this, url);
        apiHandler.authenticate(username,userid);

    }




}

