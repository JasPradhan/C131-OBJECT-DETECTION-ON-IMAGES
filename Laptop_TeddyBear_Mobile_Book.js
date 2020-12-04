img = "";

status = "";

objects = [];

function preload() {
    img = loadImage('Laptop_TeddyBear_Mobile_Book.jpg');
}

function setup() {
    canvas = createCanvas(400, 500);
    canvas.position(570, 90);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects";
}

function draw() {
    image(img, 0, 0, 400, 500);
    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            r=random(255);

            g=random(255);

            b=random(255);

            document.getElementById("status").innerHTML = "Status: Objects Detected";
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            console.log(percent);
            text(objects[i].label + " " + percent + " %", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}