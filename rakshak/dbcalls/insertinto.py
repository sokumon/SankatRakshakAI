from pymongo import MongoClient
client = MongoClient('localhost',27017)

db = client['sankatrakshak']

calls = db.calls
def insertinto(data):
    id = calls.insert_one(data).inserted_id
    print(id)
    status = {
        "status":"success"
    }
    return status
# call_dets = {
#     "call_id":123,
#     "user_id":123
# }