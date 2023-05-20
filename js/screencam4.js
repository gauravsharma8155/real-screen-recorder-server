
let img = document.getElementById("img").addEventListener("click", () => {
  location.href = 'index.html'
})



let localCamStream,
  localScreenStream,
  localOverlayStream,
  rafId,
  cam,
  screen,
  mediaRecorder,
  audioContext,
  audioDestination;

let blob;


let mediaWrapperDiv = document.getElementById("mediaWrapper");

let canvasElement = document.createElement("canvas");
let canvasCtx = canvasElement.getContext("2d");
let encoderOptions = {
  mimeType: ("video/webm; codecs=vp9") ? "video/webm; codecs=vp9" : "video/webm"
};
let recordedChunks = [];
let audioTracks = [];



const requestVideoFrame = function (callback) {
  return window.setTimeout(function () {
    callback(Date.now());
  }, 1000 / 60); // 60 fps - just like requestAnimationFrame
};



const cancelVideoFrame = function (id) {
  clearTimeout(id);
};

async function startWebcamFn() {
  localCamStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: {
      deviceId: {
        exact: "communications"
      }
    }
  });
  if (localCamStream) {
    cam = await attachToDOM("justWebcam", localCamStream);
  }
}

async function startScreenShareFn() {
  localScreenStream = await navigator.mediaDevices.getDisplayMedia({
    video: true,
    // audio: true
  });
  if (localScreenStream) {
    screen = await attachToDOM("justScreenShare", localScreenStream);
  }
}



async function makeComposite() {
  if (cam && screen) {
    canvasCtx.save();
    canvasElement.setAttribute("width", `${screen.videoWidth}px`);
    canvasElement.setAttribute("height", `${screen.videoHeight}px`);
    canvasCtx.clearRect(0, 0, screen.videoWidth, screen.videoHeight);
    canvasCtx.drawImage(screen, 0, 0, screen.videoWidth, screen.videoHeight);
    canvasCtx.drawImage(
      cam,
      0,
      Math.floor(screen.videoHeight - screen.videoHeight / 4),
      Math.floor(screen.videoWidth / 4),
      Math.floor(screen.videoHeight / 4)
    ); // this is just a rough calculation to offset the webcam stream to bottom left
    let imageData = canvasCtx.getImageData(
      0,
      0,
      screen.videoWidth,
      screen.videoHeight
    ); // this makes it work
    canvasCtx.putImageData(imageData, 0, 0); // properly on safari/webkit browsers too
    canvasCtx.restore();
    rafId = requestVideoFrame(makeComposite);
  }
}

async function mergeStreamsFn(callback) {
  document.getElementById("mutingStreams").style.display = "block";
  await makeComposite();
  audioContext = new AudioContext();
  audioDestination = audioContext.createMediaStreamDestination();
  let fullVideoStream = canvasElement.captureStream();
  let existingAudioStreams = [
    ...(localCamStream ? localCamStream.getAudioTracks() : []),
    ...(localScreenStream ? localScreenStream.getAudioTracks() : [])
  ];
  audioTracks.push(
    audioContext.createMediaStreamSource(
      new MediaStream([existingAudioStreams[0]])
    )
  );
  if (existingAudioStreams.length > 1) {
    audioTracks.push(
      audioContext.createMediaStreamSource(
        new MediaStream([existingAudioStreams[1]])
      )
    );
  }
  audioTracks.map((track) => track.connect(audioDestination));

  localOverlayStream = new MediaStream([...fullVideoStream.getVideoTracks()]);
  let fullOverlayStream = new MediaStream([
    ...fullVideoStream.getVideoTracks(),
    ...audioDestination.stream.getTracks()
  ]);

  if (localOverlayStream) {
    overlay = await attachToDOM("pipOverlayStream", localOverlayStream);
    mediaRecorder = new MediaRecorder(fullOverlayStream, encoderOptions);
    mediaRecorder.ondataavailable = handleDataAvailable;
    overlay.volume = 0;
    cam.volume = 0;
    screen.volume = 0;
    cam.style.display = "none";
    // localCamStream.getAudioTracks().map(track => { track.enabled = false });
    screen.style.display = "none";
    callback()
    // localScreenStream.getAudioTracks().map(track => { track.enabled = false });
  }
}

func = async () => {
  let pipOverlayStream = await document.getElementById("pipOverlayStream");
 
  pipOverlayStream.pause()


  let pause = await mediaRecorder
 
  mediaRecorder.pause()

  let pause2 = document.getElementById("pause");
  pause2.style.display = 'none';
  let resume = document.getElementById("resume");
  resume.style.display = 'block'

}

func2 = async () => {
  let pause = document.getElementById("pause");

  let pipOverlayStream =  document.getElementById("pipOverlayStream");
  
  pipOverlayStream.play()
  let resume = await mediaRecorder
  
  mediaRecorder.resume();

  let pause2 = document.getElementById("pause");
  pause2.style.display = 'block';
  let resume2 = document.getElementById("resume");
  resume2.style.display = 'none'

}



async function startRecordingFn() {

  mediaRecorder.start();
  
  document.getElementById("pipOverlayStream")
  // document.getElementById(
  //   "recordingState"
  // ).innerHTML = `${mediaRecorder.state}...`;
}

async function attachToDOM(id, stream) {
  let videoElem = document.createElement("video");
  videoElem.id = id;
  videoElem.width = 640;
  videoElem.height = 360;
  videoElem.autoplay = true;
  videoElem.setAttribute("playsinline", true, {muted:true});
  videoElem.srcObject = new MediaStream(stream.getTracks());
  mediaWrapperDiv.appendChild(videoElem);
  return videoElem;
}

function handleDataAvailable(event) {
  
  if (event.data.size > 0) {
    recordedChunks.push(event.data);

    download();
  } else {}
}

function stoprecordingdata() {
  blob = new Blob(recordedChunks, {
    type: "video/webm"
  });

}


function download() {
  blob = new Blob(recordedChunks, {
    type: "video/webm"
  });


  let data  = document.getElementById("data");
  data.src = URL.createObjectURL(blob);


  let download = document.getElementById("download")
  download.href = URL.createObjectURL(blob);

  // return blob
  // var url = URL.createObjectURL(blob);
  // var a = document.createElement("a");
  // document.body.appendChild(a);
  // a.style = "display: none";
  // a.href = url;
  // a.download = "result.webm";
  // a.click();
  // window.URL.revokeObjectURL(url);

}

async function  stopAllStreamsFn () {
  
  
  // [
  //   ...(localCamStream ? localCamStream.getTracks() : []),
  //   ...(localScreenStream ? localScreenStream.getTracks() : []),
  //   ...(localOverlayStream ? localOverlayStream.getTracks() : [])
 await mediaRecorder.stop();


  // ].map((track) => track.stop());
  localCamStream.getTracks()
  .forEach(track => track.stop());
  
  let pipOverlayStream = await document.getElementById("pipOverlayStream")
  pipOverlayStream.style.display = 'none'

  let data = document.getElementById("data").style.display = 'block'
  // let stop = document.getElementById("stop").style.display = 'none'
  let  download = document.getElementById("download").style.display  = 'block'
  

  let pause2 = document.getElementById("pause");
  pause2.style.display = 'none';
  let resume2 = document.getElementById("resume");
  resume2.style.display = 'none'

  let stop_record = document.getElementById("stop_record");
  stop_record.style.display = 'none'


  

}

const blobdata = async () => {

  let v = await blob;
  
}



function stopRecordingFn() {
  

}

// function stopRecordingFn2() {
//   mediaRecorder.stop();

// }



// let start = document.getElementById("start").addEventListener("click", ()=>{

allfunction = async () => {

  await startWebcamFn();
  await startScreenShareFn();

  setTimeout(() => {
    mergeStreamsFn(startRecordingFn)
  }, 1000);

  // setTimeout(() => {

  //   startRecordingFn();
  // }, 3000);
}

allfunction()
let pause = document.getElementById("pause").addEventListener("click", func)
let resume = document.getElementById("resume").addEventListener("click", func2);
// }, 6000);


let stop_record = document.getElementById("stop_record").addEventListener("click", stopAllStreamsFn)