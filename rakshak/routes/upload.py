from flask import Flask, render_template, request, session,jsonify
from rakshak import app,sock
import os
import time
from rakshak.nlppipeline.convert import convert_audio_image_to_video
from rakshak.nlppipeline.youtube import upload_video_to_youtube


@app.route('/upload', methods=['POST'])
def upload():
    try:
        audio_file = request.files['audio']

        # Generate a unique filename
        unique_filename = f"audio_{int(time.time())}.wav"

        # Save the audio file

        saved_file_name = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
        audio_file.save(saved_file_name)

        # image_file_name = os.path.join(app.config['NLP_PIPELINE'], 'test123.jpg')
        # audio_file_name = saved_file_name  # Replace with your dynamic audio file
        # output_file_name = os.path.join(app.config['NLP_PIPELINE'], 'output.mp4')

        # convert_audio_image_to_video(audio_file_name,image_file_name,output_file_name)


        # yt_link = upload_video_to_youtube(output_file_name)


        return jsonify({'status': 'success', 'message': 'Audio file received and saved successfully'})
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': str(e)})
