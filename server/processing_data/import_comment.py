#!/usr/bin/env python
# -*- coding: utf-8 -*- 
import json
import pandas as pd
from pymongo import MongoClient
import numpy as np
import re
import io
# Step 0: Load data into list
f = io.open('../comment/comment.json', encoding="utf8")
comment_items = json.load(f)

result = list(comment_items)
result = pd.DataFrame(result)

complete_df = result[~pd.isna(result).any(axis=1)].reset_index(drop=True) #loc du lieu None

conn = MongoClient("mongodb+srv://admin:Ao0zkKmeMJpb8ojC@cluster0.wlohl.mongodb.net/?retryWrites=true&w=majority")
db = conn['project_db']

#drop data hotels cu
collection1 = db['hotels']
collection1.drop()

# Step 0: Load data into list
comment_items = db.comments
comment_items = pd.DataFrame(list(comment_items.find()))



def clean_text(words):
    """
    Text cleaning
    Returns a cleaned text
    """
    words = str(words).lower()
    
    # new line removal
    words = [re.sub('[^A-Za-z0-9]+\s+', ' ', sent) for sent in words]
    words = [re.sub('\!', ' ', sent) for sent in words]
    words = [re.sub('\,', ' ', sent) for sent in words]
    words = [re.sub('\.', ' ', sent) for sent in words]
    
    
    # remove distracting single quotes
    words = [re.sub("\'", "", sent) for sent in words]
    words = "".join(words)
    return words

#check xem data cu va moi co trung lp khong
if complete_df.shape[0] != comment_items.shape[0]:
    complete_df['comment_detail'] = complete_df['comment_detail'].apply(lambda x: clean_text(x))
    # complete_df['time_comment'] = complete_df['time_comment'].str.replace(' tháng ','').str.replace(' năm ','/')
    result = complete_df.to_dict(orient='records')

    collection = db['comments']
    collection.drop()
    collection.insert_many(result)





