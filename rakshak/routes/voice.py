from flask import Flask, render_template, request, session
from rakshak import app,sock
import os

@sock.route('/voice')
def echo(ws):
    while True:
        data = ws.receive()
        if data == 'hi':
            print(data)
            folder = app.root_path+"/texttospeech/"
            soundfile = open(f"{folder}mastercta.mp3",'rb')
            sound = soundfile.read()
            reply = f"Data recieved as:  {data}!"
            ws.send(sound)
        elif data =='start':
            print(data)
        elif data == '1':
            language_code = "en-US"
            print(type(data))
            folder = app.root_path+"/texttospeech/"
            english = open(f"{folder}english.mp3",'rb')
            engsound = english.read()
            print("hi")
            reply = f"Data recieved as:  {data}!"
            ws.send(engsound)
        elif data == '2':
            language_code = "hi-IN"
            folder = app.root_path+"/texttospeech/"
            soundfile = open(f"{folder}hindi.mp3",'rb')
            sound = soundfile.read()
            reply = f"Data recieved as:  {data}!"
            ws.send(sound)
        elif data == '3':
            language_code = "mr-IN"
            folder = app.root_path+"/texttospeech/"
            soundfile = open(f"{folder}marathi.mp3",'rb')
            sound = soundfile.read()
            reply = f"Data recieved as:  {data}!"
            ws.send(sound)
        else:
            print(data)
            wavfile = file("out.wav","wb")
            wavfile.write(data)