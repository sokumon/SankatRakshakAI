from flask import Flask, render_template, request, session,jsonify
from rakshak import app,sock
import os
import time


@app.route('/upload', methods=['POST'])
def upload():
    try:
        audio_file = request.files['audio']

        # Generate a unique filename
        unique_filename = f"audio_{int(time.time())}.wav"

        # Save the audio file

        saved_file_name = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
        audio_file.save(saved_file_name)


        return jsonify({'status': 'success', 'message': 'Audio file received and saved successfully'})
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': str(e)})
