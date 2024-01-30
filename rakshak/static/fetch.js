var myHeaders = new Headers();
myHeaders.append("Accept", "application/json, text/plain, */*");
myHeaders.append("Authorization", "0ELDJvqbaDLzAGPIR1Dfv38ehE21HkMjxWkXYWq-Mk1bajlyyxXMyHGpwb3lD2cz");
myHeaders.append("Connection", "keep-alive");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");

function asr_mr_to_en(audio){
  var raw = {
    "pipelineTasks": [
      {
        "taskType": "asr",
        "config": {
          "language": {
            "sourceLanguage": "en"
          },
          "serviceId":  
"ai4bharat/whisper-medium-en--gpu--t4"
        }
      },
      {
        "taskType": "translation",
        "config": {
          "language": {
            "sourceLanguage": "mr",
            "targetLanguage": "en"
          },
          "serviceId": "ai4bharat/indictrans-v2-all-gpu--t4"
        }
      }
    ],
    "inputData": {
      "audio": [
        {
          "audioContent": `${audio}`
        }
      ]
    }
  };
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(raw),
    redirect: 'follow'
  };
  
  fetch("https://dhruva-api.bhashini.gov.in/services/inference/pipeline", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}


// asr_mr_to_en()