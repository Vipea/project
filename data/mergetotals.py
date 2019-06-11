import json

coastal = open('coastaltotal.json')
westerschelde = open('westerscheldetotal.json')
oosterschelde = open('oosterscheldetotal.json')
waddenzee = open('waddenzeetotal.json')

coastal = json.load(coastal)
westerschelde = json.load(westerschelde)
oosterschelde = json.load(oosterschelde)
waddenzee = json.load(waddenzee)

all_locations = {}
all_locations["coastal"] = coastal
all_locations["westerschelde"] = westerschelde
all_locations["oosterschelde"] = oosterschelde
all_locations["waddenzee"] = waddenzee

with open('all_totals.json', 'w') as f:
    json.dump(all_locations, f)
