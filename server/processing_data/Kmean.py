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

no_features = 1000
tfidf_vectorizer = TfidfVectorizer(max_df=0.95, min_df=2, max_features=no_features, stop_words='english')     
tfidf =   tfidf_vectorizer.fit_transform(data)     
tfidf_feature_names   = tfidf_vectorizer.get_feature_names_out()


k = 20
model = KMeans(n_clusters=k, init='k-means++', max_iter=100, n_init=1)
model.fit(tfidf)
order_centroids = model.cluster_centers_.argsort()[:,::-1]

# Step 6: Display result
result = list(comment_items)
def display_topics(H, W, feature_names, documents, no_top_words):
  for i in range(k):
    topic_content = " ".join([feature_names[j] for j in order_centroids[i, :20]])
    for doc_index,value in enumerate(documents):
      if W[doc_index].argsort()[::-1][0] == i:
        result[doc_index]['topic_id_kmean'] = i
        result[doc_index]['topic_content_kmean'] = topic_content
            
nmf_W = model.transform(tfidf)
nmf_H = model.labels_
no_top_words = 20

display_topics(nmf_H, nmf_W, tfidf_feature_names, data, no_top_words)

collection = db['comments']
collection.drop()
collection.insert_many(result)



