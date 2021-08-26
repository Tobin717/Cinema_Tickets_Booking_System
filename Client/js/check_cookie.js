function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function checkCookie() {
    var username = getCookie("username");
    if (username != "") {
        var user_info = document.getElementById("user_info");
        user_info.innerText = "欢迎，用户" + username;
    }
}
function checkCookie_user() {
    var username = getCookie("username");
    if (username == "") {
        location.href = "log_in.html";
    } else {
        var user_info = document.getElementById("user_info");
        user_info.innerText = "欢迎，用户" + username;
    }
}
function clearAllCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
    }
}