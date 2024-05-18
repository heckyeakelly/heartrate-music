
import torch
import torch.nn as nn
import torch.optim as optim

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
