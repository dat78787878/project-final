import pymongo
import pandas as pd
from pymongo import MongoClient
from sklearn import linear_model
import matplotlib.pyplot as plt
import numpy as np 
client = MongoClient()
#point the client at mongo URI
# client = MongoClient('mongodb+srv://admin:qtlKCcrMp264hS2H@cluster0.wlohl.mongodb.net/timesheet') use mongodb cloud
client = MongoClient('mongodb://localhost:27017/');
#select database
# db = client['timesheet'] use mongodb cloud
db = client['admin']

#select the collection within the database
Profile = db.profiles
Result = db.results


#convert entire collection to Pandas dataframe

Profile = pd.DataFrame(list(Profile.find()))
Profile.to_csv('1.csv', index=False)

x_values = Profile[['height']]
y_values = Profile[['weight']]

X = x_values
# weight (kg)
y = y_values

# Building Xbar 
one = np.ones((X.shape[0], 1))
Xbar = np.concatenate((one, X), axis = 1)

# fit the model by Linear Regression
regr = linear_model.LinearRegression(fit_intercept=False) # fit_intercept = False for calculating the bias
regr.fit(Xbar, y)

w_0 = regr.coef_[0][0]
w_1 = regr.coef_[0][1]

thisdict = {
  "w_0": w_0,
  "w_1": w_1,
}
print ("thisdict",thisdict)

Result.drop();
Result.insert_one(thisdict)

# # Drawing the fitting line 

# x0 = np.linspace(146, 190, 2, endpoint=True)
# y0 = w_0 + w_1*x0


# plt.plot(X, y, 'ro')     # data 
# plt.plot(x0, y0)               # the fitting line
# plt.axis([146, 190, 38, 81])
# plt.xlabel('Height (cm)')
# plt.ylabel('Weight (kg)')
# plt.show()



