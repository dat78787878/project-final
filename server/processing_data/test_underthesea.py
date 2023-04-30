import pandas as pd
from pymongo import MongoClient
from underthesea import sentiment
import nltk
nltk.download('all')
conn = MongoClient("mongodb+srv://admin:Ao0zkKmeMJpb8ojC@cluster0.wlohl.mongodb.net/?retryWrites=true&w=majority")
db = conn['project_db']
# Step 0: Load data into list
comment_items = db.comments
# comment_items = pd.DataFrame(list(comment_items.find()))
# comment_items['sentiment'] = comment_items[comment_items['comment_detail']]
listComments = list(comment_items.find())

for doc_index,value in enumerate(listComments):
   value['sentiment_check'] = sentiment(value['comment_detail'])

collection = db['comments']
collection.drop()
collection.insert_many(listComments)

