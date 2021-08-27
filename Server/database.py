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
	db.execute('select email from userinfo where `userid`=%s', (userid,))
	result = db.fetchone()
	return result

def getUnavailableFilm(film_id):
	db.execute('SELECT row,col FROM tickets WHERE film_id=%s',(film_id,))
	result=db.fetchall()
	return result

def book(userid,film_id,seats,number):
	try:
		for i in range(0,number):
			db.execute('insert into tickets (`film_id`,`userid`,`row`,`col`) values(%s,%s,%s,%s)',(film_id,userid,seats[i]['row'],seats[i]['col']))
	except Exception as e:
		conn.rollback()
		print(e)
	finally:
		conn.commit()
	return db.rowcount

def getUserTickets(userid):
	db.execute('select film_id,row,col from tickets where `userid`=%s', (userid,))
	result=db.fetchall()
	return result

def refundUserTickets(userid,film_id,row,col):
	try:
		db.execute('SELECT balance FROM userinfo WHERE `userid`=%s', (userid,))
		balance=db.fetchone()['balance']
		price=50
		db.execute('UPDATE userinfo SET balance=%s WHERE userid=%s',(balance+price,userid))
		db.execute('DELETE FROM tickets WHERE `userid`=%s and `film_id`=%s and `row`=%s and `col`=%s',(userid,film_id,row,col))
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



def encrypt(passwd):
    return generate_password_hash(passwd)
def checkPwd(pwd, hashedPwd):
    return check_password_hash(hashedPwd, pwd)
