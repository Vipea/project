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
    species_per_year = []

    for species in coastalbird[i]:
        value = coastalbird[i][species]
        species_per_year.append({"species": "bird", "name": species, "value": value})

    for species in coastalfish[i]:
        value = coastalfish[i][species]
        species_per_year.append({"species": "fish", "name": species, "value": value})

    for species in coastalbodem[i]:
        value = coastalbodem[i][species]
        species_per_year.append({"species": "bodem", "name": species, "value": value})

    coastalbird[i] = species_per_year

for i in westbird:
    species_per_year = []

    for species in westbird[i]:
        value = westbird[i][species]
        species_per_year.append({"species": "bird", "name": species, "value": value})

    for species in westfish[i]:
        value = westfish[i][species]
        species_per_year.append({"species": "fish", "name": species, "value": value})

    for species in westbodem[i]:
        value = westbodem[i][species]
        species_per_year.append({"species": "bodem", "name": species, "value": value})

    westbird[i] = species_per_year

for i in oostbird:
    species_per_year = []

    for species in oostbird[i]:
        value = oostbird[i][species]
        species_per_year.append({"species": "bird", "name": species, "value": value})

    for species in oostfish[i]:
        value = oostfish[i][species]
        species_per_year.append({"species": "fish", "name": species, "value": value})

    for species in oostbodem[i]:
        value = oostbodem[i][species]
        species_per_year.append({"species": "bodem", "name": species, "value": value})

    oostbird[i] = species_per_year

for i in waddenbird:
    species_per_year = []

    for species in waddenbird[i]:
        value = waddenbird[i][species]
        species_per_year.append({"species": "bird", "name": species, "value": value})

    for species in waddenfish[i]:
        value = waddenfish[i][species]
        species_per_year.append({"species": "fish", "name": species, "value": value})

    for species in waddenbodem[i]:
        value = waddenbodem[i][species]
        species_per_year.append({"species": "bodem", "name": species, "value": value})

    waddenbird[i] = species_per_year

allindividuals = {}
allindividuals["coastal"] = coastalbird
allindividuals["oost"] = oostbird
allindividuals["west"] = westbird
allindividuals["wadden"] = waddenbird


with open('allindividuals.json', 'w') as f:
    json.dump(allindividuals, f)
