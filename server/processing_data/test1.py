from sklearn.decomposition import NMF
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.datasets import fetch_20newsgroups

# Load dataset
data = fetch_20newsgroups(subset='train').data

# Preprocessing
vectorizer = TfidfVectorizer(max_df=0.5, min_df=2, stop_words='english')
X = vectorizer.fit_transform(data)

# Train NMF model
num_topics = 10
nmf = NMF(n_components=num_topics, random_state=42)
nmf.fit(X)

# Evaluate NMF model using Perplexity
perplexity = nmf.reconstruction_err_
print(f"Perplexity: {perplexity}")