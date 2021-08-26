function onload_homepage() {
    checkCookie();
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.timeout = 3000;
    xhr.ontimeout = function () {
        alert("网络异常");
    }
    xhr.open("post", "http://119.23.45.53:8080/getMvRank", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send("\{\"number\":6\}");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status === 200) {
                var rank1 = document.getElementsByClassName("span1_1")[0];
                var rank2 = document.getElementsByClassName("span1_1")[1];
                var rank3 = document.getElementsByClassName("span1_1")[2];
                var rank4 = document.getElementsByClassName("span1_1")[3];
                var rank5 = document.getElementsByClassName("span1_1")[4];
                var rank6 = document.getElementsByClassName("span1_1")[5];
                rank1.style.color = "red";
                rank1.innerHTML = xhr.response.rank[0].mv_name;
                if (rank1.innerHTML.length > 6) {
                    rank1.style.fontSize = "10px";
                }
                rank2.innerHTML = xhr.response.rank[1].mv_name;
                if (rank2.innerHTML.length > 6) {
                    rank2.style.fontSize = "10px";
                }
                rank3.innerHTML = xhr.response.rank[2].mv_name;
                if (rank3.innerHTML.length > 6) {
                    rank3.style.fontSize = "18px";
                }
                rank4.innerHTML = xhr.response.rank[3].mv_name;
                if (rank4.innerHTML.length > 6) {
                    rank4.style.fontSize = "10px";
                }
                rank5.innerHTML = xhr.response.rank[4].mv_name;
                if (rank4.innerHTML.length > 6) {
                    rank4.style.fontSize = "10px";
                }
                rank6.innerHTML = xhr.response.rank[5].mv_name;
                if (rank4.innerHTML.length > 6) {
                    rank4.style.fontSize = "10px";
                }
                var sale1 = document.getElementsByClassName("span1_2")[0];
                var sale2 = document.getElementsByClassName("span1_2")[1];
                var sale3 = document.getElementsByClassName("span1_2")[2];
                var sale4 = document.getElementsByClassName("span1_2")[3];
                var sale5 = document.getElementsByClassName("span1_2")[4];
                var sale6 = document.getElementsByClassName("span1_2")[5];
                sale1.innerHTML = "票房：" + xhr.response.rank[0].sale + "万美元";
                sale2.innerHTML = "票房：" + xhr.response.rank[1].sale + "万美元";
                sale3.innerHTML = "票房：" + xhr.response.rank[2].sale + "万美元";
                sale4.innerHTML = "票房：" + xhr.response.rank[3].sale + "万美元";
                sale5.innerHTML = "票房：" + xhr.response.rank[4].sale + "万美元";
                sale6.innerHTML = "票房：" + xhr.response.rank[5].sale + "万美元";
            }
        }
    }
}