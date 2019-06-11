import json

coastal = open('coastal.json')
westerschelde = open('westerschelde.json')
oosterschelde = open('oosterschelde.json')
waddenzee = open('waddenzee.json')

coastal = json.load(coastal)
westerschelde = json.load(westerschelde)
oosterschelde = json.load(oosterschelde)
waddenzee = json.load(waddenzee)

clist = []
wlist = []
olist = []
wadlist = []

for i in coastal:
    print(i)
    coastal_value = coastal[i]["Trend"]
    westerschelde_value = westerschelde[i]["Trend"]
    oosterschelde_value = oosterschelde[i]["Trend"]
    waddenzee_value = waddenzee[i]["Trend"]
    year = i

    clist.append({"date": year, "coastal": coastal_value})
    wlist.append({"date": year, "westerschelde": westerschelde_value})
    olist.append({"date": year, "oosterschelde": oosterschelde_value})
    wadlist.append({"date": year, "waddenzee": waddenzee_value})

all_locations = {}
all_locations["coastal"] = clist
all_locations["westerschelde"] = wlist
all_locations["oosterschelde"] = olist
all_locations["waddenzee"] = wadlist

with open('new_totals.json', 'w') as f:
    json.dump(all_locations, f)
