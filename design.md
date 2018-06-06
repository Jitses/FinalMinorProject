# Design
This document shows the design steps that will be taken in the process of creating the WW2 project. The layout of the project can be found in the readme. This documents intention is to focus on the technical process.

## Features

### Linked interactive view 1: Map with draggable timeline

The datamap will be placed inside a div (containerMap) of a fixed width. 

Timeline: source used as an example: http://bl.ocks.org/cmdoptesc/fc0e318ce7992bed7ca8

Technical components: 
- D3 datamaps: http://datamaps.github.io/
- D3 tooltip

Dynamic colour change of the map over months of timeline (country free or occupied by the Germans):

A dynamic colour change was also made in Data Processing week 5, which can be found in my DataProcessing repository, to change the colour theme of a datamap. It can be used and adjusted to suit this project.

When the timeline is dragged, if statements can used to check if the countries were occupied at that time. After that, by looping over all countries, the right colours can be given to the country.

### Linked interactive view 2: Bar chart connected to map

Technical component: D3 barchart

The bar chart will be positioned next to the map in a div (containerBarchart)

For every country the x axis information will be saved. Onclick, this information is displayed by using a dynamic domain function.

Data used: https://en.wikipedia.org/wiki/World_War_II_casualties

### Linked interactive view 3: Sunburst connected to map and countries menu

Technical component: D3 sunburst

The sunburst will be positioned below the map. When clicked on a country, text appear at the bottom of the page "Sunburst updated". A user has to scroll down to see the sunburst with the data opened of the particular country. A arrow on the bottom of the page can be used to indicate that a user can scroll down.

Aside from listening to map clicks, the sunburst also listens to clicks on the countries menu to the left of the sunburst. This menu is made, because otherwise users would always have to scroll back to the map to be able to click on a country and update the sunburst.

Data used: https://en.wikipedia.org/wiki/List_of_battles_by_casualties

### Update function

Waits for user actions. Uses if statements to find out what the user has clicked and updates a graph accordingly.

### Data
To load data, a queue will be used. No API will be used, as all data will be downloaded first. The data will either be extracted as table format (csv), otherwise it will be copied by manually, since the datasets are not very big.

### Order of functions

- Queue data
- Load datamap
- Create timeline
- Create barchart
- Create sunburst
- Create country diagram (next to sunburst)
- Loop update function to wait for user clicks










