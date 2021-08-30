from config import db
import pymysql
from werkzeug.security import generate_password_hash, check_password_hash


conn = pymysql.connect(host=db['host'], user=db['user'], passwd=db['passwd'], database=db['database'], charset='utf8',cursorclass = pymysql.cursors.DictCursor)
cursor = conn.cursor()
db=conn.cursor()
def findUser(userid):
    db.execute('select * from userinfo where `userid`=%s', (userid,))
    result = db.fetchone()
    return result

def userLogin(userid, password):
    db.execute('select * from userinfo where `userid`=%s', (userid,))
    result = db.fetchone()
    if result:
        if checkPwd(password, result['password']):
            return result
    return None

def createUser(userid, password,email,balance):
    password = encrypt(password)
    db.execute('insert into userinfo (`userid`, `password`,`email`,`balance`) values (%s, %s, %s, %s)', (userid, password,email,balance))
    conn.commit()
    return db.rowcount

def getMvRank(number):
	db.execute('SELECT id,mv_name,sale FROM movieset ORDER BY sale DESC LIMIT %s',(number,))
	result=db.fetchall()
	return result
def changePwd(userid, oldpassword,newpassword):
	if userLogin(userid,oldpassword):
		password = encrypt(newpassword)
		db.execute('UPDATE userinfo SET password=%s WHERE userid=%s',(password,userid))
		conn.commit()
		return db.rowcount
	else:
		return None
def getUserEmail(userid):
	db.execute('select email,balance from userinfo where `userid`=%s', (userid,))
	result = db.fetchone()
	return result

def getUnavailableFilm(film_id):
	db.execute('SELECT row,col FROM tickets WHERE film_id=%s',(film_id,))
	result=db.fetchall()
	return result

def book(userid,film_id,seats,number):
	for i in range(0,number):
		db.execute('SELECT balance FROM userinfo WHERE `userid`=%s', (userid,))
		balance=db.fetchone()['balance']
		print(seats[i]['row'])
		db.execute('SELECT userid FROM tickets WHERE film_id=%s and row=%s and col=%s',(film_id,seats[i]['row'],seats[i]['col']))
		if db.rowcount>0:
			conn.rollback()
			return -2
		if balance<50:
			conn.rollback()
			return -1
		try:
			balance=balance-50
			db.execute('UPDATE userinfo SET balance=%s WHERE userid=%s',(balance,userid))
			db.execute('insert into tickets (`film_id`,`userid`,`row`,`col`) values(%s,%s,%s,%s)',(film_id,userid,seats[i]['row'],seats[i]['col']))
		except Exception as e:
			conn.rollback()
			print(e)
			return -3
		finally:
			conn.commit()
	return db.rowcount

def getUserTickets(userid):
	result=[]
	db.execute('select film_id,row,col from tickets where `userid`=%s', (userid,))
	temp=db.fetchall()
	number=len(temp)
	for i in range(0,number):
		dbresult={'film_id':'','cinema_name':'','mv_name':'','hall_id':'','start_time':'','end_time':'','row':'','col':''}
		dbresult['film_id']=temp[i]['film_id']
		dbresult['row']=temp[i]['row']
		dbresult['col']=temp[i]['col']
		db.execute('SELECT cinema_id,hall_id,mv_name,start_time,end_time FROM filmsession WHERE film_id=%s',(temp[i]['film_id'],))
		temp2=db.fetchone()
		db.execute('SELECT cinema_name FROM cinema_info WHERE cinema_id=%s',(temp2['cinema_id'],))
		cinema_name=db.fetchone()['cinema_name']
		dbresult['cinema_name']=cinema_name
		dbresult['mv_name']=temp2['mv_name']
		dbresult['hall_id']=temp2['hall_id']
		dbresult['start_time']=temp2['start_time']
		dbresult['end_time']=temp2['end_time']
		result.append(dbresult)
	return result

def refundUserTickets(userid,film_id,row,col):
	try:
		db.execute('SELECT balance FROM userinfo WHERE userid=%s', (userid,))
		balance=db.fetchone()['balance']
		print("balacne is :",balance)
		price=50+balance
		db.execute('UPDATE userinfo SET balance=%s WHERE userid=%s',(price,userid))
		db.execute('DELETE FROM tickets WHERE film_id=%s and row=%s and col=%s',(film_id,row,col))
	except Exception as e:
		conn.rollback()
	finally:
		conn.commit()
		return db.rowcount

def charge(userid,amount):
	db.execute('SELECT balance FROM userinfo WHERE `userid`=%s', (userid,))
	balance=db.fetchone()['balance']
	db.execute('UPDATE userinfo SET balance=%s WHERE userid=%s',((balance+amount),userid))
	conn.commit()
	return db.rowcount

def getFilmTickets(number):
	result=[]
	db.execute('SELECT film_id,cinema_id,hall_id,mv_name,start_time FROM filmsession ORDER BY RAND() LIMIT %s',(number,))
	dbresult=db.fetchall()
	#print(dbresult)
	for i in range(0,number):
		temp={'film_id':'','cinema_name':'','mv_name':'','hall_id':'','start_time':''}
		db.execute('SELECT cinema_name FROM cinema_info WHERE cinema_id=%s',(dbresult[i]['cinema_id'],))
		temp['cinema_name']=db.fetchone()['cinema_name']
		temp['mv_name']=dbresult[i]['mv_name']
		temp['start_time']=dbresult[i]['start_time']
		temp['hall_id']=dbresult[i]['hall_id']
		temp['film_id']=dbresult[i]['film_id']
		result.append(temp)
	return result

def searchByName(mv_name):
	result=[]
	db.execute('SELECT film_id,cinema_id,hall_id,mv_name,start_time FROM filmsession WHERE mv_name=%s',(mv_name,))
	dbresult=db.fetchall()
	number=len(dbresult)
	#print(dbresult)
	for i in range(0,number):
		temp={'film_id':'','cinema_name':'','mv_name':'','hall_id':'','start_time':''}
		db.execute('SELECT cinema_name FROM cinema_info WHERE cinema_id=%s',(dbresult[i]['cinema_id'],))
		temp['cinema_name']=db.fetchone()['cinema_name']
		temp['mv_name']=dbresult[i]['mv_name']
		temp['start_time']=dbresult[i]['start_time']
		temp['hall_id']=dbresult[i]['hall_id']
		temp['film_id']=dbresult[i]['film_id']
		result.append(temp)
	return result,number

def encrypt(passwd):
    return generate_password_hash(passwd)
def checkPwd(pwd, hashedPwd):
    return check_password_hash(hashedPwd, pwd)
