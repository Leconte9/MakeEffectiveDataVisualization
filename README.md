# Make Effective Data Visualization

## Summary
This project is trying to analyze a [Baseball Database](https://github.com/Leconte9/MakeEffectiveDataVisualization/blob/master/baseball_data.csv). The data set contains 1,157 baseball players including their handedness (right or left handed), height (in inches), weight (in pounds), batting average, and home runs. This visualization report is aim to show the relationship between players' physical differences compare across the performance staistics of their batting average and also home runs.

## Design
This data visualization report is aim to analyze whether player's physical difference will affect their performance or not.

First one, using Bar Plot shows an overview of all players grouped by their handedness. Bar Plot is always the best choice for comparative data. From the chart, it tells there are 737 right hand players, 316 left hand players and other 104 players using both hands. Since the data set has been changed after receiving feedbacks, it makes more sence to focus on batters while analyzing batting averages, so the original data has been modified. All the players, who are not batters, have been removed from the data set in this case. The revised chart is showing 546 right hand players, 256 left hand players and other 89 players using both hands.

The following two charts shows how players' handedness, height and weight working with their Batting Average.
From the box chart, we can tell the left handed players score a little bit better then the ones using right hand or both in Batting Average performance. Either the maximun or median of the data from left handed players are highter than the others.
However, neither height nor weight is a valid affactor for players' batting average. Players are having the samilar batting average no matter they are with 150 pounds or 220 pounds.

The last two charts will show how players' handedness, height and weight working with the number of their Home Runs.
From below box chart, the same as the batting average, we can tell the left handed players score better then the ones using right hand or both in the performance of Home Runs performance. Almost all the statistical data from left handed players are highter than the others in this case.
By choosing the different options of dataset, we can realize that height and weight affect more on the number of home runs. The height of the most best players are between 71 and 75 inches, and the weight of the most bast players are between 175 and 195 pounds.

After receiving feedbacks, the following changes were done:
 - Based on feedback #3, the order of LBR categories was changed to have the left handed players bar (L) on the left, the right handed players bar (R) on the right and both handed players bar (B) in the middle. 
 - Based on feedback #1, added the background color to highlight the buttons. 
 - Also, changed the x-axis range while the chart showing with height or weight based on the suggestion of feedback #2.
 - Remove all the players with zero batting average based on the suggestion of feedback #2.
 - Change to use box plot instead of bubble plot to show the relationship of handedness with batting average, and also of handedness with home runs.

## Feedback
### Feedback #1:
> I think your narrative makes sense. You want to show left hand players are somewhat better at both batting average and home runs. Also, I can find the players with the height between 71 and 74, and with the weight between 175 and 210 have more home runs. In my view, it would be easier to see if the background color of buttons are not white or clear.

### Feedback #2:
> It looks you are trying to show as much information as you can. I would suggest rescal your x-axis of two bubble charts to a more reasonable range. For example, within the chart of "Batting Average - Height", there is no need to show the range between 0 and 64 since all players are higher than 64 inches. Besides, while analyzing the performance of battings, the data set supposedly does not include the players who are not batters.

### Feedback #3:
> I like the interactive function within your charts, which can remove the subset grouped by handedness. My only suggestion would be reorder the columns with the L on the left, B in the middle and R on the right. 

### Feedback #4:
> Basically, your visualization design looks good. However, some charts can not tell the result clearly enough. Just like using bubble plot to show relationship between handedness and batting average. It is hard to distinguish the difference of batting averages between players. Since handedness is a kind of discrete data, box plot would be a better choice. You could add a methord of Math.random() to show the effect of jitter. This [LINK](https://www.freecodecamp.org/challenges/generate-random-whole-numbers-with-javascript) is for your reference.

## Resources
https://gist.github.com/mbostock/4061502 

http://bl.ocks.org/mbostock/4061502
 
http://dimplejs.org/examples_viewer.html?id=scatter_standard

https://www.freecodecamp.org/challenges/generate-random-whole-numbers-with-javascript
