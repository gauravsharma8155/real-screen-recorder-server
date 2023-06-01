

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
  }, 1000 / 60);
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
    audio: true
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
    );
    let imageData = canvasCtx.getImageData(
      0,
      0,
      screen.videoWidth,
      screen.videoHeight
    );
    canvasCtx.putImageData(imageData, 0, 0);
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

    screen.style.display = "none";
    callback()

  }


}

// pause = async () => {


// }

// resume = async () => {


// }



async function startRecordingFn() {

  mediaRecorder.start();

  document.getElementById("pipOverlayStream")
}

async function attachToDOM(id, stream) {
  let videoElem = document.createElement("video");
  videoElem.id = id;
  videoElem.width = 640;
  videoElem.height = 360;
  videoElem.autoplay = true;
  videoElem.setAttribute("playsinline", true);
  videoElem.srcObject = new MediaStream(stream.getTracks());
  mediaWrapperDiv.appendChild(videoElem);
  return videoElem;
}

function handleDataAvailable(event) {

  if (event.data.size > 0) {
    recordedChunks.push(event.data);

    download();
  } else { }
}

function stoprecordingdata() {
  console.log("stop recording data................................");
  blob = new Blob(recordedChunks, {
    type: "video/webm"
  });

}


function download() {
  blob = new Blob(recordedChunks, {
    type: "video/webm"
  });


  let data = document.getElementById("data");
  data.src = URL.createObjectURL(blob);


  let download = document.getElementById("download")
  download.href = URL.createObjectURL(blob);


}

async function stopAllStreamsFn() {

  console.log("Stopping all streams11111111111111111111")
  // document.querySelector(".progress-container").style.display = "block";
  let btn_copy = document.querySelector(".btn_copy");
  btn_copy.style.display = 'block';


  await mediaRecorder.stop();



  localCamStream.getTracks()
    .forEach(track => track.stop());

  let pipOverlayStream = document.getElementById("pipOverlayStream")
  pipOverlayStream.style.display = 'none'

  let data = document.getElementById("data").style.display = 'block'
  let download = document.getElementById("download").style.display = 'block'


  let pause2 = document.getElementById("pause");
  pause2.style.display = 'none';
  let resume2 = document.getElementById("resume");
  resume2.style.display = 'none'

  let stop_record = document.getElementById("stop_record");
  stop_record.style.display = 'none'




}






allfunction = async () => {

  await startWebcamFn();
  await startScreenShareFn();

  setTimeout(() => {
    mergeStreamsFn(startRecordingFn)
  }, 1000);


}

allfunction()






let pause = document.getElementById("pause").addEventListener("click", async () => {
  let pipOverlayStream = document.getElementById("pipOverlayStream");

  pipOverlayStream.pause()


  let pause = await mediaRecorder

  mediaRecorder.pause()

  let pause2 = document.getElementById("pause");
  pause2.style.display = 'none';
  let resume = document.getElementById("resume");
  resume.style.display = 'block'
})
let resume = document.getElementById("resume").addEventListener("click", async () => {
  let pause = document.getElementById("pause");


  let pipOverlayStream = document.getElementById("pipOverlayStream");

  pipOverlayStream.play()
  let resume = await mediaRecorder

  mediaRecorder.resume();

  let pause2 = document.getElementById("pause");
  pause2.style.display = 'block';
  let resume2 = document.getElementById("resume");
  resume2.style.display = 'none'
});



let stop_record = document.getElementById("stop_record").addEventListener("click", stopAllStreamsFn)


document.getElementById("copy").addEventListener("click", async () => {
  console.log(blob, "for blob");
  document.querySelector("#video_text").style.display = "block";
  document.querySelector(".progress-container").style.display = "block";
  document.querySelector(".show_video").style.filter ='contrast(0.5)';


  try {
    // document.querySelector(".progress-bar").style.display = "block";

    const progressBar = document.getElementById('progress-bar_1');
    // progressBar.value = 0;








    const formData = new FormData();
    formData.append('video', blob, 'video.mp4');



    for (const form of formData.entries()) {
      console.log(form, 'form');
    }

    const options = {
      method: 'POST',
      body: formData
    };
    setTimeout(() => {
      progressBar.style.width = "30%";
  }, 500);
    console.log("first")


    console.log(options);

    const Response = await fetch('https://www.realscreenrec.com/share/', options);
    console.log(Response, "for reponse >>.");

    const result = await Response.json();
    console.log(result, "for result>>>>>>>>.")
    console.log('API response:', result);
    progressBar.style.width = "100%";
    progressBar.value = 100;

    document.getElementById("copy").style.display = "none";


    working_url = result.url;
    // navigator.clipboard.writeText(working_url);
    document.querySelector(".btn_copy").style.display = "none";
    document.querySelector(".btn_copy_1").style.display = "block";



  }
  catch (e) {
    console.log(console.error(e))
  }



  // let Record_data = document.getElementById("Record_data").src;
  // console.log(Record_data);
  // console.log(working_url, "for working...");
  // navigator.clipboard.writeText(working_url);

});

document.getElementById("copy_1").addEventListener("click", () => {
  navigator.clipboard.writeText(working_url);
  document.querySelector(".show_video").style.filter ='';
  document.querySelector(".progress-container").style.display = "none";
  document.querySelector(".videon_text").style.display = "none";

  setTimeout(() => {
    document.getElementById("copy_1").textContent = "Copied..."
  }, 1000);

  setTimeout(() => {
    document.getElementById("copy_1").textContent = "Copy Link"
  }, 2000);
})
