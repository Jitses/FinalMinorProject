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
