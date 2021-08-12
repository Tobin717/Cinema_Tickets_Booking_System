from werkzeug.security import generate_password_hash, check_password_hash
password = "rzt0816"
hashpwd = generate_password_hash(password)
print(hashpwd)
print("the len is:")
print(len(hashpwd))
