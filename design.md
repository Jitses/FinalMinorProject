# Design
This document shows the design steps that will be taken in the process of creating the WW2 project. The layout of the project can be found in the readme. This documents intention is to focus on the technical process.

## Features

### Linked interactive view 1: Map with draggable timeline

Timeline: source used as an example: http://bl.ocks.org/cmdoptesc/fc0e318ce7992bed7ca8

Technical components: 
- D3 datamaps: http://datamaps.github.io/
- D3 tooltip

Dynamic colour change of the map over months of timeline (country free or occupied by the Germans):

A dynamic colour change was also made in Data Processing week 5 to change the colour theme of a datamap. It can be used and adjusted to suit this project.

The datamap will be placed inside a div (containerMap) of a fixed width. 

### Linked interactive view 2: Bar chart connected to map

Technical component: D3 barchart

The bar chart will be positioned next to the map in a div (containerBarchart)

Data used: https://en.wikipedia.org/wiki/World_War_II_casualties

### Linked interactive view 3: Sunburst connected to map

Technical component: D3 sunburst

The sunburst will be positioned below the map. When clicked on a country, the page scrolls down to the sunburst and opens the data of the particular country. Jquery can be used to do this (https://stackoverflow.com/questions/18071046/smooth-scroll-to-specific-div-on-click).

Data used: https://en.wikipedia.org/wiki/List_of_battles_by_casualties


### Data
To load data, a queue will be used. No API will be used, as all data will be downloaded first. The data will either be extracted as table format (csv), otherwise it will be copied by manually, since the datasets are not very big.





