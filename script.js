var TITLE = document.getElementById('selectedItem').value;

// x-axis label and label in tooltip
var X_AXIS = 'Date';

// y-axis label and label in tooltip
var Y_AXIS = 'Price';

// Should y-axis start from 0? `true` or `false`
var BEGIN_AT_ZERO = false;

// `true` to show the grid, `false` to hide
var SHOW_GRID = true;

 // `true` to show the legend, `false` to hide
var SHOW_LEGEND = true;

var myVar = document.getElementById('selectedItem').value;

var myChart = null;

function updateChart() {

    $.get('./data.csv', {'_': $.now()}, function(csvString) {

        var myVar = document.getElementById('selectedItem').value;
        TITLE = myVar;
        var data = Papa.parse(csvString).data;
        var dates = dates = data.slice(1).map(function(row) { return row[1]; });
        var timeLabels = data.slice(1).map(function(row) { return row[1]; });
        var uniqueTimeLabels = [...new Set(timeLabels)];
        var itemName = data.slice(1).map(function(row) { return row[0]; });
        var setItemName = myVar;
        var priceSet = [];
        var priceSet10 = [];
        var priceSet100 = [];

        for (var i = 1; i < data.length; i++) {
            if(data[i][0] === setItemName) {
                priceSet.push(data[i][2])
            }
        }
        for (var i = 1; i < data.length; i++) {
            if(data[i][0] === setItemName) {
                priceSet10.push(data[i][3])
            }
        }
        for (var i = 1; i < data.length; i++) {
            if(data[i][0] === setItemName) {
                priceSet100.push(data[i][4])
            }
        }
        console.log(priceSet)
        var datasets = [];
        console.log(data.slice(1).map(function(row) {return row[2]}))
          datasets.push(
            {
              label: "Price x 1", // column name
              data: priceSet, // data in that column
              fill: false // `true` for area charts, `false` for regular line charts
            }
          )
          datasets.push(
              {
                label: "Price x 10", // column name
                data: priceSet10, // data in that column
                fill: false // `true` for area charts, `false` for regular line charts
              }
          )
          datasets.push(
              {
                label: "Price x 100", // column name
                data: priceSet100, // data in that column
                fill: false // `true` for area charts, `false` for regular line charts
              }
          )

        console.log(data)
        // Get container for the chart
        var ctx = document.getElementById('chart-container').getContext('2d');
        if(myChart != null){
            myChart.destroy();
        }
        myChart = new Chart(ctx, {
          type: 'line',

          data: {
            labels: uniqueTimeLabels,
            datasets: datasets,
          },

          options: {
            title: {
              display: true,
              text: TITLE,
              fontSize: 14,
            },
            legend: {
              display: SHOW_LEGEND,
            },
            maintainAspectRatio: false,
            scales: {
              xAxes: [{
                scaleLabel: {
                  display: X_AXIS !== '',
                  labelString: X_AXIS
                },
                gridLines: {
                  display: SHOW_GRID,
                },
                ticks: {
                  maxTicksLimit: 10,
                  callback: function(value, index, values) {
                    return value.toLocaleString();
                  }
                }
              }],
              yAxes: [{
                stacked: false, // `true` for stacked area chart, `false` otherwise
                beginAtZero: true,
                scaleLabel: {
                  display: Y_AXIS !== '',
                  labelString: Y_AXIS
                },
                gridLines: {
                  display: SHOW_GRID,
                },
                ticks: {
                  maxTicksLimit: 10,
                  beginAtZero: BEGIN_AT_ZERO,
                  callback: function(value, index, values) {
                    return value.toLocaleString()
                  }
                }
              }]
            },
            tooltips: {
              displayColors: false,
              callbacks: {
                label: function(tooltipItem, all) {
                  return all.datasets[tooltipItem.datasetIndex].label
                    + ': ' + tooltipItem.yLabel.toLocaleString();
                }
              }
            },
            plugins: {
              colorschemes: {
                /*
                  Replace below with any other scheme from
                  https://nagix.github.io/chartjs-plugin-colorschemes/colorchart.html
                */
                scheme: 'brewer.DarkTwo5'
              }
            }
          }
        });

      });

}

$('#selectedItem').on('change', updateChart)
 updateChart();


$(document).ready(function() {

    var select = document.getElementById("selectedItem");
    d3.csv("./data.csv", function(data) {
    var itemNameList = []
    for(var i = 0; i < data.length; i++) {
        itemNameList.push(data[i].itemName)
    }
    console.log(itemNameList)
        var uniqueItemNames = [...new Set(itemNameList)];
        console.log(uniqueItemNames)
        for(var i = 0; i < uniqueItemNames.length; i++) {
            var opt = uniqueItemNames[i];
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            select.appendChild(el);
        }
    });

    updateChart();

});
