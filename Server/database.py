from config import db
import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash


conn = mysql.connector.connect(host=db['host'], user=db['user'], passwd=db['passwd'], database=db['database'], charset='utf8')
db=conn.cursor()
def findUser(userid):
    db.execute('select * from userinfo where `userid`=%s', (userid))
    result = db.fetchone()
    return result

def userLogin(userid, password):
    db.execute('select * from userinfo where `userid`=%s', (userid))
    result = db.fetchone()
    if result:
        if checkPwd(password, result[1]):
            return result
    return None

def createUser(userid, password,email,balance):
    password = encrypt(password)
    db.execute('insert into userinfo (`userid`, `password`,`email`,`balance`) values (%s, %s, %s, %s)', (userid, password,email,balance))
    conn.commit()
    return db.rowcount




def encrypt(passwd):
    return generate_password_hash(passwd)
def checkPwd(pwd, hashedPwd):
    return check_password_hash(hashedPwd, pwd)