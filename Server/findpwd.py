from config import db
import mysql.connector
from database import *
email = "928686953@qq.com"
db.execute('select * from userinfo where `email`=%s',(email))
result = db.fetchone()
print(encrypt(result[1]))
