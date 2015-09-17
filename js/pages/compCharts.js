/*
 *  Document   : compCharts.js
 *  Author     : pixelcave
 *  Description: Custom javascript code used in Charts page
 */

var CompCharts = function() {

    return {
        init: function() {
            /* Mini Bar/Line Charts with jquery.sparkline plugin, for more examples you can check out http://omnipotent.net/jquery.sparkline/#s-about */
            var miniChartBarOptions = {
                type: 'bar',
                barWidth: 6,
                barSpacing: 5,
                height: '50px',
                tooltipOffsetX: -25,
                tooltipOffsetY: 20,
                barColor: '#9b59b6',
                tooltipPrefix: '',
                tooltipSuffix: ' Projects',
                tooltipFormat: '{{prefix}}{{value}}{{suffix}}'
            };
            $('#mini-chart-bar1').sparkline('html', miniChartBarOptions);

            miniChartBarOptions['barColor'] = '#2ecc71';
            miniChartBarOptions['tooltipPrefix'] = '$ ';
            miniChartBarOptions['tooltipSuffix'] = '';
            $('#mini-chart-bar2').sparkline('html', miniChartBarOptions);

            miniChartBarOptions['barColor'] = '#1bbae1';
            miniChartBarOptions['tooltipPrefix'] = '';
            miniChartBarOptions['tooltipSuffix'] = ' Updates';
            $('#mini-chart-bar3').sparkline('html', miniChartBarOptions);

            var miniChartLineOptions = {
                type: 'line',
                width: '80px',
                height: '50px',
                tooltipOffsetX: -25,
                tooltipOffsetY: 20,
                lineColor: '#c0392b',
                fillColor: '#e74c3c',
                spotColor: '#555555',
                minSpotColor: '#555555',
                maxSpotColor: '#555555',
                highlightSpotColor: '#555555',
                highlightLineColor: '#555555',
                spotRadius: 3,
                tooltipPrefix: '',
                tooltipSuffix: ' Projects',
                tooltipFormat: '{{prefix}}{{y}}{{suffix}}'
            };
            $('#mini-chart-line1').sparkline('html', miniChartLineOptions);

            miniChartLineOptions['lineColor'] = '#16a085';
            miniChartLineOptions['fillColor'] = '#1abc9c';
            miniChartLineOptions['tooltipPrefix'] = '$ ';
            miniChartLineOptions['tooltipSuffix'] = '';
            $('#mini-chart-line2').sparkline('html', miniChartLineOptions);

            miniChartLineOptions['lineColor'] = '#7f8c8d';
            miniChartLineOptions['fillColor'] = '#95a5a6';
            miniChartLineOptions['tooltipPrefix'] = '';
            miniChartLineOptions['tooltipSuffix'] = ' Updates';
            $('#mini-chart-line3').sparkline('html', miniChartLineOptions);

            // Randomize easy pie charts values
            var random;

            $('.toggle-pies').click(function() {
                $('.pie-chart').each(function() {
                    random = getRandomInt(1, 100);
                    $(this).data('easyPieChart').update(random);
                    $(this).find('span').text(random + '%');
                });
            });

            // Get random number function from a given range
            function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            /*
             * Flot Jquery plugin is used for charts
             *
             * For more examples or getting extra plugins you can check http://www.flotcharts.org/
             * Plugins included in this template: pie, resize, stack, time
             */

            // Get the elements where we will attach the charts
            var chartClassic = $('#chart-classic');
            var chartStacked = $('#chart-stacked');
            var chartLive = $('#chart-live');
            var chartBars = $('#chart-bars');
            var chartPie = $('#chart-pie');

            // Random data for the charts
            var dataWorkouts = [[1, 15], [2, 16], [3, 13], [4, 19], [5, 18], [6, 24], [7, 21], [8, 25], [9, 33], [10, 39], [11, 42], [12, 45];
            var dataClients = [[1, 5], [2, 4], [3, 4], [4, 3], [5, 6], [6, 8], [7, 11], [8, 95], [9, 12], [10, 13], [11, 10], [12, 17]];
            var dataClients2 = [[1, 1], [3, 2], [5, 2], [7, 3], [9, 4], [11, 3], [13, 4], [15, 6], [17, 5], [19, 8], [21, 11]];

            // Array with month labels used in Classic and Stacked chart
            var chartMonths = [[1, 'Jan'], [2, 'Feb'], [3, 'Mar'], [4, 'Apr'], [5, 'May'], [6, 'Jun'], [7, 'Jul'], [8, 'Aug'], [9, 'Sep'], [10, 'Oct'], [11, 'Nov'], [12, 'Dec']];

            // Classic Chart
            $.plot(chartClassic,
                [
                    {
                        label: 'Workouts',
                        data: dataWorkouts,
                        lines: {show: true, fill: true, fillColor: {colors: [{opacity: 0.25}, {opacity: 0.25}]}},
                        points: {show: true, radius: 6}
                    },
                    {
                        label: 'Clients',
                        data: dataClients,
                        lines: {show: true, fill: true, fillColor: {colors: [{opacity: 0.15}, {opacity: 0.15}]}},
                        points: {show: true, radius: 6}
                    }
                ],
                {
                    colors: ['#3498db', '#333333'],
                    legend: {show: true, position: 'nw', margin: [15, 10]},
                    grid: {borderWidth: 0, hoverable: true, clickable: true},
                    yaxis: {ticks: 4, tickColor: '#eeeeee'},
                    xaxis: {ticks: chartMonths, tickColor: '#ffffff'}
                }
            );

            // Creating and attaching a tooltip to the classic chart
            var previousPoint = null, ttlabel = null;
            chartClassic.bind('plothover', function(event, pos, item) {

                if (item) {
                    if (previousPoint !== item.dataIndex) {
                        previousPoint = item.dataIndex;

                        $('#chart-tooltip').remove();
                        var x = item.datapoint[0], y = item.datapoint[1];

                        if (item.seriesIndex === 1) {
                            ttlabel = '<strong>' + y + '</strong> sales';
                        } else {
                            ttlabel = '$ <strong>' + y + '</strong>';
                        }

                        $('<div id="chart-tooltip" class="chart-tooltip">' + ttlabel + '</div>')
                            .css({top: item.pageY - 45, left: item.pageX + 5}).appendTo("body").show();
                    }
                }
                else {
                    $('#chart-tooltip').remove();
                    previousPoint = null;
                }
            });

            // Bars Chart
            $.plot(chartBars,
                [
                    {
                        label: 'Sales',
                        data: dataSales2,
                        bars: {show: true, lineWidth: 0, fillColor: {colors: [{opacity: 0.5}, {opacity: 0.5}]}}
                    }
                ],
                {
                    colors: ['#9b59b6'],
                    legend: {show: true, position: 'nw', margin: [15, 10]},
                    grid: {borderWidth: 0},
                    yaxis: {ticks: 4, tickColor: '#eeeeee'},
                    xaxis: {ticks: 10, tickColor: '#ffffff'}
                }
            );

            // Live Chart
            var dataLive = [];

            // Random data generator
            function getRandomData() {

                if (dataLive.length > 0)
                    dataLive = dataLive.slice(1);

                while (dataLive.length < 300) {
                    var prev = dataLive.length > 0 ? dataLive[dataLive.length - 1] : 50;
                    var y = prev + Math.random() * 10 - 5;
                    if (y < 0)
                        y = 0;
                    if (y > 100)
                        y = 100;
                    dataLive.push(y);
                }

                var res = [];
                for (var i = 0; i < dataLive.length; ++i)
                    res.push([i, dataLive[i]]);

                // Show live chart info
                $('#chart-live-info').html(y.toFixed(0) + '%');

                return res;
            }

            // Update live chart
            function updateChartLive() {
                chartLive.setData([getRandomData()]);
                chartLive.draw();
                setTimeout(updateChartLive, 60);
            }

            // Initialize live chart
            var chartLive = $.plot(chartLive,
                [{data: getRandomData()}],
            {
                series: {shadowSize: 0},
                lines: {show: true, lineWidth: 1, fill: true, fillColor: {colors: [{opacity: 0.2}, {opacity: 0.2}]}},
                colors: ['#34495e'],
                grid: {borderWidth: 0, color: '#aaaaaa'},
                yaxis: {show: true, min: 0, max: 110},
                xaxis: {show: false}
            }
            );

            // Start getting new data
            updateChartLive();

            // Pie Chart
            $.plot(chartPie,
                [
                    {label: 'Support', data: 20},
                    {label: 'Earnings', data: 45},
                    {label: 'Sales', data: 35}
                ],
                {
                    colors: ['#333333', '#1abc9c', '#16a085'],
                    legend: {show: false},
                    series: {
                        pie: {
                            show: true,
                            radius: 1,
                            label: {
                                show: true,
                                radius: 3 / 4,
                                formatter: function(label, pieSeries) {
                                    return '<div class="chart-pie-label">' + label + '<br>' + Math.round(pieSeries.percent) + '%</div>';
                                },
                                background: {opacity: 0.75, color: '#000000'}
                            }
                        }
                    }
                }
            );

            // Stacked Chart
            $.plot(chartStacked,
                [{label: 'Sales', data: dataSales}, {label: 'Earnings', data: dataEarnings}],
                {
                    colors: ['#f1c40f', '#f39c12'],
                    series: {stack: true, lines: {show: true, fill: true}},
                    lines: {show: true, lineWidth: 0, fill: true, fillColor: {colors: [{opacity: 0.75}, {opacity: 0.75}]}},
                    legend: {show: true, position: 'nw', margin: [15, 10], sorted: true},
                    grid: {borderWidth: 0},
                    yaxis: {ticks: 4, tickColor: '#eeeeee'},
                    xaxis: {ticks: chartMonths, tickColor: '#ffffff'}
                }
            );
        }
    };
}();