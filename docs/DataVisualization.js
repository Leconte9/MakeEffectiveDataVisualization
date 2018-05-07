function draw_Handedness(data) {
    "use strict";
    var svg = d3.select("#Handedness")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "635px");

    var chart = new dimple.chart(svg, data);
    var x = chart.addCategoryAxis("x", "handedness");
    x.title = "Handedness";
    x.fontSize = "15px";
    var y = chart.addMeasureAxis("y", "name");
    y.title = "Total";
    y.fontSize = "15px";
    var series = chart.addSeries(null, dimple.plot.bar);
    series.tooltipFontSize = "15px";
    chart.draw(1000);
}

function draw_BattingAverage(data) {
    "use strict";
    var svg = d3.select("#BatAve")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "635px");

    var chartType = "Batting Average - Height";

    function chartUpdate(chartType) {

        var chart = new dimple.chart(svg, data);
        var legend = chart.addLegend(150, 40, "top");
        legend.fontSize = "15px";

        if (chartType === "Batting Average - Handedness") {
            var x = chart.addCategoryAxis("x", "handedness");
            x.title = "Handedness";
            x.fontSize = "15px";
            var y = chart.addMeasureAxis("y", "avg");
            y.title = "Batting Average";
            y.fontSize = "15px";
            var series = chart.addSeries(["name", "handedness"], dimple.plot.bubble);
            series.tooltipFontSize = "15px";
        } else if (chartType === "Batting Average - Height") {
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

        var filterValues = dimple.getUniqueValues(data, "handedness");
        legend.shapes.selectAll("rect")
            .on("click", function (e) {
            var hide = false;
            var newFilters = [];
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

    chartUpdate(chartType);

    var stat = ["Batting Average - Handedness", "Batting Average - Height", "Batting Average - Weight"];

    var buttons = d3.select("#BAinstruction")
        .append("div")
        .attr("class", "nb_stat_buttons")
        .selectAll("button")
        .data(stat)
        .enter()
        .append("button")
        .text(function (d) {
            return d;
        });

    buttons.on("click", function (d) {
        d3.select(".nb_stat_buttons")
            .selectAll("button")
            .transition()
            .duration(1000)
            .style("color", "black")
            .style("background", "white");

        d3.select(this)
            .transition()
            .duration(1000)
            .style("background", "lightBlue")
            .style("color", "black");
        svg.selectAll("*").remove();
        chartUpdate(d);
    });
}

function draw_HR(data) {
    "use strict";
    var svg = d3.select("#HomeRun")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "635px");

    var chartType = "Home Runs - Height";

    function chartUpdate(chartType) {

        var chart = new dimple.chart(svg, data);
        var legend = chart.addLegend(150, 40, "top");
        legend.fontSize = "15px";

        if (chartType === "Home Runs - Handedness") {
            var x = chart.addCategoryAxis("x", "handedness");
            x.title = "Handedness";
            x.fontSize = "15px";
            var y = chart.addMeasureAxis("y", "HR");
            y.title = "Home Runs";
            y.fontSize = "15px";
            var series = chart.addSeries(["name", "handedness"], dimple.plot.bubble);
            series.tooltipFontSize = "15px";
        } else if (chartType === "Home Runs - Height") {
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

        chart.draw(1000);
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

        var filterValues = dimple.getUniqueValues(data, "handedness");

        legend.shapes.selectAll("rect")

            .on("click", function (e) {
                var hide = false;
                var newFilters = [];
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

    chartUpdate(chartType);

    var stat = ["Home Runs - Handedness", "Home Runs - Height", "Home Runs - Weight"];

    var buttons = d3.select("#HRinstruction")
        .append("div")
        .attr("class", "rb_stat_buttons")
        .selectAll("button")
        .data(stat)
        .enter()
        .append("button")
        .text(function (d) {
            return d;
        });

    buttons.on("click", function (d) {
        d3.select(".rb_stat_buttons")
            .selectAll("button")
            .transition()
            .duration(1000)
            .style("color", "black")
            .style("background", "white");

        d3.select(this)
            .transition()
            .duration(1000)
            .style("background", "lightBlue")
            .style("color", "black");
        svg.selectAll("*").remove();
        chartUpdate(d);
    });
}
