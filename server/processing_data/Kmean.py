import json
import pandas as pd
from pymongo import MongoClient
from pyvi import ViTokenizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
conn = MongoClient("mongodb://localhost:27017")
db = conn['project_db']
# Step 0: Load data into list
comment_items = db.comments
comment_items = list(comment_items.find())

# Step 1: Load data into Dataframe
comments = pd.DataFrame(comment_items)
comments1 = comments.comment_detail

# Step 2: Tokenizer
def tokenize(n):
  return ViTokenizer.tokenize(n.lower())

data = list(map(tokenize, comments1))

#Step 3: Vectorize

f = open('./stop_word.txt', encoding="utf8")
stop_word = [];
for line in f:
  stop_word.append(line.strip("\n"))


no_features = 1000
tfidf_vectorizer = TfidfVectorizer(max_df=0.95, min_df=2, max_features=no_features, stop_words=stop_word)     
tfidf =   tfidf_vectorizer.fit_transform(data)     
tfidf_feature_names   = tfidf_vectorizer.get_feature_names_out()


k = 10
model = KMeans(n_clusters=k, init='k-means++', max_iter=400, n_init=10)
model.fit(tfidf)
order_centroids = model.cluster_centers_.argsort()[:,::-1]



# Step 6: Display result
result = list(comment_items)
def display_topics(W, feature_names, documents, no_top_words):
  for i in range(k):
    topic_content = " ".join([feature_names[j] for j in order_centroids[i, :no_top_words]])
 
    for doc_index,value in enumerate(documents):
      print(W[doc_index])
      if W[doc_index] == i:
        result[doc_index]['topic_id_kmean'] = i
        result[doc_index]['topic_content_kmean'] = topic_content
            
nmf_W = model.predict(tfidf)
no_top_words = 20

display_topics(nmf_W, tfidf_feature_names, data, no_top_words)

collection = db['comments']
collection.drop()
collection.insert_many(result)



# dung 1 data

# for i in range(k):
#     print("Cluster %d:" % i),
#     for ind in order_centroids[i, :20]:
#         print(' %s' % tfidf_feature_names[ind]),
#     print

# Y = tfidf_vectorizer.transform(["nhân viên nhiệt tình chu đáo bò ngon"])
# prediction = model.predict(Y)
# print(prediction)




