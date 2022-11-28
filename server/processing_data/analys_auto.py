import json
import pandas as pd
from pymongo import MongoClient
from pyvi import ViTokenizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import NMF
from sklearn.model_selection import KFold, GridSearchCV
from sklearn.metrics import fbeta_score, make_scorer

from sklearn.metrics import accuracy_score, precision_score, recall_score
ftwo_scorer = make_scorer(fbeta_score, beta=2)
scorers = {
        'precision_score': make_scorer(precision_score),
        'recall_score': make_scorer(recall_score),
        'accuracy_score': make_scorer(accuracy_score)
        }
conn = MongoClient("mongodb+srv://admin:Ao0zkKmeMJpb8ojC@cluster0.wlohl.mongodb.net/?retryWrites=true&w=majority")
db = conn['project_db']
# Step 0: Load data into list
comment_items = db.comments
comment_items = list(comment_items.find())

# Step 1: Load data into Dataframe
comments = pd.DataFrame(comment_items)
comments1 = comments.comment_detail
# comments1_train = train_test_split(comments1, test_size=0.30)
# Step 2: Tokenizer
def tokenize(n):
      return ViTokenizer.tokenize(n.lower())

data = list(map(tokenize, comments1))
#Step 3: Vectorize
no_features = 1000
tfidf_vectorizer = TfidfVectorizer(max_df=0.95, min_df=2, max_features=no_features, stop_words='english')     
tfidf =   tfidf_vectorizer.fit_transform(data)     
tfidf_feature_names   = tfidf_vectorizer.get_feature_names_out()
RAND_STATE=10  # for reproducibility and consistency
folds=3
k_fold = KFold(n_splits=folds, shuffle=True, random_state=RAND_STATE) 

hyperparams = {
    "n_components": [10, 20],
}

nmf = NMF()  # sets jobs equal to number of cores

ensemble =  GridSearchCV(NMF(),param_grid=hyperparams, verbose=1,cv=3,scoring=scorers,refit="precision_score")

ensemble.fit(tfidf)

print(" Results from Grid Search " )
print("\n The best parameters across ALL searched params:\n",ensemble.best_params_)
y = ensemble.best_params_
print(y["max_iter"])
print(y["n_clusters"])
print(y["n_init"])
k = y["n_clusters"]
model = NMF(n_components=k, init='nndsvd', max_iter=y["max_iter"])
model.fit(tfidf)
order_centroids = model.cluster_centers_.argsort()[:,::-1]

# Step 6: Display result
result = list(comment_items)
def display_topics(H, W, feature_names, documents, no_top_words):
  for i in range(k):
    topic_content = " ".join([feature_names[j] for j in order_centroids[i, :20]])
    for doc_index,value in enumerate(documents):
      if W[doc_index].argsort()[::-1][0] == i:
        result[doc_index]['topic_id'] = i
        result[doc_index]['topic_content'] = topic_content
            
nmf_W = model.transform(tfidf)
nmf_H = model.labels_
no_top_words = 20

display_topics(nmf_H, nmf_W, tfidf_feature_names, data, no_top_words)

# max_iter': 400, 'n_clusters': 10, 'n_init': 10

print(result)
