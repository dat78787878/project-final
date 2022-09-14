import json
import pandas as pd
from pymongo import MongoClient
import numpy as np
import re
# Step 0: Load data into list
f = open('../comment/comment.json', encoding="utf8")
comment_items = json.load(f)

result = list(comment_items)
result = pd.DataFrame(result)

complete_df = result[~pd.isna(result).any(axis=1)].reset_index(drop=True) #loc du lieu None

complete_df['time_comment'] = complete_df['time_comment'].str.replace(' tháng ','').str.replace(' năm ','/') #loc ngay thang
result = complete_df.to_dict(orient='records')

conn = MongoClient("mongodb://localhost:27017")
db = conn['project_db']
collection = db['comments']
collection.drop();
collection.insert_many(result)
