function send_user_regist()
{
    var username= document.getElementById("username");
    var password= document.getElementById("password");
    var password_2=document.getElementById("password_2");
    if(username.value=="")
    {
        alert("请输入用户名");
        username.focus();
        return false;
    }
    if(password.value=="")
    {
        alert("请输入密码");
        password.focus();
        return false;
    }
    if(password_2.value=="")
    {
        alert("请输入密码");
        password_2.focus();
        return false;
    }
    if(password.value!=password_2.value)
    {
        alert("两次密码不相同");
        password.value="";
        password_2.value="";
        return false;
    }
    document.getElementById("form1").submit();
}