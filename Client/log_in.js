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
    document.getElementById("form1").submit();
}