package com.example.android_app_java;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.content.Intent;
import android.view.View;
import android.widget.EditText;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;

public class DashboardActivity extends AppCompatActivity {

    private String url;
    private String userid;
    private String username;

    private TextView welcome_text;
    private EditText query_text;
    private TableLayout table_layout;
    private TableRow row;
    private TextView textView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_mongo);

        url = getIntent().getStringExtra("url").toString();
        userid = getIntent().getStringExtra("userid").toString();
        username = getIntent().getStringExtra("username").toString();

        welcome_text=(TextView) findViewById(R.id.welcome_text);
        query_text = (EditText) findViewById(R.id.query_text);
        table_layout= (TableLayout) findViewById(R.id.table_layout);
        textView= (TextView) findViewById(R.id.textView);

    }

    public void onSend(View v) {
        String query = query_text.getText().toString();
        if (query.isEmpty()) {
            //Toast.makeText(this, "Enter a valid query", Toast.LENGTH_LONG).show();
            return;
        }
        APIHandler apiHandler = new APIHandler(DashboardActivity.this, url);
        apiHandler.sendRequest(username,userid,query,table_layout);

    }

    public void onLogout(View view){
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
    }


}