function charge() {
    var username = getCookie("username");
    var amount, con;
    amount = prompt("请输入您想要充值的金额");
    if (/^\d+$/.test(amount)) {
        con = confirm("确定充值" + amount + "元");
    }
    else {
        alert("请输入纯数字");
    }
    if (con == true) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = "json";
        xhr.timeout = 3000;
        xhr.ontimeout = function () {
            alert("网络异常");
        }
        xhr.open("post", "http://119.23.45.53:8080/userCharge", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send("\{\"userid\":\"" + username + "\",\"amount\":" + amount + "\}");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status === 200) {
                    alert("充值成功");
                }
            }
        }
    }
}
function get_balance() {
    var username = getCookie("username");
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.timeout = 3000;
    xhr.ontimeout = function () {
        alert("网络异常");
    }
    xhr.open("post", "http://119.23.45.53:8080/getEmail", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send("\{\"userid\":\"" + username + "\"\}");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status === 200) {
                alert(xhr.response.balance);
            }
        }
    }
}
function onload_buyticket() {
    checkCookie_user();
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.timeout = 3000;
    xhr.ontimeout = function () {
        alert("网络异常");
    }
    xhr.open("post", "http://119.23.45.53:8080/getTickets", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send("\{\"number\":6\}");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status === 200) {
                var cinema1 = document.getElementsByClassName("ticket1")[0];
                var hall1 = document.getElementsByClassName("ticket1")[1];
                var film1 = document.getElementsByClassName("ticket1")[2];
                var start1 = document.getElementsByClassName("ticket1")[3];
                var cinema2 = document.getElementsByClassName("ticket2")[0];
                var hall2 = document.getElementsByClassName("ticket2")[1];
                var film2 = document.getElementsByClassName("ticket2")[2];
                var start2 = document.getElementsByClassName("ticket2")[3];
                var cinema3 = document.getElementsByClassName("ticket3")[0];
                var hall3 = document.getElementsByClassName("ticket3")[1];
                var film3 = document.getElementsByClassName("ticket3")[2];
                var start3 = document.getElementsByClassName("ticket3")[3];
                var cinema4 = document.getElementsByClassName("ticket4")[0];
                var hall4 = document.getElementsByClassName("ticket4")[1];
                var film4 = document.getElementsByClassName("ticket4")[2];
                var start4 = document.getElementsByClassName("ticket4")[3];
                var cinema5 = document.getElementsByClassName("ticket5")[0];
                var hall5 = document.getElementsByClassName("ticket5")[1];
                var film5 = document.getElementsByClassName("ticket5")[2];
                var start5 = document.getElementsByClassName("ticket5")[3];
                var cinema6 = document.getElementsByClassName("ticket6")[0];
                var hall6 = document.getElementsByClassName("ticket6")[1];
                var film6 = document.getElementsByClassName("ticket6")[2];
                var start6 = document.getElementsByClassName("ticket6")[3];
                document.getElementsByClassName("downbutton")[0].disabled = false;
                document.getElementsByClassName("downbutton")[1].disabled = false;
                document.getElementsByClassName("downbutton")[2].disabled = false;
                document.getElementsByClassName("downbutton")[3].disabled = false;
                document.getElementsByClassName("downbutton")[4].disabled = false;
                document.getElementsByClassName("downbutton")[5].disabled = false;
                button[0] = xhr.response.tickets[0].film_id;
                button[1] = xhr.response.tickets[1].film_id;
                button[2] = xhr.response.tickets[2].film_id;
                button[3] = xhr.response.tickets[3].film_id;
                button[4] = xhr.response.tickets[4].film_id;
                button[5] = xhr.response.tickets[5].film_id;
                cinema1.innerHTML = xhr.response.tickets[0].cinema_name;
                hall1.innerHTML = xhr.response.tickets[0].hall_id;
                film1.innerHTML = xhr.response.tickets[0].mv_name;
                start1.innerHTML = xhr.response.tickets[0].start_time;
                cinema2.innerHTML = xhr.response.tickets[1].cinema_name;
                hall2.innerHTML = xhr.response.tickets[1].hall_id;
                film2.innerHTML = xhr.response.tickets[1].mv_name;
                start2.innerHTML = xhr.response.tickets[1].start_time;
                cinema3.innerHTML = xhr.response.tickets[2].cinema_name;
                hall3.innerHTML = xhr.response.tickets[2].hall_id;
                film3.innerHTML = xhr.response.tickets[2].mv_name;
                start3.innerHTML = xhr.response.tickets[2].start_time;
                cinema4.innerHTML = xhr.response.tickets[3].cinema_name;
                hall4.innerHTML = xhr.response.tickets[3].hall_id;
                film4.innerHTML = xhr.response.tickets[3].mv_name;
                start4.innerHTML = xhr.response.tickets[3].start_time;
                cinema5.innerHTML = xhr.response.tickets[4].cinema_name;
                hall5.innerHTML = xhr.response.tickets[4].hall_id;
                film5.innerHTML = xhr.response.tickets[4].mv_name;
                start5.innerHTML = xhr.response.tickets[4].start_time;
                cinema6.innerHTML = xhr.response.tickets[5].cinema_name;
                hall6.innerHTML = xhr.response.tickets[5].hall_id;
                film6.innerHTML = xhr.response.tickets[5].mv_name;
                start6.innerHTML = xhr.response.tickets[5].start_time;
            }
        }
    }
}
function submit_purchase(number) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.timeout = 3000;
    xhr.ontimeout = function () {
        alert("网络异常");
    }
    xhr.open("post", "http://119.23.45.53:8080/getFilmSession", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send("\{\"film_id\":" + number + "\}");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status === 200) {
                setCookie("film_id", number);
                setCookie("unavailable", xhr.response.unavailable);
                location.href = "choose_seat.html";
            }
            if (unavailable == 49) {
                alert("该场次已满");
            }
        }
    }
}
function search() {
    var mvname = document.getElementById("filmname");
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.timeout = 3000;
    xhr.ontimeout = function () {
        alert("网络异常");
    }
    xhr.open("post", "http://119.23.45.53:8080/searchMv", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send("\{\"mv_name\":\"" + mvname.value + "\"\}");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status === 200) {
                for (var i = 0; i < xhr.response.number; i++) {
                    document.getElementsByClassName("ticket" + (i + 1).toString())[0].innerHTML = xhr.response.tickets[i].cinema_name;
                    document.getElementsByClassName("ticket" + (i + 1).toString())[1].innerHTML = xhr.response.tickets[i].hall_id;
                    document.getElementsByClassName("ticket" + (i + 1).toString())[2].innerHTML = xhr.response.tickets[i].mv_name;
                    document.getElementsByClassName("ticket" + (i + 1).toString())[3].innerHTML = xhr.response.tickets[i].start_time;
                    button[i] = xhr.response.tickets[i].film_id;
                }
                for (var i = xhr.response.number; i < 6; i++) {
                    document.getElementsByClassName("ticket" + (i + 1).toString())[0].innerHTML = "";
                    document.getElementsByClassName("ticket" + (i + 1).toString())[1].innerHTML = "";
                    document.getElementsByClassName("ticket" + (i + 1).toString())[2].innerHTML = "";
                    document.getElementsByClassName("ticket" + (i + 1).toString())[3].innerHTML = "";
                    document.getElementsByClassName("downbutton")[i].disabled = true;
                    document.getElementsByClassName("prize")[i].innerHTML="";
                }
            }
            else {
                alert("搜索失败，无该影片");
            }
        }
    }
}