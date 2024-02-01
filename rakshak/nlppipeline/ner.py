import requests
import json

def get_person_name_and_location(text):
    url = "https://ai4bharat-indicner.hf.space/run/predict"

    payload = json.dumps({
    "data": [
        text
    ]
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    ner_predictions = response.json()['data']

    person_name = ""
    location = ""
    print(ner_predictions)
    for sentence in ner_predictions:
        for i,(word, tag) in enumerate(sentence):
            if tag == 'B-PER' or tag == 'I-PER':
                person_name = person_name + " " + word
            elif tag == 'B-LOC':
                location = location + word
                if i < len(sentence) - 1:
                    next_tag = sentence[i + 1][1]
                    if next_tag == 'I-LOC' or next_tag == 'O':
                        location = location + " "+ sentence[i+1][0]


    return person_name,location

    
# get_person_name_and_location("My name is Soham. I'm stuck at the thane station.")
