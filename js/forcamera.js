

let img = document.getElementById("img").addEventListener("click", () => {
    location.href = 'index.html'
})

let blob = null;

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


        document.getElementById("copy").addEventListener("click", async () => {
            console.log(blob, "for blob");

            document.querySelector("#video_text").style.display = "block";
            document.querySelector(".progress-container").style.display = "block";
            document.querySelector(".overlay").style.display = "block";


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
                // progressBar.value = 50;
                console.log("first")


                console.log(options);

                const Response = await fetch('https://www.realscreenrec.com/share/', options);
                console.log(Response, "for reponse >>.");

                const result = await Response.json();
                console.log(result, "for result>>>>>>>>.")
                console.log('API response:', result);
                progressBar.style.width = "100%";
                // progressBar.value = 100;

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
            document.querySelector(".overlay").style.display = "none";
            document.querySelector(".progress-container").style.display = "none";
            document.querySelector(".videon_text").style.display = "none";

            setTimeout(() => {
                document.getElementById("copy_1").textContent = "Copied..."
            }, 1000);

            setTimeout(() => {
                document.getElementById("copy_1").textContent = "Copy Link"
            }, 2000);
        })

        pausevide = async () => {
            // alert("this is alert")
            let data2 = document.getElementById("data");

            data2.pause()


            let pause = await mediaRecorder
            mediaRecorder.pause()

            let pause2 = document.getElementById("pause");
            pause2.style.display = 'none';
            let resume = document.getElementById("resume");
            resume.style.display = 'block'

        }

        resumevide = async () => {


            let data2 = document.getElementById("data");
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



        collectdata = () => {
            document.querySelector(".btn_copy").style.display = "block";

            // mediaRecorder.stop();

            blob = new Blob(parts, {

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
            pause.style.display = 'none'
            let resume = document.getElementById("resume")
            resume.style.display = 'none'
        }

        let stop = document.getElementById("stop").addEventListener("click", pausedata)
    });





}

StratCameraRecording();