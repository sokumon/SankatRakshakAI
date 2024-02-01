from pymongo import MongoClient
client = MongoClient('0.0.0.0',27017)

db = client['sankatrakshak']

calls = db.calls