# 7-6-2018
- Made a bar chart, works fine with every country's data, which was already jsonified
- Made a map of Europe
- Made a dragable bar that changes the colour of all countries on the map

# 8-6-2018
- Presented my prototype today
- Discussed the problem that when a country is partly occupied, how I will show this on the map.
  Solution: another colour or stripes in country than when it is fully taken over by the Germans.
- Worked on the linked interaction between my map and bar chart. Does not work optimally yet.

# 11-6-2018
- Retrieved a dataset from Wikipedia of when countries were invaded, surrendered and liberated.
- Put this dataset in JSON format by hand/manually.
- Asked Sascha how I should use the data structure with the draggable timeline,
to show the right colours on the map. Got to a solution to use a custom labelled monthly timeline.
The timeline will return a date when dragged. The dates are monthly, so for 1939-1945 there are 72 months/datapoints. When the date is returned, a for loop will use this date to check whether a country has been liberated, surrendered or invaded and give the country the right colour.
- Interaction between bar chart and map works well now. The bar chart needs some small adjustments: x axis labels and the height is not optimal (sometimes the top corner numbers are on the border of the container, so not completely visible).

# 12-6-2018
- Today I worked on the colouring of the map (connected to the draggable slider).
The slider + map colouring does not work optimally, in a sense that it only works well when
the slider is moved slowly. I talked to Sascha about this. We agreed that it would be better
to instead make a play button, that when clicked, colours the map automatically over time
(monthly, 1939-1945) and shows which month it is at when playing.

# 13-6-2018
- Worked on the play button today. Built a play/pause button that can play and pause the timeframe 1939-1945.
When the timeframe is played, the map shows the colours of the German territory expansion and the allied takeback.
- I also added a scroll button. When clicked, the page will scroll down to where the sunburst will be.
- I will have to make a legend for the map, to show what each colour means.
Furthermore I have to fix the bar chart bug. Sometimes half of the top number on the y axis disappears.
- Furthermore, I want to start working on organizing the data of the sunburst.

# 14-6-2018
- Tried to organize the data for the sunburst. The wikipedia source is not useable, even not with a scraper.
Therefore I will use https://www.thoughtco.com/world-war-ii-battles-2361453. It has an less extensive list of battles, compared to wikipedia.
However, the data is easier to retrieve. The data will be retrieved manually (started today already) and organized manually.
- I also looked at a sunburst tutorial today. I have much more insight now in how it works.

# 15-6-2018
- Presented today.
- Afterwards organized my Github repository.
- Fixed a map bug.
- Changed layout coloring of bar chart.

# 18-6-2018
- Worked on the sunburst today
- Organized all the battle data
- Made the sunburst
- Made the bootstrap menu that changes the sunburst accordingly

# 19-6-2018
- Made a legend for the map
- Fixed sunburst scrolling bug

# 20-6-2018
- Made bar chart x axis labels
- When clicked on sunburst, menu on side shows clicked element
- Added texts to explain visualizations
- Added sources to the webpage

# 22-6-2018
- Presented today
- Made design notes on what to do:
  Make bar chart text white
  Maybe an extra menu for battles
  Hovering over countries on map should only change border color
  Bar chart, military wounded as the first bar
  Github repository: .md in capital letters and javascript and python not in the same folder
