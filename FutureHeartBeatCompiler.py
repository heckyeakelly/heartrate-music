#Step 1, import the pytorch stuff that I don't understand
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

#Step 1.5 ish
#import tools to clean the data
import pandas as pd
import numpy as np


#step 2, read the data from the datafile
#we will figure out the actual filepath later, don't worry about it for now
import os
datafilename = "HR.csv"
script_directory = os.path.dirname(os.path.abspath(__file__))
filepath = os.path.join(script_directory, datafilename)
print("We have found the filepath, time to read the csv file")

# Read the data from the CSV file
data = pd.read_csv(filepath, skiprows=0, na_values=['NA', 'nan', "NAN", "NaN", ''])
# Drop rows with missing values
data = data.dropna()
data = data.values.tolist()
datax = [row[:-1] for row in data]


# Assume the last column contains the target data
targetdata = [row[-1] for row in data]

#################################################
#Step 3, model hyperparameters
#this is the number of input variables, this may vary as we go
numinputvariables = len(data[0])
print(numinputvariables)
hiddensize = 10
numlayers = 1 #this is the number of layers of the LSTM model
shuffleBool = True #should we shuffle while training, yes or no?
batchsize = 10 #this is the batch size for training our model
classes = 30 #this is the hidden layer size for the fc model
learningrate = 0.4


#################################################


#Step 4 create tensors BECAUSE IT ONLY ACCEPTS TENSORS
x_train = torch.tensor(datax, dtype=torch.float32)
y_train = torch.tensor(targetdata, dtype=torch.float32)
#tensors into dataloader

dataset = TensorDataset(x_train,y_train)
UseThisDataLoader = DataLoader(dataset, batch_size=batchsize,shuffle=shuffleBool )

"""
class RNN(torch.nn.Module):
    def __init__(self, inputsize, hiddensize, layers, classes):
        super(RNN, self).__init__()
        self.lstm = torch.nn.LSTM(input_size = inputsize, hidden_size= hiddensize, num_layers=layers)
        self.fc1 = nn.Linear(hiddensize, classes )
        self.fc2 = nn.Linear(classes,1)
    def forward(self, x):
        lstm_out, _ = self.lstm(x)
        #print(lstm_out)
        lstm_out = lstm_out.unsqueeze(1)
        #print(lstm_out)
        output = self.fc1(lstm_out[:, -1, :])  # Assuming you want to use the last output of the LSTM
        output = self.fc2(output)
        return output   
"""
from ModelDefinition import RNN
HeartBeatPredictor = RNN(numinputvariables, hiddensize, numlayers, classes )

#
criterion = nn.MSELoss()  # Mean Squared Error loss
optimizer = torch.optim.Adam(HeartBeatPredictor.parameters(), lr=learningrate)



# Training loop
num_epochs = 10
for epoch in range(num_epochs):
    HeartBeatPredictor.train()  # Set the model to training mode
    running_loss = 0.0
    for inputs, labels in UseThisDataLoader:  # Assuming you have a train_loader with batches of input data and labels
        # Zero the parameter gradients
        optimizer.zero_grad()

        # Forward pass
        outputs = HeartBeatPredictor(inputs)

        # Compute the loss
        #print("Here are the outputs")
        #print(outputs)
        #print("Here are the target labels")
        #print(labels)
        labelstemp = labels.float()
        labelstemp = labelstemp.unsqueeze(1)
        #print("here are the fixed targets")
        #print(labelstemp)
        loss = criterion(outputs, labelstemp)

        # Backward pass and optimization
        loss.backward()
        optimizer.step()

        # Update running loss
        running_loss += loss.item() * inputs.size(0)

    # Calculate average loss for the epoch
    epoch_loss = running_loss / len(UseThisDataLoader.dataset)

    # Print the average loss for the epoch
    print(f"Epoch [{epoch+1}/{num_epochs}], Loss: {epoch_loss:.4f}")

#save the model as a file path, we will load it later when it is needed.

print("Save the model")
script_directory = os.path.dirname(os.path.abspath(__file__))
filepath = os.path.join(script_directory, "RNN_model.pth")
torch.save(HeartBeatPredictor.state_dict(), filepath)
