let video = document.getElementById("video");
let where = document.getElementById("where");
let model;
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const setupCamera = () => {
    navigator.mediaDevices.getUserMedia({
        video: { width: 600, height: 400 },
        audio: false,
    }).then(stream => {
        video.srcObject = stream;
    });

};

const detectFaces = async () => {
    const prediction = await model.estimateFaces(video, false);

    ctx.drawImage(video, 0, 0, 600, 400);



    prediction.forEach(pred => {


        ctx.fillStyle = "red";

        ctx.fillRect(pred.landmarks[0][0], pred.landmarks[0][1], 5, 5);
        ctx.fillRect(pred.landmarks[1][0], pred.landmarks[1][1], 5, 5);

        ctx.fillRect(pred.landmarks[4][0], pred.landmarks[4][1], 5, 5);
        ctx.fillRect(pred.landmarks[5][0], pred.landmarks[5][1], 5, 5);


        rightEye = pred.landmarks[0];
        leftEye = pred.landmarks[1];
        nose = pred.landmarks[2];
        rightEar = pred.landmarks[4];
        leftEar = pred.landmarks[5];

        /* console.log(nose[0] - rightEye[0]);*/

        if (nose[0] - rightEye[0] > 43) {
            where.textContent = "Up";
            console.log("Up");
        }

        if (nose[0] - rightEye[0] < 36) {
            where.textContent = "Down";
            console.log("down");
        }





        if ((rightEye[0] - rightEar[0]) < 35) {
            where.textContent = "Right";
            console.log("Right");
        }



        if ((rightEye[0] - rightEar[0]) > 45) {
            where.textContent = "Left";
            console.log("Left");
        }




    });





};

setupCamera();

video.addEventListener("loadeddata", async () => {
    model = await blazeface.load();

    setInterval(detectFaces, 100);


});

