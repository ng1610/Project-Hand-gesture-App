prediction_1="";

Webcam.set({
   width: 350,
   height:300,
   image_format: "png",
   png_quality: 90
});

camera=document.getElementById("camera");

Webcam.attach(camera);

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='captured_image' src='"+data_uri+"'>";
    });
};

console.log("ml5 version: ", ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/jTq1-YWrn/model.json", modelLoaded);

function modelLoaded(){
    console.log("model is loaded");
}

function speak(){
    var synth= window.speechSynthesis;
    var utter_this=new SpeechSynthesisUtterance(prediction_1);
    console.log(utter_this);
    synth.speak(utter_this);
    console.log("comes")
}
function check(){
    img= document.getElementById("captured_image");
    classifier.classify(img, gotResults);
}
function gotResults(error, results){
    if(error){
        console.log("error");
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML=results[0].label;
        console.log(results[0].label)
    
        if(results[0].label=="thumbs up"){
        prediction_1="Great job";
        document.getElementById("update_emoji").innerHTML="&#128077;"; 
        }
        if(results[0].label=="Thumbs down"){
            prediction_1="Terrible work";
            document.getElementById("update_emoji").innerHTML="&#128078;"; 
        }
        if(results[0].label=="Fantastic"){
            prediction_1="Fantastic";
            document.getElementById("update_emoji").innerHTML="&#128076;"; 
        }
        if(results[0].label=="Peace"){
            prediction_1="I just want peace";
            document.getElementById("update_emoji").innerHTML="&#9996;"; 
        }
        if(results[0].label=="Vulcan salute"){
            prediction_1="Vulcan salute";
            document.getElementById("update_emoji").innerHTML="&#128406;"; 
        }

        speak();
    }   
}
