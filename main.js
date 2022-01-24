peter_pan_song_1 = "";
harry_potter_song_2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
song_peter_pan = 0;
scoreRightWrist = 0;
song_Harry_Potter = 0;

function preload(){
    peter_pan_song_1 = loadSound("music.mp3");
    harry_potter_song_2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('PoseNet is Initialized');
}

function draw()
{
    image(video, 0, 0, 600, 500);
    fill('#FF0000');
    stroke('#FF0000');
    song_peter_pan = peter_pan_song_1.isPlaying();
    console.log("Peter Pan Song =" +song_peter_pan);

    song_Harry_Potter = harry_potter_song_2.isPlaying();
    console.log("Harry Potter Song =" +song_Harry_Potter);

    if(scoreLeftWrist > 0.2)
    {
        circle(lefttWristX, leftWristY, 20);
        harry_potter_song_2.stop();
        if(song_peter_pan == false){
            peter_pan_song_1.play();
        }
        else{
            document.getElementById("song_id").innerHTML = "Song Name: Peter Pan Song";
        }
    }

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        peter_pan_song_1.stop();
        if(song_peter_pan == false){
        harry_potter_song_2.play();
        }
        else{
            document.getElementById("song_id").innerHTML = "Song Name: Harry Potter Song";
        }
    }
  }

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist =" +scoreLeftWrist);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist =" +scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX =" + leftWristX + "leftWristY =" + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX =" + rightWristX + "rightWristY =" + rightWristY);
    }
}

