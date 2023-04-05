from flask import Flask, render_template, request, session
from rakshak import app
from rakshak.dbcalls.insertinto import insertinto
from rakshak.dbcalls.fetchall import fetchall
import json
from bson import json_util
@app.post("/insert")
def insert():
    data = request.get_json()
    print(type(data))
    insertinto(json_util.dumps(data))
    return json.loads()

@app.post("/fetch")
def fetch():
    calls = fetchall()
    return json.dumps(calls)
