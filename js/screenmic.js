// console.log("This is Console for screenmic js");

let btn_record1 = document.getElementById("btn_record1").addEventListener("click", async () => {
    // console.log(btn);


    let checkbox1 = document.getElementById("checkbox1");
    // console.log(checkbox1);

    if (checkbox1.checked) {

        let main = document.getElementById("main-container");
        main.style.display = 'none';

        // console.log("check btn");

        // let video = document.getElementById("video")

        let stream = null,
            audio = null,
            mixedStream = null,
            chunks = [],
            recorder = null
        startButton = null,
            stopButton = null,
            downloadButton = null,
            recordedVideo = null;

        async function setupStream() {
            try {
                stream = await navigator.mediaDevices.getDisplayMedia({
                    video: true
                });

                audio = await navigator.mediaDevices.getUserMedia({
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        sampleRate: 44100,
                    },
                });

                setupVideoFeedback();
            } catch (err) {
                // console.error(err)
            }
        }

        function setupVideoFeedback() {
            if (stream) {
                const video = document.getElementById('video');
                video.style.display = "block"
                video.srcObject = stream;
                // console.log(video)
                video.play();
                let mic = document.getElementById("mic_download").style.display = 'block';
            } else {
                // console.warn('No stream available');
            }
        }


        
        // setupStream()

        async function startRecording() {
            await setupStream();

            if (stream && audio) {
                mixedStream = new MediaStream([...stream.getTracks(), ...audio.getTracks()]);
                recorder = new MediaRecorder(mixedStream);
                recorder.ondataavailable = handleDataAvailable;
                recorder.onstop = handleStop;
                recorder.start(1000);

                // startButton.disabled = true;
                // stopButton.disabled = false;

                // console.log('Recording started');
            } else {
                // console.warn('No stream available.');
            }
        }

        startRecording()





        function handleDataAvailable(e) {
            chunks.push(e.data);
        }

        function handleStop(e) {
            const blob = new Blob(chunks, { 'type': 'video/mp4' });
            chunks = [];

            




            let mic_download = document.getElementById("mic_download");
            mic_download.style.display = 'block'

            mic_download.href = URL.createObjectURL(blob);
            mic_download.download = 'video.mp4';
            mic_download.disabled = false;

            const video = document.getElementById('video');
                video.style.display = "none"

            let recordedVideo = document.getElementById("recordedVideo");
            recordedVideo.style.display = 'block';

            // console.log(recordedVideo);


            recordedVideo.src = URL.createObjectURL(blob);
            recordedVideo.load();
            recordedVideo.onloadeddata = function () {
                const rc = document.querySelector(".recorded-video-wrap");
                rc.classList.remove("hidden");
                rc.scrollIntoView({ behavior: "smooth", block: "start" });

                recordedVideo.play();
            }

            stream.getTracks().forEach((track) => track.stop());
            audio.getTracks().forEach((track) => track.stop());

            // console.log('Recording stopped');
        }


        let mic_download = document.getElementById("mic_download").addEventListener("click", () => {
            alert("mic_download")
            handleStop();
        })



    }





    else if (checkbox2.checked) {

        let main = document.getElementById("main-container");
        main.style.display = 'none';



        var displayMediaOptions = {
            video: {
                cursor: "always"
            },
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                sampleRate: 44100
            }
        };

        navigator.mediaDevices.getDisplayMedia(displayMediaOptions).then((strem) => {
            // console.log(strem, "stream");



            let videoElem = document.getElementById("System1")
            // console.log(videoElem);

            videoElem.style.display = 'block'
            videoElem.srcObject = strem;


            const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9")
                ? "video/webm; codecs=vp9"
                : "video/webm"
            let mediaRecorder = new MediaRecorder(strem, {
                mimeType: mime
            })
            // console.log(mediaRecorder, "mediaRecorder")

            // console.log(strem, "strem");



            let chunks = [];
            mediaRecorder.addEventListener('dataavailable', function (e) {
                chunks.push(e.data);
                console.log(chunks, "chhunks");
            });

            

            mediaRecorder.addEventListener('stop', function () {
                let blob = new Blob(chunks, {
                    type: chunks[0].type
                });
                // console.log(blob, "sckjcsc");

                let videoElem = document.getElementById("System1")
                // console.log(videoElem)
                videoElem.style.display = 'none';


                let system_down = document.getElementById("system_down");
                // console.log(system_down);
                system_down.style.display = 'block'
                system_down.src = URL.createObjectURL(blob);

                let System2 = document.getElementById("system_download");
                // console.log(System2);
                System2.style.display = 'block'
                System2.href = URL.createObjectURL(blob);
            });

            mediaRecorder.start(1000)
        });




    }


})

// 