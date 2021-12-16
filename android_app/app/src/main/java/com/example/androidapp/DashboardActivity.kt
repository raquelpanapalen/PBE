package com.example.androidapp

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.TableRow
import android.widget.TextView
import android.widget.Toast
import kotlinx.android.synthetic.main.activity_dashboard.*
import org.json.JSONArray




class DashboardActivity : AppCompatActivity() {
    private lateinit var url: String
    private lateinit var userid: String
    private lateinit var username: String

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_dashboard)

        url = intent.getStringExtra("url").toString()
        userid = intent.getStringExtra("userid").toString()
        username = intent.getStringExtra("username").toString()

        welcome_text.text = getString(R.string.welcome_message, username)

        send_button.setOnClickListener {
            val query = query_text.text.toString()
            if (query.isEmpty()) {
                Toast.makeText(this, "Enter a valid query", Toast.LENGTH_LONG).show()
            }
            APIHandler(this, url).sendRequest("$userid/$query") {
                // TODO
                println(it)
                createTable(it)
            }
        }

        logout_button.setOnClickListener {
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
        }
    }

    private fun createTable(jsonArray: JSONArray) {
        if (jsonArray.length() == 0){
            Toast.makeText(this, "No data matches your query.", Toast.LENGTH_LONG).show()
            return
        }
        table_layout.removeAllViews()
        var row = TableRow(this)
        var jsonObject = jsonArray.getJSONObject(0)
        var iterator: Iterator<String> = jsonObject.keys()
        while (iterator.hasNext()) {
            val key = iterator.next()
            val textview = layoutInflater.inflate(R.layout.headertext, null) as TextView
            textview.text = key
            row.addView(textview)
        }
        table_layout.addView(row)
        for (i in 0 until jsonArray.length()) {
            row = TableRow(this)
            jsonObject = jsonArray.getJSONObject(i)
            iterator = jsonObject.keys()
            while (iterator.hasNext()) {
                val key = iterator.next()
                val textview = layoutInflater.inflate(R.layout.rowtext, null) as TextView
                textview.text = jsonObject.getString(key)
                row.addView(textview)
            }
            table_layout.addView(row)
        }
    }
}
