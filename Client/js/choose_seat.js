function turn_green(number) {
    var buttonx = document.getElementsByClassName("button_in")[number - 1];
    if (buttonarr[number - 1] == 1) {
        buttonx.style.backgroundImage = "url('img/index_uncon.png')";
        buttonarr[number - 1] = 0;
        select--;
    }
    else {
        buttonx.style.backgroundImage = "url('img/index_con.png')";
        buttonarr[number - 1] = 1;
        select++;
    }
}
function onload_choose() {
    var film_id = getCookie("film_id");
    var unavailable = getCookie("unavailable");
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.timeout = 3000;
    xhr.ontimeout = function () {
        alert("网络异常");
    }
    xhr.open("post", "http://119.23.45.53:8080/getFilmSession", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send("\{\"film_id\":" + film_id + "\}");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status === 200) {
                for (var i = 0; i < xhr.response.unavailable; i++) {
                    var buttonx = document.getElementsByClassName("button_in")[xhr.response.result[i].row * 7 + xhr.response.result[i].col - 8];
                    buttonx.style.backgroundImage = "url('img/index.png')";
                    buttonx.disabled = true;
                }
            }
        }
    }
}
function purchase_con(number) {
    if (number == 0)
        return false;
    var arr = new Array(number);
    var j = 0;
    for (var i = 0; i < 49; i++) {
        if (buttonarr[i] == 1) {
            arr[j] = i;
            j++
        }
    }
    var username = getCookie("username");
    var id = getCookie("film_id");
    var obj = new Object();
    obj.userid = username;
    obj.film_id = id;
    obj.number = number;
    obj.seats = new Array(number);
    for (var i = 0; i < number; i++) {
            obj.seats[i] = { col: arr[i] % 7 + 1, row: parseInt(arr[i] / 7) + 1 };
    }
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.timeout = 3000;
    xhr.ontimeout = function () {
        alert("网络异常");
    }
    xhr.open("post", "http://119.23.45.53:8080/bookTickets", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(obj));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            alert(xhr.response.errmsg);
            if (xhr.response.errcode == 0) {
                location.href = "myticket.html";
            }
        }
    }
}