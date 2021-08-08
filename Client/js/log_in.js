function send_user_login() {
    var username = document.getElementById("username");
    var password = document.getElementById("password");

    if (username.value == "") {
        alert("请输入用户名");
        username.focus();
        return false;
    }
    if (password.value == "") {
        alert("请输入密码");
        password.focus();
        return false;
    }
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.timeout = 3000;
    xhr.ontimeout = function () {
        alert("网络异常");
    }
    xhr.open("post", "http://119.23.45.53:8080/login", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("userid=" + username.value + "&password=" + password.value);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            alert(xhr.response.errmsg);
            if (xhr.response.errcode === 0) {
                setCookie("username", username.value);
                setCookie("SameSite", "Lax");
                location.href = "homepage.html";
            } else {
                username.value = "";
                password.value = "";
            }
        }
    }
}