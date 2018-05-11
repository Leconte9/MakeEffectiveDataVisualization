// to show the number of players grouped by handedness
function draw_Handedness(data) {
    "use strict";
    // div with id="Handedness" displayed
    // define the boundary
    var svg = d3.select("#Handedness")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "635px");

    var chart = new dimple.chart(svg, data);

    // define x-axis and y-axis variable, title, order rule and font size
    var x = chart.addCategoryAxis("x", "handedness");
    x.title = "Handedness";
    x.addOrderRule(["L", "B", "R"]);
    x.fontSize = "15px";
    var y = chart.addMeasureAxis("y", "name");
    y.title = "Total";
    y.fontSize = "15px";
    var series = chart.addSeries(null, dimple.plot.bar);
    series.tooltipFontSize = "15px";
    chart.draw(1000);
}

// to show the relationship between Batting Average and Handedness with box plot
function draw_AvgVSHandedness() {
    "use strict"
    var x = 'handedness';
    var y = 'avg';

    var d3 = Plotly.d3;
    var gd3 = d3.select("#AvgVSHandedness")
                .append("svg")
                .attr("width", "100%")
                .attr("height", "635");

    function makeplot() {
        Plotly.d3.csv('baseball_data_2.csv', function(data){ processData(data, x, y)})
    }

    function processData(allRows,xLabel,yLabel) {

        var y1 = [], y2 = [], y3 = [];

        for (var i = 0; i < allRows.length; i++) {
            var row = allRows[i];
            if (row['handedness'] === 'L') {
              y1.push(+row[y]);
            } else if (row['handedness'] === 'B') {
              y2.push(+row[y]);
            } else if (row['handedness'] === 'R') {
              y3.push(+row[y]);
            }
        }
        makePlotly(y1, y2, y3);

    }
    function makePlotly(y1, y2, y3) {
        var Left = {
            y: y1,
            name: 'Left',
            type: 'box'
        };

        var Both = {
            y: y2,
            name: 'Both',
            type: 'box'
        };
        var Right = {
            y: y3,
            name: 'Right',
            type: 'box'
        };
        var layout = {
            height: 635,
            weight: 800,
            title: 'Batting Average VS Handedness',
            yaxis: {
                range: [0.05,0.35],
                title: 'Batting Average',
                zeroline: false
            },
            boxmode: 'group'
        };
        console.log(y1)

        var data = [Left, Both, Right];

        Plotly.newPlot('AvgVSHandedness', data, layout);
    }
    makeplot();
}
draw_AvgVSHandedness();

// Draw the relationship between Batting Average and Players' Height and Weight
function draw_BattingAverage(data) {
    "use strict";
    // Define chart boundary
    var svg = d3.select("#BatAve")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "635px");

    // Define initial visualization of the chart
    var chartType = "Batting Average - Height";

    function chartUpdate(chartType) {

        var chart = new dimple.chart(svg, data);

        // Define legend of the chart
        var legend = chart.addLegend(150, 40, "top");
        legend.fontSize = "15px";

        // Update when chart is updated by clicking the button
        if (chartType === "Batting Average - Height") {
            var x = chart.addMeasureAxis("x", "height");
            x.overrideMin = 64
            x.title = "Height (inches)";
            x.fontSize = "14px";
            var y = chart.addMeasureAxis("y", "avg");
            y.title = "Batting Average";
            y.fontSize = "15px";
            var series = chart.addSeries(["name", "handedness"], dimple.plot.bubble);
            series.aggregate = dimple.aggregateMethod.avg;
            series.tooltipFontSize = "15px";
        } else if (chartType === "Batting Average - Weight") {
            var x = chart.addMeasureAxis("x", "weight");
            x.overrideMin = 130
            x.title = "Average Weight (pounds)";
            x.fontSize = "14px";
            var y = chart.addMeasureAxis("y", "avg");
            y.title = "Batting Average";
            y.fontSize = "15px";
            var series = chart.addSeries(["name", "handedness"], dimple.plot.bubble);
            series.aggregate = dimple.aggregateMethod.avg;
            series.tooltipFontSize = "15px";
        }

        chart.draw(1000);

        // Draw legends independently
        chart.legends = [];
        
        svg.selectAll("title_text")
            .data(["Click legend to show/hide handedness:"])
            .enter()
            .append("text")
            .attr("x", 100)
            .attr("y", function (d, i) {
                return 30 + i * 14;
            })
            .style("font-family", "sans-serif")
            .style("font-size", "15px")
            .style("color", "Black")
            .text(function (d) {
                return d;
            });

        // get a unique list when filtering
        var filterValues = dimple.getUniqueValues(data, "handedness");
        // get all rectangles from legend
        legend.shapes.selectAll("rect")
            // add a click event to each rectangle
            .on("click", function (e) {
            // indicates whether the item is visible or not
            var hide = false;
            var newFilters = [];
            // if the filters contain the clicked shape, then hide it
            filterValues.forEach(function (f) {
                if (f === e.aggField.slice(-1)[0]) {
                    hide = true;
                } else {
                    newFilters.push(f);
                }
            });
            // Hide or show the shape
            if (hide) {
              d3.select(this).style("opacity", 0.2);
            } else {
              newFilters.push(e.aggField.slice(-1)[0]);
              d3.select(this).style("opacity", 0.8);
            }
            // Update the filters
            filterValues = newFilters;
            // Filter the data
            chart.data = dimple.filterData(data, "handedness", filterValues);
            // Passing a duration parameter makes the chart animate.
            // There will be no transtion without it.
            chart.draw(1000);
            });
    }

    // Call chart update function for hte first plot
    chartUpdate(chartType);

    // Define options for buttons
    var stat = ["Batting Average - Height", "Batting Average - Weight"];

    // Define buttons
    var buttons = d3.select("#BAinstruction")
        .append("div")
        .attr("class", "nb_stat_buttons")
        .selectAll("button")
        .data(stat)
        .enter()
        .append("button")
        .style("font-family", "sans-serif")
        .style("font-size", "15px")
        .style("background", "#E1F9FF")
        .text(function (d) {
            return d;
        });

    // Define button click behavior and chart update sequence by first removing the previous plot
    // and then updating with the new plot
    buttons.on("click", function (d) {
        d3.select(".nb_stat_buttons")
            .selectAll("button")
            .transition()
            .duration(1000)
            .style("color", "black")
            .style("background", "#E1F9FF");

        d3.select(this)
            .transition()
            .duration(1000)
            .style("background", "lightBlue")
            .style("color", "black");
        svg.selectAll("*").remove();
        chartUpdate(d);
    });
}

// Draw the relationship between Home Runs and Handedness
function draw_HRVSHandedness() {
    "use strict"
    var x = 'handedness';
    var y = 'HR';

    var d3 = Plotly.d3;

    var gd3 = d3.select("#HRVSHandedness")
                .append("svg")
                .attr("width", "100%")
                .attr("height", "635");

    function makeplot() {
        Plotly.d3.csv('baseball_data_2.csv', function(data){ processData(data, x, y)})
    }

    function processData(allRows,xLabel,yLabel) {

        var x1 = [], y1 = [], x2 = [], y2 = [], x3 = [], y3 = [];

        for (var i = 0; i < allRows.length; i++) {
            var row = allRows[i];
            if (row['handedness'] === 'L') {
              y1.push(+row[y]);
            } else if (row['handedness'] === 'B') {
              y2.push(+row[y]);
            } else if (row['handedness'] === 'R') {
              y3.push(+row[y]);
            }
        }
        makePlotly(y1, y2, y3);

    }
    function makePlotly(y1, y2, y3) {
        var Left = {
            y: y1,
            name: 'Left',
            type: 'box'
        };
        var Both = {
            y: y2,
            name: 'Both',
            type: 'box'
        };
        var Right = {
            y: y3,
            name: 'Right',
            type: 'box'
        };
        var layout = {
            height: 635,
            weight: 800,
            title: 'Home Runs VS Handedness',
            yaxis: {
                range: [0,300],
                title: 'Home Runs',
                zeroline: false
            },
            boxmode: 'group'
        };
        console.log(y1)

        var data = [Left, Both, Right];

        Plotly.newPlot('HRVSHandedness', data, layout);
    }
    makeplot();
}
draw_HRVSHandedness();

// Draw the relationship between Home Runs and Players' Height and Weight
function draw_HR(data) {
    "use strict";
    // Define chart boundary
    var svg = d3.select("#HomeRun")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "635px");

    // Define initial visualization of the chart
    var chartType = "Home Runs - Height";

    function chartUpdate(chartType) {

        var chart = new dimple.chart(svg, data);

        // Define legend of the chart
        var legend = chart.addLegend(150, 40, "top");
        legend.fontSize = "15px";

        // Update when chart is updated by clicking the button
        if (chartType === "Home Runs - Height") {
            var x = chart.addMeasureAxis("x", "height");
            x.overrideMin = 64
            x.title = "Height (inches)";
            x.fontSize = "14px";
            var y = chart.addMeasureAxis("y", "HR");
            y.title = "Home Runs";
            y.fontSize = "15px";
            var series = chart.addSeries(["name", "handedness"], dimple.plot.bubble);
            series.aggregate = dimple.aggregateMethod.avg;
            series.tooltipFontSize = "15px";
        } else if (chartType === "Home Runs - Weight") {
            var x = chart.addMeasureAxis("x", "weight");
            x.overrideMin = 130
            x.title = "Average Weight (pounds)";
            x.fontSize = "14px";
            var y = chart.addMeasureAxis("y", "HR");
            y.title = "Home Runs";
            y.fontSize = "15px";
            var series = chart.addSeries(["name", "handedness"], dimple.plot.bubble);
            series.aggregate = dimple.aggregateMethod.avg;
            series.tooltipFontSize = "15px";
        }

        // Passing a duration parameter makes the chart animate.
        // There will be no transtion without it.
        chart.draw(1000);

        // Draw legends independently
        chart.legends = [];

        svg.selectAll("title_text")
            .data(["Click legend to hide handedness:"])
            .enter()
            .append("text")
            .attr("x", 100)
            .attr("y", function (d, i) {
                return 30 + i * 14;
            })
            .style("font-family", "sans-serif")
            .style("font-size", "15px")
            .style("color", "Black")
            .text(function (d) {
                return d;
            });
        // get a unique list when filtering
        var filterValues = dimple.getUniqueValues(data, "handedness");
        // get all rectangles from legend
        legend.shapes.selectAll("rect")
            // add a click event to each rectangle
            .on("click", function (e) {
            // indicates whether the item is visible or not
            var hide = false;
            var newFilters = [];
            // if the filters contain the clicked shape, then hide it
            filterValues.forEach(function (f) {
                if (f === e.aggField.slice(-1)[0]) {
                    hide = true;
                } else {
                    newFilters.push(f);
                }
            });

            if (hide) {
              d3.select(this).style("opacity", 0.2);
            } else {
              newFilters.push(e.aggField.slice(-1)[0]);
              d3.select(this).style("opacity", 0.8);
            }
            
            filterValues = newFilters;
            
            chart.data = dimple.filterData(data, "handedness", filterValues);
            
            chart.draw(1000);
        });
    }
    // Call chart update function for hte first plot
    chartUpdate(chartType);

    // Define options for buttons
    var stat = ["Home Runs - Height", "Home Runs - Weight"];

    // Define buttons
    var buttons = d3.select("#HRinstruction")
        .append("div")
        .attr("class", "rb_stat_buttons")
        .selectAll("button")
        .data(stat)
        .enter()
        .append("button")
        .style("font-family", "sans-serif")
        .style("font-size", "15px")
        .style("background", "#E1F9FF")
        .text(function (d) {
            return d;
        });

    // Define button click behavior and chart update sequence by first removing the previous plot
    // and then updating with the new plot
    buttons.on("click", function (d) {
        d3.select(".rb_stat_buttons")
            .selectAll("button")
            .transition()
            .duration(1000)
            .style("color", "black")
            .style("background", "#E1F9FF");

        d3.select(this)
            .transition()
            .duration(1000)
            .style("background", "lightBlue")
            .style("color", "black");
        svg.selectAll("*").remove();
        chartUpdate(d);
    });
}