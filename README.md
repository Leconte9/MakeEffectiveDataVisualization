# Make Effective Data Visualization

## Summary
This project is trying to analyze a [Baseball Database](https://github.com/Leconte9/MakeEffectiveDataVisualization/blob/master/baseball_data.csv). The data set containing 1,157 baseball players including their handedness (right or left handed), height (in inches), weight (in pounds), batting average, and home runs.

## Design
There are three charts in the data visualization report.

First one, using Bar Plot shows an overview of all players grouped by their handedness. Bar Plot is always the best choice for comparative data. From the chart, it tells there are 737 right hand players, 316 left hand players and other 104 players using both hands. 

The following two, using Bubble Plots show how players' handedness, height and weight working with their Batting Average or their Home Runs. Since we would not only like to display the relationship between Physical factors and their Performance, we also like to show hteir handedness all the time. Bubble Plots will be a good choice to convey three dimensions of data. 

After receiving feedbacks, the following changes were done:
 - Based on feedback #3, the order of LBR categories was changed to have the left handed players bar (L) on the left, the right handed players bar (R) on the right and both handed players bar (B) in the middle. 
 - Based on feedback #1, added the background color to highlight the buttons. 
 - Also, changed the x-axis range while the chart showing with height or weight based on the suggestion of feedback #2.
 - Remove all the players with zero batting average based on the suggestion of feedback #2.

## Feedback
### Feedback #1:
> I think your narrative makes sense. You want to show left hand players are somewhat better at both batting average and home runs. Also, I can find the players with the height between 71 and 74, and with the weight between 175 and 210 have more home runs. In my view, it would be easier to see if the background color of buttons are not white or clear.

### Feedback #2:
> It looks you are trying to show as much information as you can. I would suggest rescal your x-axis of two bubble charts to a more reasonable range. For example, within the chart of "Batting Average - Height", there is no need to show the range between 0 and 64 since all players are higher than 64 inches. Besides, while analyzing the performance of battings, the data set supposedly does not include the players who are not batters.

### Feedback #3:
> I like the interactive function within your charts, which can remove the subset grouped by handedness. My only suggestion would be reorder the columns with the L on the left, B in the middle and R on the right. 

## Resources
https://gist.github.com/mbostock/4061502
http://bl.ocks.org/mbostock/4061502
http://dimplejs.org/examples_viewer.html?id=scatter_standard
