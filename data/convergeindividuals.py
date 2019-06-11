import json

coastalbird = open('coastalbird.json')
coastalbodem = open('coastalbodem.json')
coastalfish = open('coastalfish.json')
coastalbird = json.load(coastalbird)
coastalbodem = json.load(coastalbodem)
coastalfish = json.load(coastalfish)

waddenbird = open('waddenbird.json')
waddenbodem = open('waddenbodem.json')
waddenfish = open('waddenfish.json')
waddenbird = json.load(waddenbird)
waddenbodem = json.load(waddenbodem)
waddenfish = json.load(waddenfish)

oostbird = open('oostbird.json')
oostbodem = open('oostbodem.json')
oostfish = open('oostfish.json')
oostbird = json.load(oostbird)
oostbodem = json.load(oostbodem)
oostfish = json.load(oostfish)

westbird = open('westbird.json')
westbodem = open('westbodem.json')
westfish = open('westfish.json')
westbird = json.load(westbird)
westbodem = json.load(westbodem)
westfish = json.load(westfish)

for i in coastalbird:
    bird_per_year = []
    fish_per_year = []
    bodem_per_year = []

    for species in coastalbird[i]:
        value = coastalbird[i][species]
        bird_per_year.append({"name": species, "value": value})

    for species in coastalfish[i]:
        value = coastalfish[i][species]
        fish_per_year.append({"name": species, "value": value})

    for species in coastalbodem[i]:
        value = coastalbodem[i][species]
        bodem_per_year.append({"name": species, "value": value})

    coastalbird[i]["bird"] = bird_per_year
    coastalbird[i]["fish"] = fish_per_year
    coastalbird[i]["bodem"] = bodem_per_year

for i in westbird:
    bird_per_year = []
    fish_per_year = []
    bodem_per_year = []

    for species in westbird[i]:
        value = westbird[i][species]
        bird_per_year.append({"name": species, "value": value})

    for species in westfish[i]:
        value = westfish[i][species]
        fish_per_year.append({"name": species, "value": value})

    for species in westbodem[i]:
        value = westbodem[i][species]
        bodem_per_year.append({"name": species, "value": value})

    westbird[i]["bird"] = bird_per_year
    westbird[i]["fish"] = fish_per_year
    westbird[i]["bodem"] = bodem_per_year

for i in oostbird:
    bird_per_year = []
    fish_per_year = []
    bodem_per_year = []

    for species in oostbird[i]:
        value = oostbird[i][species]
        bird_per_year.append({"name": species, "value": value})

    for species in oostfish[i]:
        value = oostfish[i][species]
        fish_per_year.append({"name": species, "value": value})

    for species in oostbodem[i]:
        value = oostbodem[i][species]
        bodem_per_year.append({"name": species, "value": value})

    oostbird[i]["bird"] = bird_per_year
    oostbird[i]["fish"] = fish_per_year
    oostbird[i]["bodem"] = bodem_per_year

for i in waddenbird:
    bird_per_year = []
    fish_per_year = []
    bodem_per_year = []

    for species in waddenbird[i]:
        value = waddenbird[i][species]
        bird_per_year.append({"name": species, "value": value})

    for species in waddenfish[i]:
        value = waddenfish[i][species]
        fish_per_year.append({"name": species, "value": value})

    for species in waddenbodem[i]:
        value = waddenbodem[i][species]
        bodem_per_year.append({"name": species, "value": value})

    waddenbird[i]["bird"] = bird_per_year
    waddenbird[i]["fish"] = fish_per_year
    waddenbird[i]["bodem"] = bodem_per_year

allindividuals = {}
allindividuals["coastal"] = coastalbird
allindividuals["oosterschelde"] = oostbird
allindividuals["westerschelde"] = westbird
allindividuals["waddenzee"] = waddenbird


with open('allindividuals.json', 'w') as f:
    json.dump(allindividuals, f)
