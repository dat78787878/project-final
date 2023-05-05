import json
import pandas as pd
from pymongo import MongoClient
from pyvi import ViTokenizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import NMF
from sklearn.model_selection import train_test_split
import numpy as np
from sklearn.metrics import mean_absolute_error
from gensim.models.coherencemodel import CoherenceModel
from sklearn.decomposition import NMF
from sklearn.feature_extraction.text import CountVectorizer
conn = MongoClient("mongodb+srv://admin:Ao0zkKmeMJpb8ojC@cluster0.wlohl.mongodb.net/?retryWrites=true&w=majority")
db = conn['project_db']
# Step 0: Load data into list
comment_items = db.comments
comment_items = list(comment_items.find())

# Step 1: Load data into Dataframe
comments = pd.DataFrame(comment_items)
comments = comments.comment_detail
comments1_train,comments1_test = train_test_split(comments, test_size=0.30)

# Step 2: Tokenizer
def tokenize(n):
  return ViTokenizer.tokenize(n)

data = list(map(tokenize, comments1_train))



#Step 3: Vectorize
f = open('./stop_word.txt', encoding="utf8")
stop_word = []
for line in f:
  stop_word.append(line.strip("\n"))


vectorizer = CountVectorizer()
X = vectorizer.fit_transform(data)

no_features = 1000
tfidf_vectorizer = TfidfVectorizer(max_df=0.95, min_df=2, max_features=no_features, stop_words=stop_word)     
tfidf =   tfidf_vectorizer.fit_transform(data)     

no_topics = 20
nmf = NMF(n_components=no_topics, random_state=1,  max_iter=2000, alpha_W=0.00005, alpha_H=0.00005, l1_ratio=.5, init='nndsvd').fit(tfidf)

#  phương pháp Perplexity
perplexity = nmf.reconstruction_err_
print(f"Perplexity: {perplexity}")