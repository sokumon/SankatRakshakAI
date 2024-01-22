from flask import Flask, render_template, request, session
from rakshak import app

@app.get("/call")
def call():
    return render_template("call.html")
