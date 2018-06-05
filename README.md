# Final Minor Project WW2

Jitse Schol

Final project of the Minor Programmeren at the University of Amsterdam

## Idea:

Second world war, timelapse of countries that were conquered and freed, by dynamic colour filling.
Focus will be on Europe. Since WWII was such an important event, it is beneficial for general knowledge to see how the war evolved over time. The target audience are historians, the regular public and schools could also use the visualisation for teaching about WWII.


## Main Features and Graphs (all MVP):

Map of Europe:
General information about countries when hovering over the country: leader, number of inhabitants, free or conquered in the war.

### Linked view 1: Map with draggable timeline

The map shows the territory changes of nazi germany and the allies in colours, in the  timeframe of 1939 until 1945.
Data used: https://en.wikipedia.org/wiki/German-occupied_Europe


### Linked view graph 2: Bar chart connected to map

Bar chart showing number of deaths in a country when clicked on that particular country in the map. It shows military deaths, total deaths, military wounded, civilian deaths.
Data used: https://en.wikipedia.org/wiki/World_War_II_casualties

### Linked view graph 3: Sunburst connected to map

When clicked on a country on the map, a text appears on the bottom of the page: "Sunburst updated". To see the sunburst, a user has to scroll down to see the sunburst graph that has opened at the particular country.
The sunburst graph can be used to show which important battles were in that country and total deaths caused by that battle.
Next to the sunburst graph, there will be a menu showing all the countries. When clicked on one of the countries, the sunburst opens at that particular country. 
Data used:  https://en.wikipedia.org/wiki/List_of_battles_by_casualties

#### Optional: 
- If there is time left in the end, other continents can be looked at.
- Scroll button at bottom of page that scrolls to sunburst diagram.
- Play button that starts the timeline from 1939 until 1945 showing the map territory changes

- Two buttons:
  German territory expansion: on click, shows the German territory expansion in colour per month.
  Allied territory takeback: on click, shows the allied territory take back in colour per month.
 

Similar visualisation: http://www.fallen.io/ww2/#

#### Challenges:
- If a country is partly conquered by the Germans, or partly freed by the allies,
  this will mean the country should also be partly coloured, this may be difficult.
- A draggable timeline may also be difficult.


Datamaps will be used for the map: http://datamaps.github.io/

D3 will be used for graphs: https://d3js.org/

Sources:

http://www.holocaustresearchproject.org/nazioccupation/

https://www.historyonthenet.com/world-war-two-statistics-data/

https://ourworldindata.org/war-and-peace

https://www.historyextra.com/period/second-world-war/the-11-most-significant-battles-of-the-second-world-war/

https://en.wikipedia.org/wiki/List_of_World_War_II_battles

Sketch:

