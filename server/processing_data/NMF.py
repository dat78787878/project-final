import json
import pandas as pd
from pymongo import MongoClient
from pyvi import ViTokenizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import NMF

topic_content = {
  "vị trí" : ["vị_trí"],
  "spa,bar,bể bơi": ['spa','bar','bể_bơi'],
  "dịch vụ": ['dịch_vụ','phục_vụ','chào_đón'],
  "phòng,nhà hàng": ['phòng',"nhà_hàng"]
}

# text = ""
# for x in topic_content.keys():
#   for item in topic_content[x]:
#     if(item == 'vị_trí'): 
#       print(x)

conn = MongoClient("mongodb+srv://admin:Ao0zkKmeMJpb8ojC@cluster0.wlohl.mongodb.net/?retryWrites=true&w=majority")
db = conn['project_db']
# Step 0: Load data into list
comment_items = db.comments
comment_items = list(comment_items.find())

# Step 1: Load data into Dataframe
comments = pd.DataFrame(comment_items)
comments = comments.comment_detail

# Step 2: Tokenizer
def tokenize(n):
  return ViTokenizer.tokenize(n.lower())

data = list(map(tokenize, comments))

#Step 3: Vectorize
f = open('./stop_word.txt', encoding="utf8")
stop_word = []
for line in f:
  stop_word.append(line.strip("\n"))

no_features = 1000
tfidf_vectorizer = q(max_df=0.95, min_df=2, max_features=no_features, stop_words=stop_word)     
tfidf =   tfidf_vectorizer.fit_transform(data)     
tfidf_feature_names   = tfidf_vectorizer.get_feature_names_out()

 # get_feature_names_out
# step 4: Run NMF
no_topics = 20
nmf = NMF(n_components=no_topics, random_state=1,  max_iter=2000, alpha_W=0.00005, alpha_H=0.00005, l1_ratio=.5, init='nndsvd').fit(tfidf)

# Step 5: Predict
nmf_predict = nmf.transform(tfidf)

# Step 6: Display result
result = list(comment_items)
def display_topics(H, W, feature_names, documents, no_top_words):
      for topic_idx, topic in enumerate(H):
        #print("test"," ".join([feature_names[i] for i in topic.argsort()[:-no_top_words - 1:-1]]))
        check = ""
        for i in topic.argsort()[:-no_top_words - 1:-1]:
          if(check == "done"): break
          for key in topic_content.keys():
            for item in topic_content[key]:
              #print(item)
              if(item == feature_names[i]): 
                topic_content_detail = key #chu de cua binh luan
                #print(index)
                topic_id_content = list(topic_content.keys()).index(key)
                check = "done"
             
        for doc_index,value in enumerate(documents):
            if W[doc_index].argsort()[::-1][0] == topic_idx:
                result[doc_index]['topic_id'] = topic_id_content
                result[doc_index]['topic_content'] = topic_content_detail
             

nmf_W = nmf.transform(tfidf)
nmf_H = nmf.components_
no_top_words = 20

display_topics(nmf_H, nmf_W, tfidf_feature_names, data, no_top_words)


# Step 7: Output file
# with open("data_comment.json", "w", encoding='utf8') as f:
#     json.dump(result, f, ensure_ascii=False)

collection = db['comments']
collection.drop()
collection.insert_many(result)

