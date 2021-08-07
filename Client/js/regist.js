function send_user_regist() {
    var username = document.getElementById("username");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var password_2 = document.getElementById("password_2");
    var emreg = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;
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
    if (password.value == "" || emreg.test(email.value) == false) {
        alert("请输入正确的邮箱");
        email.focus();
        return false;
    }
    if (password_2.value == "") {
        alert("请输入密码");
        password_2.focus();
        return false;
    }
    if (password.value != password_2.value) {
        alert("两次密码不相同");
        password.value = "";
        password_2.value = "";
        password.focus();
        return false;
    }
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.timeout = 3000;
    xhr.ontimeout = function () {
        alert("网络异常");
    }
    xhr.open("post", "http://119.23.45.53:8080/regist", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("userid=" + username.value + "&password=" + password.value + "&email=" + email.value);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            alert(xhr.response.errmsg);
            if (xhr.response.errcode == 0) {
                location.href = "homepage.html";
            } else {
                username.value = "";
                password.value = "";
                password_2.value = "";
                email.value = "";
            }
        }
    }
}