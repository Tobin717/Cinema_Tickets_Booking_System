from flask import Flask, redirect, url_for, request
from database import userLogin,createUser,findUser
from flask_cors import *


app = Flask(__name__)
CORS(app,supports_credentials=True)

#@app.route("/")
#def showpage():
#	print("requesting homepage")
#return render_template("log_in.html")


@app.route('/login',methods = ['POST'])
def login():
	print("login request accpted!")
	userid = request.form['userid']
	password = request.form['password']
	result = userLogin(userid,password)
	if result:
		print("login success!")
		return {'errcode':0,
			'errmsg':'登陆成功'
		},200
	else:
		print("login failed!")
		return {'errcode':400,
			'errmsg':'密码错误或用户不存在'
		},400
   
@app.route('/regist', methods=['POST'])
def register():
    print("regist request accepted!")
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
