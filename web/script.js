let click_x, click_y;

let validR = false;

let user_r = 0;

function validate(form){

    let fail = true;
    let message = "";
    const X = form.X.value.replace(",", ".");
    const Y = form.Y.value.replace(",", ".");
    const R = form.R.value.replace(",", ".");
    const hint = document.getElementById('hint');

    hint.innerHTML = "";

    if (Y < -3 || Y > 5 || isNaN(Y) || Y === "" || Y.length > 10){
        fail = false;
        message = "Некорректно задано значение Y \n";
    }

    if (R < 1 || R > 4 || isNaN(R) || R === "" || R.length > 10){
        fail = false;
        message += "Некорректно задано значение R \n";
    }

    if (X === "" || isNaN(X) || X === null || X > 5 || X < -3) {
        fail = false;
        message += "Не выбрано значение для X";
    }

    if (fail) {
        makeFrame('result_frame');
        createCanvas('canvas');
        drawPoint('canvas', X, Y, R);
        return true;
    } else {

        hint.className = 'container';
        hint.style.padding = '20px 0';
        hint.innerHTML = message;
        return false;
    }
}

function makeFrame(id){
    let iframe = document.getElementById(id);
    iframe.style.display = "block";
    frameFitting(id);
    for (let i=0; i<iframe.length; i++) {
        iframe[i].onclick = function() {
            clearInterval(timeout);
            timeout = setInterval("frameFitting(id)",100);
        }
    }
}

function frameFitting(id) {
    document.getElementById(id).width = '100%';
    document.getElementById(id).height = document.getElementById(id).contentWindow.
        document.body.scrollHeight+35+'px';
}

function checkClick(id) {
    let i;
    for (i = 1; i <= 5; i++ ) {
        document.getElementById("r" + i).checked = i === id;
    }
    document.getElementById("R").value = document.getElementById("r" + id).value;
    validR = true;
    user_r = id;
}

function radioClick(id) {
    let i;
    for (i = -3; i <= 5; i++ ) {
        document.getElementById(i).checked = i === id;
    }
    document.getElementById("X").value = document.getElementById(id).value;
}

function createCanvas(id){
    var canvas = document.getElementById(id),
        context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.rect(150, 150, 65, -130);
    context.closePath();
    context.strokeStyle = "blue";
    context.fillStyle = "blue";
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(150, 150);
    context.arc(150, 150, 65, -Math.PI, -Math.PI/2, false);
    context.closePath();
    context.strokeStyle = "blue";
    context.fillStyle = "blue";
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(20, 150);
    context.lineTo(150, 150);
    context.lineTo(150, 280);
    context.lineTo(20, 150);
    context.closePath();
    context.strokeStyle = "blue";
    context.fillStyle = "blue";
    context.fill();
    context.stroke();

    context.beginPath();
    context.font = "10px Verdana";
    context.moveTo(150, 0); context.lineTo(150, 300);
    context.moveTo(150, 0); context.lineTo(145, 15);
    context.moveTo(150, 0); context.lineTo(155, 15);
    context.fillText("Y", 160, 10);
    context.moveTo(0, 150); context.lineTo(300, 150);
    context.moveTo(300, 150); context.lineTo(285, 145);
    context.moveTo(300, 150); context.lineTo(285, 155);
    context.fillText("X", 290, 135);
    context.stroke();
}

function drawPoint(id, x, y, r) {
    var canvas = document.getElementById(id),
        context = canvas.getContext("2d");
    context.beginPath();

    context.moveTo(145, 20); context.lineTo(155, 20); context.fillText(r, 160, 20);
    context.moveTo(145, 85); context.lineTo(155, 85); context.fillText((r / 2), 160, 78);
    context.moveTo(145, 215); context.lineTo(155, 215); context.fillText(-(r / 2), 160, 215);
    context.moveTo(145, 280); context.lineTo(155, 280); context.fillText(-r, 160, 280);

    context.moveTo(20, 145); context.lineTo(20, 155); context.fillText(-r, 20, 170);
    context.moveTo(85, 145); context.lineTo(85, 155); context.fillText(-(r / 2), 70, 170);
    context.moveTo(215, 145); context.lineTo(215, 155); context.fillText((r / 2), 215, 170);
    context.moveTo(280, 145); context.lineTo(280, 155); context.fillText(r, 280, 170);

    context.closePath();
    context.strokeStyle = "black";
    context.fillStyle = "black";
    context.stroke();

    context.beginPath();
    context.rect(Math.round(150 + ((x / r) * 130))-2, Math.round(150 - ((y / r) * 130))-2, 4, 4);
    context.closePath();
    context.strokeStyle = "red";
    context.fillStyle = "red";
    context.fill();
    context.stroke();
}

function sendRequest(x, y, r) {
        document.getElementById("X").value = x;
        document.getElementById("Y").value = y;
        document.getElementById("R").value = r;
        document.getElementById("submit").click();
    document.getElementById("Y").value = "";
}

function addListener(canvasID) {
    const hint = document.getElementById('hint');
    hint.className = 'container';
    hint.style.padding = '20px 0';
    let canvas = document.getElementById(canvasID);
    canvas.addEventListener('mousedown', function(event) {
        if (validR) {
            let rect = canvas.getBoundingClientRect();

            click_x = (event.clientX - rect.left - rect.width / 2) / (rect.width) * 2 * user_r * 15 / 13;
            click_y = (rect.bottom - event.clientY - rect.height / 2) / (rect.height) * 2 * user_r * 15 / 13;

            createCanvas('canvas');
            drawPoint('canvas', click_x, click_y, user_r);
            sendRequest(click_x.toFixed(4), click_y.toFixed(4), user_r);
        }else {
            hint.innerHTML = "Не выбран радиус";
        }
    });
}