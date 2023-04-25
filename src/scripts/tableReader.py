'''
This python script is used to read html tables and 
to create the clubs and players database faster and easier
'''

import csv
import json

table = input("Enter the name of the csv file (with .csv) \n")
print("File types\n1. Champions League players\n2. NFL Teams")
tableType = int(input("Type of file\n"))
#dictionary
d = {}


if(tableType==1):
    try:
        with open("./tables/"+table) as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            line_count = 0
            for row in csv_reader:
                if line_count == 0:
                    print('Columns are {}'.format(",".join(row)))
                    line_count += 1
                else:
                    playerName = row[0]
                    titles = row[1]
                    print('{} has {} Champions League titles'.format(row[0], row[1]))
                    if d.get(titles) is not None:
                        d[titles].append({"name": playerName, "displayName": playerName.upper()})
                    else:
                        d[titles] = [{"name": playerName, "displayName": playerName.upper()}]
                    line_count += 1
            print("Table had {} lines".format(line_count))
    except:
        print("Something went wrong, try again, make sure the file location is correct")
elif(tableType==2):
    try:
        with open("./tables/"+table) as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            line_count = 0
            for row in csv_reader:
                if line_count == 0:
                    print('Columns are {}'.format(",".join(row)))
                    line_count += 1
                else:
                    teamName = row[1]
                    teamName = teamName.replace(' ', '_').lower()
                    titles = row[3]
                    print('{} has {} Super Bowls'.format(row[1], row[3]))
                    if d.get(titles) is not None:
                        d[titles].append({"name": teamName, "displayName": teamName.upper()})
                    else:
                        d[titles] = [{"name": teamName, "displayName": teamName.upper()}]
                    line_count += 1
            print("Table had {} lines".format(line_count))
    except:
        print("Something went wrong, try again, make sure the file location is correct")

print(d)

jsonstring = json.dumps(d, indent=2)
print(jsonstring)
print("-------------\n")
for key in d:
    print(key)
    for player in d[key]:
        print(player)

jsonFile = open("./jsons/"+table[:len(table)-4]+".json", "w")
jsonFile.write(jsonstring)
jsonFile.close()

#Code to write javascript switch
# for key in d:
#     for item in d[key]:
#         print("case: \""+item["name"]+"\":\ni=\"\";\nbreak;")