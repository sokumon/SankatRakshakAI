let url = `ws://${window.location.host}/voice`
var ws = new WebSocket(url)
ws.binaryType = "arraybuffer"
let audiocontext
let audiodata
let rec


var recordRTC = null;
ws.addEventListener("message", (event) => {
    audiocontext.decodeAudioData(event.data).then(
        decodedaudio =>{
            audiodata = decodedaudio
            const playSound = audiocontext.createBufferSource();
            playSound.buffer = audiodata;
            playSound.connect(audiocontext.destination);
            playSound.start(audiocontext.currentTime);
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
    audiocontext = new AudioContext()
    ws.send("hi")

}

let digits = document.getElementsByClassName("digit")
for(let i = 0;i<digits.length;i++){
    digits[i].addEventListener('click',function(){
        if(digits[i].innerText.split("\n")[0] == 1 || digits[i].innerText.split("\n")[0] == 2 || digits[i].innerText.split("\n")[0] == 3){
            ws.send(parseInt(digits[i].innerText.split("\n")[0]))
            makecall()
        }


    })
}

async function makecall(){
    navigator.mediaDevices.getUserMedia({
        audio: true
    }).then(async function(stream) {
        let recorder = RecordRTC(stream, {
            type: 'audio',
            recorderType: StereoAudioRecorder
        });
        recorder.startRecording();

        const sleep = m => new Promise(r => setTimeout(r, m));
        await sleep(3000);

        recorder.stopRecording(function() {
            let blob = recorder.getBlob();
            ws.send(blob)
        });
    });

}