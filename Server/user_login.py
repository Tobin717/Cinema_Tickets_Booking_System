from flask import Flask, redirect, url_for, request
from database import userLogin,createUser,findUser,getMvRank,changePwd,getUserEmail
from flask_cors import *
import time
import json

app = Flask(__name__)
CORS(app,supports_credentials=True)

#@app.route("/")
#def showpage():
#	print("requesting homepage")
#return render_template("log_in.html")


@app.route('/login',methods = ['POST'])
def login():
	print("login request accpted!")
	if request.headers['Content-Type'] == "application/json":
		print("its json")
		data = request.get_json()
		userid = data['username']
		password = data['password']
	else:
		print("its not json")
		userid = request.form['userid']
		password = request.form['password']
	result = userLogin(userid,password)
	print("userid is: ",userid)
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
        },400
    
    rowcount = createUser(userid, password,email,0)
    if rowcount > 0:
        return {
            'errcode': 0,
            'errmsg': '注册成功'
        },200
    
    return {
        'errcode': 1,
        'errmsg': '出现错误~请重试'
    },400

@app.route('/getMvRank',methods=['POST'])
def getRank():
	print("getMvRank request accepted!")
	if request.headers['Content-Type'] == "application/json":
		print("its json!")
		number=request.get_json()['number']
		print("number is :",number)
		result={'rank':getMvRank(number)};
		return json.dumps(result),200
	else:
		return json.dumps({'errmsg':"请求失败！"}),400

@app.route('/changePwd',methods=['POST'])
def modifyPwd():
	print("changePwd request accpted!")
	if request.headers['Content-Type'] == "application/json":
		print("its json")
		data = request.get_json()
		userid = data['userid']
		oldpassword = data['oldpassword']
		newpassword = data['newpassword']
		result=changePwd(userid,oldpassword,newpassword)
		if result:
			return {'errcode':0,'errmsg':"修改成功！"},200
		else:
			return {'errcode':1,'errmsg':"修改失败，请重试！"},400
	else:
		return {'errcode':1,'errmsg':"参数错误"},400
@app.route('/getEmail',methods=['POST'])
def getEmail():
	if request.headers['Content-Type'] == "application/json":
		userid=request.get_json()['userid']
		result=getUserEmail(userid)
		
		if result:
			msg={"errcode":0,"errmsg":"请求成功","email":" "}
			msg["email"]=result["email"]
			return msg,200
		else:
			return {'errcode':1,'errmsg':"请求失败！"},400
	else:
		return {'errcode':1,'errmsg':"参数错误"},400

if __name__ == '__main__':
   app.run()
