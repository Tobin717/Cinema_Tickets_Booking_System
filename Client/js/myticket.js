function onload_myticket(){
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
                var cinema1 = document.getElementsByClassName("ticket1")[0];
                var hall1 = document.getElementsByClassName("ticket1")[1];
                var film1 = document.getElementsByClassName("ticket1")[2];
                var start1 = document.getElementsByClassName("ticket1")[3];
                var time=document.getElementsByClassName("ticket1")[4];
                var seat=document.getElementsByClassName("ticket1")[5];
                var cinema2 = document.getElementsByClassName("ticket2")[0];
                var hall2 = document.getElementsByClassName("ticket2")[1];
                var film2 = document.getElementsByClassName("ticket2")[2];
                var start2 = document.getElementsByClassName("ticket2")[3];
                var time=document.getElementsByClassName("ticket2")[4];
                var seat=document.getElementsByClassName("ticket2")[5];
                var cinema3 = document.getElementsByClassName("ticket3")[0];
                var hall3 = document.getElementsByClassName("ticket3")[1];
                var film3 = document.getElementsByClassName("ticket3")[2];
                var start3 = document.getElementsByClassName("ticket3")[3];
                var time=document.getElementsByClassName("ticket3")[4];
                var seat=document.getElementsByClassName("ticket3")[5];
                var cinema4 = document.getElementsByClassName("ticket4")[0];
                var hall4 = document.getElementsByClassName("ticket4")[1];
                var film4 = document.getElementsByClassName("ticket4")[2];
                var start4 = document.getElementsByClassName("ticket4")[3];
                var time=document.getElementsByClassName("ticket4")[4];
                var seat=document.getElementsByClassName("ticket4")[5];
                var cinema5 = document.getElementsByClassName("ticket5")[0];
                var hall5 = document.getElementsByClassName("ticket5")[1];
                var film5 = document.getElementsByClassName("ticket5")[2];
                var start5 = document.getElementsByClassName("ticket5")[3];
                var time=document.getElementsByClassName("ticket5")[4];
                var seat=document.getElementsByClassName("ticket5")[5];
                var cinema6 = document.getElementsByClassName("ticket6")[0];
                var hall6 = document.getElementsByClassName("ticket6")[1];
                var film6 = document.getElementsByClassName("ticket6")[2];
                var start6 = document.getElementsByClassName("ticket6")[3];
                var time=document.getElementsByClassName("ticket6")[4];
                var seat=document.getElementsByClassName("ticket6")[5];
            }
        }
    }
}