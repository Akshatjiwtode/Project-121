prediction = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="image_captured" src="' + data_uri + '"/>';
    });
}

console.log("ml5 version:", ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/vOCeLIBPl/model.json', modelLoaded);

function modelLoaded() {
    console.log("Model Loaded Successfully!");
}

function speak() {
    var synth = window.speechSynthesis;
    var speak_data = "The Prediction Is " + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check() {
    captured_image = document.getElementById("image_captured");
    classifier.classify(captured_image, gotResults)
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if (results[0].label == "Amazing") {
            document.getElementById("result_gesture_name").innerHTML = "The Prediction is &#128076;";
            document.getElementById("update_gesture").innerHTML = "This is looking Amazing";
        }

        if (results[0].label == "Best") {
            document.getElementById("result_gesture_name").innerHTML = "The Prediction is &#128077;";
            document.getElementById("update_gesture").innerHTML = "All The Best";
        }

        if (results[0].label == "Victory") {
            document.getElementById("result_gesture_name").innerHTML = "The Prediction is &#9996;";
            document.getElementById("update_gesture").innerHTML = "This was a Marvelous Victory";
        }
    }
}