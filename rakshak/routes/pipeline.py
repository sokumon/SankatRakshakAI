from flask import Flask, render_template, request, session,jsonify
from rakshak import app,sock
import os
import time
from rakshak.nlppipeline.ner import get_person_name_and_location
from rakshak.nlppipeline.zeroshot import give_type_of_emergency,give_priority
from rakshak.dbcalls.insertinto import insertinto

@app.route('/pipeline', methods=['POST'])
def pipeline():
    try:
        data = request.json
        asr_text = data['text']
        # Generate a unique filename
       
        person_name,location = get_person_name_and_location(asr_text)
        emergency_type = give_type_of_emergency(asr_text)
        call_priority  = give_priority(asr_text)

        info_dict = {
            "person_name": person_name,
            "location": location,
            "emergency_type": emergency_type,
            "call_priority": call_priority
        }

        print(info_dict)
        insertinto(info_dict)
        # Save the audio file
        return jsonify({'status':'success'})
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': str(e)})
