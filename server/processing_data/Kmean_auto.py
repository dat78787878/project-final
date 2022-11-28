import json
import pandas as pd
from pymongo import MongoClient
from pyvi import ViTokenizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from sklearn.preprocessing import normalize, MinMaxScaler
from sklearn.model_selection import KFold, GridSearchCV
from sklearn.metrics import silhouette_score
from sklearn.model_selection import train_test_split
conn = MongoClient("mongodb+srv://admin:Ao0zkKmeMJpb8ojC@cluster0.wlohl.mongodb.net/?retryWrites=true&w=majority")
db = conn['project_db']
# Step 0: Load data into list
comment_items = db.comments
comment_items = list(comment_items.find())

# Step 1: Load data into Dataframe
comments = pd.DataFrame(comment_items)
comments1 = comments.comment_detail
comments1_train,comments1_test = train_test_split(comments1, test_size=0.30)


#Step 2: Tokenizer
def tokenize(n):
      return ViTokenizer.tokenize(n.lower())

datatest = list(map(tokenize, comments1_test))




#Step 3: Vectorize

f = open('./stop_word.txt', encoding="utf8")
stop_word = [];
for line in f:
  stop_word.append(line.strip("\n"))


no_features = 1000
tfidf_vectorizer = TfidfVectorizer(max_df=0.95, min_df=2, max_features=no_features, stop_words=stop_word) 
# Step 4: Run    
tfidftest =   tfidf_vectorizer.fit_transform(datatest)     

RAND_STATE=50  # for reproducibility and consistency
folds=3
k_fold = KFold(n_splits=folds, shuffle=True, random_state=RAND_STATE) 

hyperparams = {
    "n_clusters": [10, 20],
    "n_init": [10, 15, 20],
    "max_iter": [100, 200, 300, 400, 500],
}

k_means = KMeans()  # sets jobs equal to number of cores

ensemble =  GridSearchCV(estimator=k_means, param_grid = hyperparams, cv = 2, n_jobs=-1)

ensemble.fit(tfidftest)

print(" Results from Grid Search " )
print("\n The best parameters across ALL searched params:\n",ensemble.best_params_)
y = ensemble.best_params_
k = y["n_clusters"]
model = KMeans(n_clusters=k, init='k-means++', max_iter=y["max_iter"], n_init=y["n_init"])

# Step 5: Predict
data = list(map(tokenize, comments1))
tfidf =   tfidf_vectorizer.fit_transform(data) 
tfidf_feature_names   = tfidf_vectorizer.get_feature_names_out()

model.fit(tfidf)
order_centroids = model.cluster_centers_.argsort()[:,::-1] #sap xep do quan trong cua tu trong cau

# Step 6: Display result
result = list(comment_items)
def display_topics(W, feature_names, documents, no_top_words):
  for i in range(k):
    topic_content = " ".join([feature_names[j] for j in order_centroids[i, :no_top_words]])
    for doc_index,value in enumerate(documents):
      if W[doc_index] == i:
        result[doc_index]['topic_id_kmean'] = i
        result[doc_index]['topic_content_kmean'] = topic_content
            
nmf_W = model.predict(tfidf)

no_top_words = 20

display_topics(nmf_W, tfidf_feature_names, data, no_top_words)

# max_iter': 400, 'n_clusters': 10, 'n_init': 10

collection = db['comments']
collection.drop()
collection.insert_many(result)
