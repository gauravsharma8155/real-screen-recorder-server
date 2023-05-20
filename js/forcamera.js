

let img = document.getElementById("img").addEventListener("click", () => {
    location.href = 'index.html'
})


StratCameraRecording = async () => {
    const parts = [];
    let mediaRecorder

    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
    }).then(stream => {


        let data2 = document.getElementById("data");
        data2.style.display = 'block'
        data2.srcObject = stream
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.start(1000);
        mediaRecorder.onstop = 


        mediaRecorder.ondataavailable = function (e) {

            parts.push(e.data)
        }

        pausevide = async () => {
            // alert("this is alert")
            let data2 =  document.getElementById("data");

            data2.pause()


            let pause = await mediaRecorder
            mediaRecorder.pause()

            let pause2 = document.getElementById("pause");
            pause2.style.display = 'none';
            let resume = document.getElementById("resume");
            resume.style.display = 'block'

        }

        resumevide = async () => {


            let data2 =  document.getElementById("data");
            data2.play()
            let resume = await mediaRecorder
            mediaRecorder.resume();

            let pause2 = document.getElementById("pause");
            pause2.style.display = 'block';
            let resume2 = document.getElementById("resume");
            resume2.style.display = 'none'

        }

        let pause = document.getElementById("pause").addEventListener("click", pausevide)
        let resume = document.getElementById("resume").addEventListener("click", resumevide);


        // });



        let download2 = document.getElementById("download");
       

        let blob;

        collectdata = () => {

            // mediaRecorder.stop();

            const blob = new Blob(parts, {

                type: "video/webm"
            });

            let Record_data = document.getElementById("data2")
            Record_data.src = URL.createObjectURL(blob)

            let download2 = document.getElementById("download");
            download2.href = URL.createObjectURL(blob)

            let pause = document.getElementById("pause").style.display = 'none'


        };

        pausedata = async () => {
           
            mediaRecorder.stop()
            stream.getTracks()
                .forEach(track => track.stop());
            let video = document.getElementById("data").style.display = 'none'
            let Record_data = document.getElementById("data2").style.display = 'block'
            let stop = document.getElementById("stop").style.display = 'none'
            let download = document.getElementById("download").style.display = 'block'
            collectdata();
            let pause = document.getElementById("pause")
            pause.style.display='none'
            let resume = document.getElementById("resume")
            resume.style.display='none'
        }

        let stop = document.getElementById("stop").addEventListener("click", pausedata)
    });





}

StratCameraRecording();