#
# Jitse Schol
# Student Number: 10781463
# Made in Data Processing week 3
# Converts a CSV file to a JSON file
#

# Retrieved from https://stackoverflow.com/questions/19697846/how-to-convert-csv-file-to-multiline-json
import csv
import json

# Open csv file in reading mode
csvfile = open('/Users/Jitse/Desktop/FinalMinorProject/data/wikiCasualties.csv', 'r')

# Open JSON file in writing mode
jsonfile = open('/Users/Jitse/Desktop/FinalMinorProject/data/wikiCasualties.json', 'w')

# Set fieldnames
fieldnames = ("Country", "Total population 1-1-1939", "Military deaths from all causes", "Civilian deaths due to military activity and crimes against humanity", "Total Deaths", "Military wounded")

# Initiate reader
reader = csv.DictReader(csvfile, fieldnames)

# Create empty list
data_list = [];

# Go over rows in csvfile
for row in reader:

    # Append to data list
    data_list.append(row);

# Initiate dictionary
data_dict = {'data': data_list[0:]}

# Dump to json file in json format
json.dump(data_dict, jsonfile)
