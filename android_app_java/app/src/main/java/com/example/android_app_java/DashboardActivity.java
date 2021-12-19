package com.example.android_app_java;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.os.Bundle;
import android.content.Intent;
import android.os.CountDownTimer;
import android.view.View;
import android.widget.EditText;
import android.widget.TableLayout;
import android.widget.TextView;
import android.widget.Toast;

public class DashboardActivity extends AppCompatActivity {

    private String url;
    private String userid;
    private String username;

    private TextView welcome_text;
    private EditText query_text;
    private TableLayout table_layout;
    private TextView textView;
    private CountDownTimer timer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dashboard);

        url = getIntent().getStringExtra("url");
        userid = getIntent().getStringExtra("userid");
        username = getIntent().getStringExtra("username");

        welcome_text = findViewById(R.id.welcome_text);
        query_text = findViewById(R.id.query_text);
        table_layout = findViewById(R.id.table_layout);
        textView = findViewById(R.id.textView);

        String welcome_msg = "Welcome, "+username+"!";
        welcome_text.setText(welcome_msg);

        startTimer(this);
    }

    public void onSend(View v) {
        this.timer.cancel();
        startTimer(this);
        String query = query_text.getText().toString();
        if (query.isEmpty()) {
            Toast.makeText(this, "Enter a valid query", Toast.LENGTH_LONG).show();
            return;
        }
        APIHandler apiHandler = new APIHandler(DashboardActivity.this, url, getLayoutInflater(), table_layout);
        apiHandler.sendRequest(userid+"/"+query);
    }

    public void onLogout(View view){
        this.timer.cancel();
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
    }

    public void startTimer(Context context) {
        this.timer = new CountDownTimer(5*60*1000, 1000) {

            public void onTick(long millisUntilFinished) {}

            public void onFinish() {
                Intent intent = new Intent(context, MainActivity.class);
                startActivity(intent);
            }
        };
        this.timer.start();
    }

}