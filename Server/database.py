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


def encrypt(passwd):
    return generate_password_hash(passwd)
def checkPwd(pwd, hashedPwd):
    return check_password_hash(hashedPwd, pwd)
