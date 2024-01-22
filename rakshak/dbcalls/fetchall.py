from pymongo import MongoClient
client = MongoClient('localhost',27017)

db = client['sankatrakshak']

calls = db.calls
def fetchall():
    callsindb = calls.find()
    all_calls = []
    for data in calls.find():
        all_calls.append(data)
        # print(data)
    return all_calls
# def insertinto():

#     return status