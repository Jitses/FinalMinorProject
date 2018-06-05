# Design
This document shows the design steps that will be taken in the process of creating the WW2 project. The layout of the project can be found in the readme. This documents intention is to focuss on the technical process.

## Features

### Linked interactive view 1: Map with draggable timeline

Timeline: source used as an example: http://bl.ocks.org/cmdoptesc/fc0e318ce7992bed7ca8

Technical components: 
- D3 datamaps: http://datamaps.github.io/
- D3 tooltip

### Linked interactive view 2: Bar chart connected to map

Technical component: D3 barchart
Data used: https://en.wikipedia.org/wiki/World_War_II_casualties

### Linked interactive view 3: Sunburst connected to map

Technical component: D3 sunburst
Data used: https://en.wikipedia.org/wiki/List_of_battles_by_casualties


### Data
To load data, a queue will be used. No API will be used, as all data will be downloaded first. The data will either be extracted as table format (csv), otherwise it will be copied by manually, since the datasets are not very big.





