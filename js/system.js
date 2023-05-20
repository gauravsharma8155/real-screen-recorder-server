// console.log("this is console for screenmicc.js");

let img = document.getElementById("img").addEventListener("click", () => {
    location.href = 'index.html'
})

let stream, audio, mixstream, chunks = [],
    recorder1, video

    Recordvideo = async () => {
    try {
        stream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio:true     
        })

        Showvideo()
    } catch (error) {
        // console.log(error)
    }
}

Showvideo = () => {
    if (stream) {
        let video = document.getElementById("video");
        // console.log(video)
        video.srcObject = stream
        video.play()
    }
}


collecdata = async () => {
    await Recordvideo()
    // console.log("console for fun3");

    if (stream) {
        mixstream = new MediaStream([
            ...stream.getTracks()
        ]);

        recorder1 = new MediaRecorder(mixstream);
        recorder1.ondataavailable = handledatavailble;
        // console.log(handledatavailble)
        recorder1.onstop = stopdata
        recorder1.pause
       
        recorder1.start(200);
        // console.log(recorder1, "ccs")
    }


}

let pause = document.getElementById("pause")

pause = document.getElementById("pause").addEventListener("click", async () => {
  
    let rec = await recorder1;
    // console.log(rec)
    await recorder1.pause();
    let video = document.getElementById("video");
    video.pause();
    let pause = document.getElementById("pause")
    pause.style.display = 'none'
    let resume = document.getElementById("resume").style.display = 'block'
})

resume = document.getElementById("resume").addEventListener("click", async () => {
  
    let rec = await recorder1;
    // console.log(rec)
    await recorder1.resume();
    let video = document.getElementById("video");
    video.play()
    let pause = document.getElementById("pause")
    pause.style.display = 'block'
    let resume = document.getElementById("resume").style.display = 'none'

})

handledatavailble = (e) => {
    chunks.push(e.data)
}

stopRecord = () => {
    // console.log("for stopRecord");
    // console.log(recorder1, "for")
    recorder1.stop()
    stream.getTracks()
        .forEach(track => track.stop());
    let video = document.getElementById("video").style.display = 'none'
    let Record_data = document.getElementById("Record_data").style.display = 'block'
    let stop = document.getElementById("stop").style.display = 'none'
    let download = document.getElementById("download").style.display = 'block'
    let pause = document.getElementById("pause")
    pause.style.display='none'
    let resume = document.getElementById("resume")
    resume.style.display='none'

}
collecdata()
stopdata = () => {
    let blob = new Blob(chunks, {
        type: 'video/mp4'
    });
    chunks = []

    let pause = document.getElementById("pause")
    pause.style.display = 'none'

    download = document.getElementById("download");
    // console.log(download);
    download.href = URL.createObjectURL(blob)

    let Record_data = document.getElementById("Record_data");
    Record_data.src = URL.createObjectURL(blob)
}

let stop = document.getElementById("stop").addEventListener("click", stopRecord);