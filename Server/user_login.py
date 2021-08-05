from flask import Flask, redirect, url_for, request
from database import userLogin,createUser,findUser


app = Flask(__name__)


@app.route('/login',methods = ['POST'])
def login():
	userid = request.form['userid']
	password = request.form['password']
	result = userLogin(userid,password)
	if result:
		msg = {'errcode':0,'errmsg':'登陆成功'}
		return msg
	else:
		msg = {'errcode':1,'errmsg':'密码错误或用户不存在'}
		return msg
   
@app.route('/regist', methods=['POST'])
def register():
    userid = request.form['userid']
    password = request.form['password']
    email = request.form['email']
    result = findUser(userid)
    if result:
        return {
            'errcode': 1,
            'errmsg': '该用户名已被注册'
        }
    
    rowcount = createUser(userid, password,email,0)
    if rowcount > 0:
        return {
            'errcode': 0,
            'errmsg': '注册成功'
        }
    
    return {
        'errcode': 1,
        'errmsg': '出现错误~请重试'
    }

if __name__ == '__main__':
   app.run()