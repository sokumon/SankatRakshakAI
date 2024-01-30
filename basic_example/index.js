let leftchannel = []
let rightchannel = []
let recordingLength = 0
if (!navigator.getUserMedia)

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||

                      navigator.mozGetUserMedia || navigator.msGetUserMedia;

if (navigator.getUserMedia){

    navigator.getUserMedia({audio:true}, success, function(e) {

    alert("Error capturing audio.");

    });

} else alert("getUserMedia not supported in this browser.");

function success(e){

    // creates the audio context

    audioContext = window.AudioContext || window.webkitAudioContext;

    context = new audioContext();

    // retrieve the current sample rate to be used for WAV packaging

    sampleRate = context.sampleRate;

    // creates a gain node

    volume = context.createGain();

    // creates an audio node from the microphone incoming stream

    audioInput = context.createMediaStreamSource(e);

    // connect the stream to the gain node

    audioInput.connect(volume);

    /* From the spec: This value controls how frequently the audioprocess event is

    dispatched and how many sample-frames need to be processed each call.

    Lower values for buffer size will result in a lower (better) latency.

    Higher values will be necessary to avoid audio breakup and glitches */

    var bufferSize = 2048;

    recorder = context.createScriptProcessor(bufferSize, 2, 2);

    recorder.onaudioprocess = function(e){

        console.log ("recording");

        var left = e.inputBuffer.getChannelData (0);

        var right = e.inputBuffer.getChannelData (1);

        // we clone the samples

        leftchannel.push (new Float32Array (left));

        rightchannel.push (new Float32Array (right));

        recordingLength += bufferSize;

    }

    setTimeout(function(){
        console.log("asdsa")
        recorder.disconnect()

        
        var leftBuffer = mergeBuffers ( leftchannel, recordingLength );

        var rightBuffer = mergeBuffers ( rightchannel, recordingLength );

        // we interleave both channels together

        var interleaved = interleave ( leftBuffer, rightBuffer );

        // create the buffer and view to create the .WAV file

        var buffer = new ArrayBuffer(44 + interleaved.length * 2);

        var view = new DataView(buffer);

        // write the WAV container, check spec at: https://ccrma.stanford.edu/courses/422/projects/WaveFormat/

        // RIFF chunk descriptor

        writeUTFBytes(view, 0, "RIFF");

        view.setUint32(4, 44 + interleaved.length * 2, true);

        writeUTFBytes(view, 8, "WAVE");

        // FMT sub-chunk

        writeUTFBytes(view, 12, "fmt ");

        view.setUint32(16, 16, true);

        view.setUint16(20, 1, true);

        // stereo (2 channels)

        view.setUint16(22, 2, true);

        view.setUint32(24, sampleRate, true);

        view.setUint32(28, sampleRate * 4, true);

        view.setUint16(32, 4, true);

        view.setUint16(34, 16, true);

        // data sub-chunk

        writeUTFBytes(view, 36, "data");

        view.setUint32(40, interleaved.length * 2, true);

        // write the PCM samples

        var lng = interleaved.length;

        var index = 44;

        var volume = 1;

        for (var i = 0; i < lng; i++){

            view.setInt16(index, interleaved[i] * (0x7FFF * volume), true);

            index += 2;

        }

        // our final binary blob that we can hand off

        var blob = new Blob ( [ view ], { type : "audio/wav" } );

        blobToBase64(blob)


    },10000)

    // we connect the recorder

    volume.connect (recorder);

    recorder.connect (context.destination);

}

function mergeBuffers(channelBuffer, recordingLength){

    var result = new Float32Array(recordingLength);
  
    var offset = 0;
  
    var lng = channelBuffer.length;
  
    for (var i = 0; i < lng; i++){
  
      var buffer = channelBuffer[i];
  
      result.set(buffer, offset);
  
      offset += buffer.length;
  
    }
  
    return result;
  
}

function interleave(leftChannel, rightChannel){

    var length = leftChannel.length + rightChannel.length;
  
    var result = new Float32Array(length);
  
    var inputIndex = 0;
  
    for (var index = 0; index < length; ){
  
      result[index++] = leftChannel[inputIndex];
  
      result[index++] = rightChannel[inputIndex];
  
      inputIndex++;
  
    }
  
    return result;
  
}

function writeUTFBytes(view, offset, string){

    var lng = string.length;
  
    for (var i = 0; i < lng; i++){
  
      view.setUint8(offset + i, string.charCodeAt(i));
  
    }
  
}

const blobToBase64 = (blob) => {
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      let base64data = reader.result;
      console.log("Base64dataIs :: ", base64data);
      let arrays = base64data.split(",")
      asr_mr_to_en(arrays[1])
      return base64data;
    };
  };

