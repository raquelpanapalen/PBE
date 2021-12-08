package com.example.android_app_java;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;


import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

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

