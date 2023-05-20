

let img = document.getElementById("img").addEventListener("click", () => {
  location.href = "index.html";
});

StratCameraRecording = async () => {
  const parts = [];
  let mediaRecorder;

  navigator.mediaDevices
    .getUserMedia({
      video: true,
    })
    .then((stream) => {
      let data2 = document.getElementById("data");
      data2.style.display = "block";
      data2.srcObject = stream;

      // let download1 = document.getElementById("download1")
      // download1.style.display = 'block'

      // download1.addEventListener("click", () => {
  

      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.start(1000);
      mediaRecorder.onstop = mediaRecorder.ondataavailable = function (e) {
        parts.push(e.data);
      };

      //// Pause the video 

      pausevideo = async () => {
        let data2 = await document.getElementById("data");
       
        data2.pause();

        let pause = await mediaRecorder;
    
        mediaRecorder.pause();

        let pause2 = document.getElementById("pause");
        pause2.style.display = "none";
        let resume = document.getElementById("resume");
        resume.style.display = "block";
      };

        //// for  Resume the video 

      resumevideo = async () => {
        let data2 = document.getElementById("data");
      
        data2.play();
        let resume = await mediaRecorder;
       
        mediaRecorder.resume();

        let pause2 = document.getElementById("pause");
        pause2.style.display = "block";
        let resume2 = document.getElementById("resume");
        resume2.style.display = "none";
      };

      let pause = document
        .getElementById("pause")
        .addEventListener("click", pausevideo);
      let resume = document
        .getElementById("resume")
        .addEventListener("click", resumevideo);

      // });

      let download2 = document.getElementById("download");
    

      let blob;

      ////// 

      collectdata = () => {
        // mediaRecorder.stop();

        const blob = new Blob(parts, {
          type: "video/webm",
        });

        let Record_data = document.getElementById("data2");
        Record_data.src = URL.createObjectURL(blob);

        let download2 = document.getElementById("download");
        download2.href = URL.createObjectURL(blob);

        let pause = (document.getElementById("pause").style.display = "none");
      };


/////   Show the video  in video tag
      showdata = async () => {
      
        mediaRecorder.stop();
        stream.getTracks().forEach((track) => track.stop());
        let video = (document.getElementById("data").style.display = "none");
        let Record_data = (document.getElementById("data2").style.display =
          "block");
        let stop = (document.getElementById("stop").style.display = "none");
        let download = (document.getElementById("download").style.display =
          "block");
          let pause = document.getElementById("pause")
          pause.style.display='none'
          let resume = document.getElementById("resume")
          resume.style.display='none'
        collectdata();
      };

      let stop = document
        .getElementById("stop")
        .addEventListener("click", showdata);
    });
};

StratCameraRecording();

// });
