function onload_myticket() {
    checkCookie();
    var username = getCookie("username");
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.timeout = 3000;
    xhr.ontimeout = function () {
        alert("网络异常");
    }
    xhr.open("post", "http://119.23.45.53:8080/userTickets", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send("\{\"userid\":\"" + username + "\"\}");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status === 200) {
                for (var i = 0; i < Math.min(xhr.response.number, 6); i++) {
                    document.getElementsByClassName("ticket" + (i + 1).toString())[0].innerHTML = xhr.response.seats.seats[i].cinema_name;
                    document.getElementsByClassName("ticket" + (i + 1).toString())[1].innerHTML = xhr.response.seats.seats[i].hall_id;
                    document.getElementsByClassName("ticket" + (i + 1).toString())[2].innerHTML = xhr.response.seats.seats[i].mv_name;
                    document.getElementsByClassName("ticket" + (i + 1).toString())[3].innerHTML = xhr.response.seats.seats[i].start_time;
                    document.getElementsByClassName("ticket" + (i + 1).toString())[4].innerHTML = xhr.response.seats.seats[i].end_time;
                    document.getElementsByClassName("ticket" + (i + 1).toString())[5].innerHTML = xhr.response.seats.seats[i].row + "行" + xhr.response.seats.seats[i].col + "座";
                    button[i] = xhr.response.seats.seats[i].film_id;
                    numberrow[i] = xhr.response.seats.seats[i].row;
                    numbercol[i] = xhr.response.seats.seats[i].col;
                }
                for (var i = xhr.response.number; i < 6; i++) {
                    document.getElementsByClassName("downbutton")[i].disabled = true;
                    document.getElementsByClassName("prize")[i].innerHTML = "";
                }
            }
        }
    }
}
function refund_ticket(number, row, col) {
    var username = getCookie("username");
    var obj = new Object();
    obj.userid = username;
    obj.film_id = number;
    obj.row = row;
    obj.col = col;
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.timeout = 3000;
    xhr.ontimeout = function () {
        alert("网络异常");
    }
    xhr.open("post", "http://119.23.45.53:8080/refundTickets", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(obj));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            alert(xhr.response.errmsg);
            if (xhr.response.errcode == 0) {
                location.href = "user.html";
            }
        }
    }
}