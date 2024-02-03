var myHeaders = new Headers();
myHeaders.append("Accept", "application/json, text/plain, */*");
myHeaders.append("Authorization", "0ELDJvqbaDLzAGPIR1Dfv38ehE21HkMjxWkXYWq-Mk1bajlyyxXMyHGpwb3lD2cz");
myHeaders.append("Connection", "keep-alive");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");

function asr_en(audio){
  var raw = {
    "pipelineTasks": [
      {
        "taskType": "asr",
        "config": {
          "language": {
            "sourceLanguage": "en"
          },
          "serviceId":"ai4bharat/whisper-medium-en--gpu--t4"
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
    .then(response => response.json())
    .then(result => send_to_pipeline(result))
    .catch(error => console.log('error', error));
}


function send_to_pipeline(result){
    let asr_text = result.pipelineResponse[0].output[0].source
    if(asr_text){
      //  send to ner and zero_shot
      console.log(asr_text)
      let sent_data = {
        'text': asr_text
      }
      var headers = new Headers()
      headers.append("Content-Type", "application/json");
      var requestOptions = {
        method: 'POST',
        body: JSON.stringify(sent_data),
        headers:headers
      };
      fetch(window.location.origin+"/pipeline", requestOptions)
      .then(response => response.json())
      .then(result => reload_check(result))
      .catch(error => console.log('error', error));
    }

}


function reload_check(result){
  if(result.status === "success"){
    window.location.reload()
  }
}
// asr_mr_to_en()