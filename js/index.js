
console.log("indexjs")
let get_storage = localStorage.getItem("btn")
console.log( get_storage);

let on_off = false;
console.log(on_off)

if (on_off) {

    let scrren1 = document.getElementById("screen1").addEventListener("click", () => {


        let block1 = document.getElementById("block1");
        let block2 = document.getElementById("block2");
        let block3 = document.getElementById("block3");


        if (block1.style.display = 'block') {
            block2.style.display = 'none';
            block3.style.display = 'none'
        }



    })

    let scrren2 = document.getElementById("screen2").addEventListener("click", () => {


        let block1 = document.getElementById("block1");
        let block2 = document.getElementById("block2");
        let block3 = document.getElementById("block3");


        if (block2.style.display = 'block') {
            block1.style.display = 'none';
            block3.style.display = 'none'
        }


    })

    let scrren3 = document.getElementById("screen3").addEventListener("click", () => {


        let block1 = document.getElementById("block1");
        let block2 = document.getElementById("block2");
        let block3 = document.getElementById("block3");


        if (block3.style.display = 'block') {
            block1.style.display = 'none';
            block2.style.display = 'none'
        }

    })

    let btn_record1 = document.getElementById("btn_record1").addEventListener("click", () => {
        // console.log(btn);


        let checkbox1 = document.getElementById("checkbox1");
        console.log(checkbox1);
        let checkbox2 = document.getElementById("checkbox2");
        console.log(checkbox2);
        let checkbox3 = document.getElementById("checkbox3");
        console.log(checkbox3);




        if (checkbox1.checked) {
            location.href = 'screenmic.html'
        }

        else if (checkbox2.checked) {
            location.href = 'systemscreen.html'
        }

        else if (checkbox3.checked) {
            location.href = 'mic_systemscreen.html'
        }
        else {
            location.href = ' screen4.html'
        }




    });
    let btn_record3 = document.getElementById("btn_record3").addEventListener("click", () => {
        let checkbo1 = document.getElementById("checkbo1");
        let checkbo2 = document.getElementById("checkbo2");
        let checkbo3 = document.getElementById("checkbo3");
        if (checkbo3.checked) {
            location.href = 'scr_cam_mic.html'
        }

        else if (checkbo2.checked) {
            location.href = 'in2_scr_cam.html'
        }
        else if (checkbo1.checked) {
            location.href = 'in3_scr_cam.html'
        }


        else location.href = 'screencam4.html'






    });

    let btn_record2 = document.getElementById("btn_record2").addEventListener("click", async () => {
        let checkboxx2 = document.getElementById("checkboxx2");
        if (checkboxx2.checked) {
            location.href = 'Camera.html'
        }
        else {
            location.href = 'onlycamera.html'
        }


    })
    var current_val = false;
    let check = document.getElementById("check");
    check.addEventListener("click", () => {

        current_val = !current_val;

        if (current_val == true) {
            let btn_mic = document.querySelector(".mic_btn");
            btn_mic.style.display = 'block'
        }
        else {
            let btn_mic = document.querySelector(".mic_btn");
            btn_mic.style.display = 'none'
        }
    })
    let check1 = document.getElementById("check1");
    check1.addEventListener("click", () => {
        // console.log("first")
        current_val = !current_val;
        // console.log("this is console for check")

        if (current_val == true) {
            // console.log("display will become none");

            // let btn_mic = document.querySelector(".mic_btn");
            let micbt = document.querySelector(".mic_btn1")
            micbt.style.display = 'block'
            // console.log(micbt);

        }
        else {

            let btn_mic = document.querySelector(".mic_btn1");
            btn_mic.style.display = 'none'
            // console.log(btn_mic)

            // console.log("display will be block")
        }
    })

    let check2 = document.getElementById("check2");
    check2.addEventListener("click", () => {
        // console.log("first")
        current_val = !current_val;
        // console.log("this is console for check")

        if (current_val == true) {
            // console.log("display will become none");

            // let btn_mic = document.querySelector(".mic_btn");
            let micbt = document.querySelector(".mic_btn2")
            micbt.style.display = 'block'
            // console.log(micbt);

        }
        else {

            let btn_mic = document.querySelector(".mic_btn2");
            btn_mic.style.display = 'none'
            // console.log(btn_mic)

            // console.log("display will be block")
        }
    })

}

let btn_confrim = document.getElementById("btn_confrim");
btn_confrim.addEventListener("click", () => {
    document.querySelector(".privacy").style.display = "none";
    // localStorage.setItem("btn", true);  
    // on_off = true

    // if (on_off) {

        let scrren1 = document.getElementById("screen1").addEventListener("click", () => {
    
    
            let block1 = document.getElementById("block1");
            let block2 = document.getElementById("block2");
            let block3 = document.getElementById("block3");
    
    
            if (block1.style.display = 'block') {
                block2.style.display = 'none';
                block3.style.display = 'none'
            }
    
    
    
        })
    
        let scrren2 = document.getElementById("screen2").addEventListener("click", () => {
    
    
            let block1 = document.getElementById("block1");
            let block2 = document.getElementById("block2");
            let block3 = document.getElementById("block3");
    
    
            if (block2.style.display = 'block') {
                block1.style.display = 'none';
                block3.style.display = 'none'
            }
    
    
        })
    
        let scrren3 = document.getElementById("screen3").addEventListener("click", () => {
    
    
            let block1 = document.getElementById("block1");
            let block2 = document.getElementById("block2");
            let block3 = document.getElementById("block3");
    
    
            if (block3.style.display = 'block') {
                block1.style.display = 'none';
                block2.style.display = 'none'
            }
    
        })
    
        let btn_record1 = document.getElementById("btn_record1").addEventListener("click", () => {
            // console.log(btn);
    
    
            let checkbox1 = document.getElementById("checkbox1");
            console.log(checkbox1);
            let checkbox2 = document.getElementById("checkbox2");
            console.log(checkbox2);
            let checkbox3 = document.getElementById("checkbox3");
            console.log(checkbox3);
    
    
    
    
            if (checkbox1.checked) {
                location.href = 'screenmic.html'
            }
    
            else if (checkbox2.checked) {
                location.href = 'systemscreen.html'
            }
    
            else if (checkbox3.checked) {
                location.href = 'mic_systemscreen.html'
            }
            else {
                location.href = ' screen4.html'
            }
    
    
    
    
        });
        let btn_record3 = document.getElementById("btn_record3").addEventListener("click", () => {
            let checkbo1 = document.getElementById("checkbo1");
            let checkbo2 = document.getElementById("checkbo2");
            let checkbo3 = document.getElementById("checkbo3");
            if (checkbo3.checked) {
                location.href = 'scr_cam_mic.html'
            }
    
            else if (checkbo2.checked) {
                location.href = 'in2_scr_cam.html'
            }
            else if (checkbo1.checked) {
                location.href = 'in3_scr_cam.html'
            }
    
    
            else location.href = 'screencam4.html'
    
    
    
    
    
    
        });
    
        let btn_record2 = document.getElementById("btn_record2").addEventListener("click", async () => {
            let checkboxx2 = document.getElementById("checkboxx2");
            if (checkboxx2.checked) {
                location.href = 'Camera.html'
            }
            else {
                location.href = 'onlycamera.html'
            }
    
    
        })
        var current_val = false;
        let check = document.getElementById("check");
        check.addEventListener("click", () => {
    
            current_val = !current_val;
    
            if (current_val == true) {
                let btn_mic = document.querySelector(".mic_btn");
                btn_mic.style.display = 'block'
            }
            else {
                let btn_mic = document.querySelector(".mic_btn");
                btn_mic.style.display = 'none'
            }
        })
        let check1 = document.getElementById("check1");
        check1.addEventListener("click", () => {
            // console.log("first")
            current_val = !current_val;
            // console.log("this is console for check")
    
            if (current_val == true) {
                // console.log("display will become none");
    
                // let btn_mic = document.querySelector(".mic_btn");
                let micbt = document.querySelector(".mic_btn1")
                micbt.style.display = 'block'
                // console.log(micbt);
    
            }
            else {
    
                let btn_mic = document.querySelector(".mic_btn1");
                btn_mic.style.display = 'none'
                // console.log(btn_mic)
    
                // console.log("display will be block")
            }
        })
    
        let check2 = document.getElementById("check2");
        check2.addEventListener("click", () => {
            // console.log("first")
            current_val = !current_val;
            // console.log("this is console for check")
    
            if (current_val == true) {
                // console.log("display will become none");
    
                // let btn_mic = document.querySelector(".mic_btn");
                let micbt = document.querySelector(".mic_btn2")
                micbt.style.display = 'block'
                // console.log(micbt);
    
            }
            else {
    
                let btn_mic = document.querySelector(".mic_btn2");
                btn_mic.style.display = 'none'
                // console.log(btn_mic)
    
                // console.log("display will be block")
            }
        })
    
    // }
})






















