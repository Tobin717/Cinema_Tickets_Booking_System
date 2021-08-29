function onload_mymessage() {
    checkCookie();
    var username = getCookie("username");
    var label1 = document.getElementById("label1");
    label1.value = username;
    var label2 = document.getElementById("label2");
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
                label2.value = xhr.response.email;
                label3.value = xhr.response.balance;
            }
        }
    }
}