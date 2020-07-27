var canvas = document.getElementById("mazecanvas");
var context = canvas.getContext("2d");
var currRectX = 323;
var currRectY = 50;
var mazeWidth = 540;
var mazeHeight = 540;
var intervalVar;
function drawMazeAndRectangle(rectX, rectY) {
    makeWhite(0, 0, canvas.width, canvas.height);
    var mazeImg = new Image();
    mazeImg.onload = function () {
        context.drawImage(mazeImg, 50, 20);
        drawRectangle(rectX, rectY, "white");
        context.beginPath();
        context.arc(330, 285, 50, 0, 2 * Math.PI, false);
        context.closePath();
        context.fillStyle = '#00FF00';
        context.fill();
    };
    mazeImg.src = "css/Maze1.png";
}
function drawRectangle(x, y, style) {
    makeWhite(currRectX, currRectY, 15, 15);
    currRectX = x;
    currRectY = y;
    context.beginPath();
    context.rect(x, y, 15, 15);
    context.closePath();
    context.fillStyle = style;
    context.fill();
}
function moveRect(e) {
    var newX;
    var newY;
    var movingAllowed;
    e = e || window.event;
    switch (e.keyCode) {
        case 38:   // arrow up key
        case 87: // W key
            newX = currRectX;
            newY = currRectY - 5;
            break;
        case 37: // arrow left key
        case 65: // A key
            newX = currRectX - 5;
            newY = currRectY;
            break;
        case 40: // arrow down key
        case 83: // S key
            newX = currRectX;
            newY = currRectY + 5;
            break;
        case 39: // arrow right key
        case 68: // D key
            newX = currRectX + 5;
            newY = currRectY;
            break;
        default: return;
            
    }       
    movingAllowed = canMoveTo(newX, newY);
    if (movingAllowed === 1) {      // 1 means 'the rectangle can move'
        drawRectangle(newX, newY, "white");
        currRectX = newX;
        currRectY = newY;
    }
    else if (movingAllowed === 2) { // 2 means 'the rectangle reached the end point'
        clearInterval(tt);
        window.removeEventListener("keydown", moveRect, true);
        $("#bg,.clear").addClass("show2");
    }
}
function canMoveTo(destX, destY) {
    var imgData = context.getImageData(destX, destY, 15, 15);
    var data = imgData.data;
    var canMove = 1; // 1 means: the rectangle can move
    if (destX >= 0 && destX <= mazeWidth - 15 && destY >= 0 && destY <= mazeHeight - 15) {
        for (var i = 0; i < 4 * 15 * 15; i += 4) {
            if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0) { // black
                canMove = 0; // 0 means: the rectangle can't move
                break;
            }
            else if (data[i] === 0 && data[i + 1] === 255 && data[i + 2] === 0) { // #00FF00
                canMove = 2; // 2 means: the end point is reached
                break;
            }
        }
    }
    else {
        canMove = 0;
    }
    return canMove;
}
var tt;
function timer() {   
    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    var totalSeconds = 0;
    tt = setInterval(setTime, 1000);
    
    function setTime() {
      ++totalSeconds;
      secondsLabel.innerHTML = pad(totalSeconds % 60);
      minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    }

    function pad(val) {
      var valString = val + "";
      if (valString.length < 2) {
        return "0" + valString;
      } else {
        return valString;
      }
    }
}

function createTimer(seconds) {
    intervalVar = setInterval(function () {
        makeWhite2(mazeWidth, 0, canvas.width - mazeWidth, canvas.height);
       
        if (seconds === 0) {
            clearInterval(intervalVar);
            window.removeEventListener("keydown", moveRect, true);
            makeWhite(0, 0, canvas.width, canvas.height);
            context.font = "40px Arial";
            context.fillStyle = "red";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillText("Time's up!", canvas.width / 2, canvas.height / 2);
            return;
        }
        
        context.font = "20px Arial";
        if (seconds <= 20 && seconds > 10) {
            context.fillStyle = "orange";
        }
        else if (seconds <= 10) {
            context.fillStyle = "red";
        }
        else {
           // context.globalAlpha = 1;
            context.fillStyle = "green";
        }
        context.textAlign = "center";
        context.textBaseline = "middle";
        var minutes = Math.floor(seconds / 60);
        var secondsToShow = (seconds - minutes * 60).toString();
        if (secondsToShow.length === 1) {
            secondsToShow = "0" + secondsToShow; // if the number of seconds is '5' for example, make sure that it is shown as '05'
        }

       // context.clearRect(rect.x, rect.y, mazeWidth, mazeHeight);
        
        context.fillText(minutes.toString() + ":" + secondsToShow, mazeWidth + 30, canvas.height / 2);
        seconds--;
    }, 1000);
} 
function makeWhite(x, y, w, h) {
    context.beginPath();
    context.rect(x, y, w, h);
    context.closePath();
    context.fillStyle = "lightblue";
    context.globalAlpha = 0.5;
    context.fill();
    context.globalAlpha = 1;
}

function makeWhite2(x, y, w, h) {
    context.beginPath();
    context.rect(x, y, w, h);
    context.closePath();
    context.fillStyle = "transparent";
    context.globalAlpha = 1;
    context.fill();
    //  context.globalAlpha = 1;
} 


$(document).ready(function() {
    setInterval(function() {
        $('.loading').addClass('hide2');
    }, 1000);
    
    drawMazeAndRectangle(323, 50);
    window.addEventListener("keydown", moveRect, true);
    timer();
    //createTimer(60); // 2 minutes
});
