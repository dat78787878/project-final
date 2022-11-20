import pandas as pd
from pymongo import MongoClient
from underthesea import sentiment
import numpy as np

conn = MongoClient("mongodb://localhost:27017")
db = conn['project_db']
# Step 0: Load data into list
comment_items = db.comments
# comment_items = pd.DataFrame(list(comment_items.find()))
# comment_items['sentiment'] = comment_items[comment_items['comment_detail']]
listComments = list(comment_items.find())



for doc_index,value in enumerate(listComments):
   value['sentiment_check'] = sentiment(value['comment_detail'])

conn = MongoClient("mongodb://localhost:27017")
db = conn['project_db']
collection = db['comments']
collection.drop();
collection.insert_many(listComments)

