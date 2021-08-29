from flask import Flask, redirect, url_for, request
from database import userLogin,createUser,findUser,getMvRank,changePwd,getUserEmail,getUnavailableFilm,book,getUserTickets,refundUserTickets,charge,getFilmTickets,searchByName
from flask_cors import *
import time
import datetime
import json

app = Flask(__name__)
CORS(app,supports_credentials=True)

#@app.route("/")
#def showpage():
#	print("requesting homepage")
#return render_template("log_in.html")
class DateEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj,datetime.datetime):
            return obj.strftime("%Y-%m-%d %H:%M:%S")
        else:
            return json.JSONEncoder.default(self,obj)

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
		print("number of result is:",len(getMvRank(number)))
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
		print("userid is:",userid)
		result=changePwd(userid,oldpassword,newpassword)
		if result:
			print("修改成功！")
			return {'errcode':0,'errmsg':"修改成功！"},200
		else:
			print("修改失败！")
			return {'errcode':1,'errmsg':"修改失败，请重试！"},400
	else:
		return {'errcode':1,'errmsg':"参数错误"},400
@app.route('/getEmail',methods=['POST'])
def getEmail():
	if request.headers['Content-Type'] == "application/json":
		userid=request.get_json()['userid']
		result=getUserEmail(userid)
		if result:
			finalresult={'errcode':0,'errmsg':"请求成功!",'email':'','balance':''}
			finalresult['email']=result['email']
			finalresult['balance']=result['balance']
			return json.dumps(finalresult),200
		else:
			return {'errcode':1,'errmsg':"请求失败！"},400
	else:
		return {'errcode':1,'errmsg':"参数错误"},400

@app.route('/getFilmSession',methods=['POST'])
def getFilmSession():
	if request.headers['Content-Type'] == "application/json":
		film_id=request.get_json()['film_id']
		result=getUnavailableFilm(film_id)
		available=len(result)
		if available>0 :
			finalresult={'errcode':0,'available':available,'result':result}
			return json.dumps(finalresult),200
		elif available==0:
			finalresult={'errcode':0,'available':available}
			return json.dumps(finalresult),200
		else:
			return {'errcode':1,'errmsg':"未知错误"},400
	else:
		return {'errcode':1,'errmsg':"参数错误"},400

@app.route('/bookTickets',methods=['POST'])
def bookTickets():
	if request.headers['Content-Type'] == "application/json":
		data=request.get_json()
		userid=data['userid']
		number=data['number']
		film_id=data['film_id']
		seats=data['seats']
		result=book(userid,film_id,seats,number)
		if result:
			return {'errcode':0,'errmsg':"订票成功"},200
		else:
			return {'errcode':1,'errmsg':"订票失败"},400
	else:
		return {'errcode':1,'errmsg':"参数错误"},400

@app.route('/userTickets',methods=['POST'])
def userTickets():
	if request.headers['Content-Type'] == "application/json":
		userid=request.get_json()['userid']
		result=(getUserTickets(userid))
		number=len(result)
		seats={'seats':result}
		if number>0:
			finalresult={'errcoe':0,'errmsg':"成功",'number':number,'seats':seats}
			return json.dumps(finalresult),200
		elif number==0:
			finalresult={'errcoe':0,'errmsg':"用户无订票",'number':number}
			return json.dumps(finalresult),200
		else:
			return {'errcode':1,'errmsg':"未知错误"},400
	else:
		return {'errcode':1,'errmsg':"参数错误"},400

@app.route('/refundTickets',methods=['POST'])
def refundTickets():
	if request.headers['Content-Type'] == "application/json":
		data=request.get_json()
		userid=data['userid']
		film_id=data['film_id']
		row=data['row']
		col=data['col']
		result=refundUserTickets(userid,film_id,row,col)
		if result:
			return {'errcoe':0,'errmsg':"成功"},200
		else:
			return {'errcoe':1,'errmsg':"失败"},400
	else:
		return {'errcoe':1,'errmsg':"参数错误"},400

@app.route('/userCharge',methods=['POST'])
def userCharge():
	if request.headers['Content-Type'] == "application/json":
		data=request.get_json()
		userid=data['userid']
		amount=data['amount']
		result=charge(userid,amount)
		print(result)
		if result:
			return {'errcoe':0,'errmsg':"成功"},200
		else:
			return {'errcoe':1,'errmsg':"失败"},400
	else:
		return {'errcoe':1,'errmsg':"参数错误"},400

@app.route('/getTickets',methods=['POST'])
def getTickets():
	if request.headers['Content-Type'] == "application/json":
		number=request.get_json()['number']
		result=getFilmTickets(number)
		if result:
			return json.dumps({'errcoe':0,'errmsg':"成功",'tickets':result},cls=DateEncoder),200
		else:
			return json.dumps( {'errcoe':1,'errmsg':"失败"}),400
	else:
		return json.dumps( {'errcoe':1,'errmsg':"失败"}),400

@app.route('/searchMv',methods=[POST])
def searchMv():
	if request.headers['Content-Type'] == "application/json":
		mv_name=request.get_json()['mv_name']
		result=searchByName(mv_name)
		if result:
			return json.dumps({'errcoe':0,'errmsg':"成功",'tickets':result},cls=DateEncoder),200
		else:
			return json.dumps( {'errcoe':1,'errmsg':"失败"}),400
	else:
		return json.dumps( {'errcoe':1,'errmsg':"失败"}),400


if __name__ == '__main__':
   app.run()
