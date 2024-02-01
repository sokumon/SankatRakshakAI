from rakshak.dbcalls.dbconfig import client,db,calls


def fetchall():
    callsindb = calls.find()
    all_calls = []
    for data in calls.find():
        all_calls.append(data)
        # print(data)
    return all_calls
# def insertinto():

#     return status