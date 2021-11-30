package com.example.androidapp
import kotlinx.android.synthetic.main.activity_main.*

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.EditText
import android.widget.Toast
import com.android.volley.toolbox.Volley

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        login_button.setOnClickListener {
            val url = findViewById<EditText>(R.id.url_address).text
            val username = findViewById<EditText>(R.id.username).text
            val password = findViewById<EditText>(R.id.password).text
            // TODO: send request
        }
    }
}