function onload_change() {
    checkCookie();
    var username = getCookie("username");
    var label1 = document.getElementById("label1");
    label1.value = username;
}
function change_password() {
    var username = getCookie("username");
    var label2 = document.getElementById("label2");
    var label3 = document.getElementById("label3");
    var label4 = document.getElementById("label4");
    if (label2.value == "") {
        alert("请输入旧密码");
        alebl2.focus();
        return false;
    }
    if (label3.value == "") {
        alert("请输入新密码");
        label3.focus();
        return false;
    }
    if (label3.value != label4.value) {
        alert("两次新密码不一致");
        label3.value = "";
        label4.value = "";
        label3.focus();
        return false;
    }
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.timeout = 3000;
    xhr.ontimeout = function () {
        alert("网络异常");
    }
    xhr.open("post", "http://119.23.45.53:8080/changePwd", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send("\{\"userid\":\"" + label1.value + "\",\"oldpassword\":\"" + label2.value + "\",\"newpassword\":\"" + label3.value + "\"\}");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.response.errcode === 0) {
                alert("修改成功");
                location.href = "homepage.html";
                clearAllCookie();
            } else {
                alert("修改失败");
                label2.value = "";
                label3.value = "";
                label4.value = "";
            }
        }
    }
}