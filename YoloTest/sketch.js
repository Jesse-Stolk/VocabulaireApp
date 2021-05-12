// Copyright (c) 2020 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Object Detection using COCOSSD
This example uses a callback pattern to create the classifier
=== */

let objectDetector;
let img;

function preload() {
    img = loadImage('images/dawd.jpg');
    // Models available are 'cocossd', 'yolo'
    objectDetector = ml5.objectDetector('cocossd');
}

function setup() {
    createCanvas(640, 420);
    // image(img, 0, 0);
    // objectDetector.detect(img, gotResult);
}

function test(testImg) {
    var testingimg = new Image();
    testingimg.src = testImg;
    objectDetector.detect(testingimg, gotResult);
}
// A function to run when we get any errors and the results
function gotResult(err, results) {
    if (err) {
        console.log(err);
    }
    if (results.length == 0) {
        console.log("ik zie geen kut")
    }
    for (let i = 0; i < results.length; i += 1) {
        console.log(results[i].label)
        noStroke();
        fill(0, 255, 0);
        text(
            `${results[i].label} ${nfc(results[i].confidence * 100.0, 2)}%`,
            results[i].x + 5,
            results[i].y + 15,
        );
        noFill();
        strokeWeight(4);
        stroke(0, 255, 0);
        rect(results[i].x, results[i].y, results[i].width, results[i].height);
    }
}

(function () {

    var width = 320; // We will scale the photo width to this
    var height = 0; // This will be computed based on the input stream

    var streaming = false;

    var video = null;
    var canvas = null;
    var photo = null;
    var startbutton = null;

    function startup() {
        video = document.getElementById('video');
        canvas = document.getElementById('canvas');
        photo = document.getElementById('photo');
        startbutton = document.getElementById('startbutton');

        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        })
            .then(function (stream) {
                video.srcObject = stream;
                video.play();
            })
            .catch(function (err) {
                console.log("An error occurred: " + err);
            });

        video.addEventListener('canplay', function (ev) {
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth / width);

                if (isNaN(height)) {
                    height = width / (4 / 3);
                }

                video.setAttribute('width', width);
                video.setAttribute('height', height);
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);
                streaming = true;
            }
        }, false);

        startbutton.addEventListener('click', function (ev) {
            takepicture();
            ev.preventDefault();
        }, false);

        clearphoto();
    }


    function clearphoto() {
        var context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    }

    function takepicture() {
        var context = canvas.getContext('2d');
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);

            var data = canvas.toDataURL('image/png');
            photo.setAttribute('src', data);
            test(data);
        } else {
            clearphoto();
        }
    }

    window.addEventListener('load', startup, false);
})();
