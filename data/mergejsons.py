import json

coastal = open('coastal.json')
westerschelde = open('westerschelde.json')
oosterschelde = open('oosterschelde.json')
waddenzee = open('waddenzee.json')

coastal = json.load(coastal)
westerschelde = json.load(westerschelde)
oosterschelde = json.load(oosterschelde)
waddenzee = json.load(waddenzee)


for i in coastal:
    coastal_value = coastal[i]["Trend"]
    westerschelde_value = westerschelde[i]["Trend"]
    oosterschelde_value = oosterschelde[i]["Trend"]
    waddenzee_value = waddenzee[i]["Trend"]
    coastal[i] = []
    coastal[i].append({"location": "coastal", "value": coastal_value - 100})
    coastal[i].append({"location": "westerschelde", "value": westerschelde_value - 100})
    coastal[i].append({"location": "oosterschelde", "value": oosterschelde_value - 100})
    coastal[i].append({"location": "waddenzee", "value": waddenzee_value - 100})

all_locations = coastal

with open('all_locations.json', 'w') as f:
    json.dump(all_locations, f)
