let url = `ws://${window.location.host}/voice`
var ws = new WebSocket(url)
ws.binaryType = "arraybuffer"
let audiocontext
let audiodata
let rec

let mediaRecorder;
let audioChunks = [];

var recordRTC = null;
let durations = []
ws.addEventListener("message", (event) => {
    audiocontext.decodeAudioData(event.data).then(
        decodedaudio =>{
            audiodata = decodedaudio
            const playSound = audiocontext.createBufferSource();
            playSound.buffer = audiodata;
            playSound.connect(audiocontext.destination);
            playSound.start(audiocontext.currentTime);
            durations.push(decodedaudio.duration)
        }
    )
});

var call = document.getElementById("call")
// button.onclick = function(){
//     audiocontext = new AudioContext()
//     ws.send("hi")
// }

const constraints = {
    audio: true,
    video:false
};
function onError(err){
    console.log(err)
}




call.onclick = function(){
    let call_func = call.getAttribute("class");
    console.log(call_func)
    if(call_func == "call"){
        audiocontext = new AudioContext()
        ws.send("hi")
        let digits = document.getElementsByClassName("digit")
        for(let i = 0;i<digits.length;i++){
            digits[i].addEventListener('click',function(){
                if(digits[i].innerText.split("\n")[0] == 1 || digits[i].innerText.split("\n")[0] == 2 || digits[i].innerText.split("\n")[0] == 3){
                    ws.send(parseInt(digits[i].innerText.split("\n")[0]))
                    makecall()
                }
            })
        }
        
        call.setAttribute("class","endcall")
        let icon = document.getElementsByClassName("icon")[0]
        call.style.backgroundColor = "red"
        icon.style.backgroundColor = "red"
    }else{
        let icon = document.getElementsByClassName("icon")[0]
        call.style.backgroundColor = "#66bb6a"
        icon.style.backgroundColor = "#66bb6a"
        call.setAttribute("class","call")
        stopcall()

    }
}


    // navigator.mediaDevices.getUserMedia({
    //     audio: true
    // }).then(async function(stream) {
    //     mediaRecorder = new MediaRecorder(stream);

    //     mediaRecorder.ondataavailable = function (e) {
    //         if (e.data.size > 0) {
    //           audioChunks.push(e.data);
    //         }
    //     };
    
    //       // Event handler when recording is stopped
    //     mediaRecorder.onstop = function () {
    //         // Create a blob from the audio chunks
    //         const audioBlob = new Blob(audioChunks, { type: 'audio/wav'});
    //         // Create a download link for the audio file
    //         // const audioUrl = URL.createObjectURL(audioBlob);
    //         // const downloadLink = document.createElement('a');
    //         // downloadLink.href = audioUrl;
    //         // downloadLink.download = 'recorded_audio.wav';
    //         // document.body.appendChild(downloadLink);
    //         // downloadLink.click();
    //         // document.body.removeChild(downloadLink);

    //         // Generate a unique filename
    //         const audioData = { audioContent: audioBlob };
    //         var myHeaders = new Headers();
                        
    //         const uniqueFilename = `recording_${Date.now()}.mp3`;

    //         // Create a FormData object to send the file
    //         const formData = new FormData();
    //         formData.append('audio', audioBlob, uniqueFilename);

    //         // Send the audio file to the Flask server
    //         fetch(window.location.origin+'/upload', {
    //         method: 'POST',
    //         body: formData
    //         })
    //         .then(response => response.json())
    //         .then(data => {
    //           console.log('Server response:', data);
    //         })
    //         .catch(error => {
    //           console.error('Error sending audio to server:', error);
    //         });

    //         // Base64 Convert
    //         blobToBase64(audioBlob)
    //       };
    // });

// function makecall(){
//     setTimeout(() => {
//             console.log('Audio context is closed');
//             mediaRecorder.start()
//     }, durations[1] * 1000);
// }



//   const blobToBase64 = (blob) => {
//     var reader = new FileReader();
//     reader.readAsDataURL(blob);
//     reader.onloadend = function () {
//       let base64data = reader.result;
//       console.log("Base64dataIs :: ", base64data);
//       let arrays = base64data.split(",")
//       asr_mr_to_en(arrays[1])
//       return base64data;
//     };
//   };

