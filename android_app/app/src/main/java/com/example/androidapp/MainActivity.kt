package com.example.androidapp
import android.content.Intent
import kotlinx.android.synthetic.main.activity_main.*

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle


class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        login_button.setOnClickListener {
            val url = url_address_field.text.toString() //val url = "http://192.168.1.53:3001"
            val apiHandler = APIHandler(this, url)

            val username = username_field.text.toString() // val username = "Llavero azul"
            val userid = password_field.text.toString() //val userid = "8AACFA3F"

            // Auth
            apiHandler.authenticate("$userid?username=$username") {
                println(it)
                val intent = Intent(this, DashboardActivity::class.java).apply {
                    putExtra("url", url)
                    putExtra("userid", it.getString("id"))
                    putExtra("username", it.getString("username"))
                }
                startActivity(intent)
            }

        }
    }
}