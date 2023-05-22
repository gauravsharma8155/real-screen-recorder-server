console.log("this is console for screenmicc.js");


let img = document.getElementById("img").addEventListener("click", () => {
    location.href = 'index.html'
})

let stream, audio, mixstream, chunks = [],
    recorder1, video


Recordvideo = async () => {


    try {
        stream = await navigator.mediaDevices.getDisplayMedia({

            video: true,

        })

        audio = await navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                samplerate: 44100
            }
        })

        Showvideo()
    } catch (error) {

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
    console.log("this is console for stop333333333333333");

    await Recordvideo()
    // console.log("console for fun3");

    if (stream && audio) {
        mixstream = new MediaStream([
            ...stream.getTracks(),
            ...audio.getTracks()
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
    // console.log(pause)
    let rec = await recorder1;
    // console.log(rec)
    await recorder1.pause();
    let video = document.getElementById("video");
    video.pause();
    let pause = document.getElementById("pause")
    pause.style.display = 'none'
    let resume = document.getElementById("resume").style.display = 'block'

    // resume.style.display = 'block'


})

resume = document.getElementById("resume").addEventListener("click", async () => {
    // resume = document.getElementById("resume").style.display = 'block'
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


    console.log("this is console for stop222222222222222222");
    recorder1.stop()
    stream.getTracks()
        .forEach(track => track.stop());
    let video = document.getElementById("video").style.display = 'none'
    let Record_data = document.getElementById("Record_data").style.display = 'block'
    let stop = document.getElementById("stop").style.display = 'none'
    let download = document.getElementById("download").style.display = 'block'
    let pause = document.getElementById("pause")
    pause.style.display = 'none'
    let resume = document.getElementById("resume")
    resume.style.display = 'none'

    let src1 = document.getElementById("Record_data")
    let source = src1.src;
    console.log("stopRecord dwsdsdsdsd", source);




    // let video = document.getElementById("video");
    //     console.log(video)
    //     video.srcObject = null
    //     video.play()

}
collecdata()
stopdata = async () => {
    console.log("this is console for stop1111111111111");
    let blob = new Blob(chunks, {
        type: 'video/mp4'
    });
    chunks = []

    let pause = document.getElementById("pause")
    pause.style.display = 'none'

    download = document.getElementById("download");
    // console.log(download);
    download.href = URL.createObjectURL(blob)
    console.log(download.href, "for hrf");
    console.log(download, "for hrf>>>>>>>>>>>>>>>>>>>>>.");


    let download_link = download.href = URL.createObjectURL(blob);
    console.log(download_link, "for download_linkdownload_linkdownload_link  ");



    let Record_data = document.getElementById("Record_data");
    Record_data.src = URL.createObjectURL(blob);
}


async function Copy_btnfun() {
    let Record_data = document.getElementById("Record_data").src;
    console.log(Record_data);
    let blob = new Blob(chunks, {
        type: 'video/mp4'
    });

    console.log("for blob "+blob);


    try {
        const formData = new FormData();
        formData.append('video', blob, 'video.mp4');



        for (const form of formData.entries()) {
            console.log(form, 'form');
        }

        const options = {
            method: 'POST',
            body: formData
        };

        console.log(options);

        const response = fetch('https://www.realscreenrec.com/share/', options).then;
        console.log(response, "for reponse >>.");


        const result = await response.json();
        console.log(result, "for result>>>>>>>>.")
        console.log('API response:', result);
    } catch (error) {
        console.error('Error:', error);
    }


}
let stop = document.getElementById("stop").addEventListener("click", stopRecord);
let Copy_btn = document.getElementById("Copy_btn").addEventListener("click", Copy_btnfun);



// let start = document.getElementById("start").addEventListener("click",fun3 );