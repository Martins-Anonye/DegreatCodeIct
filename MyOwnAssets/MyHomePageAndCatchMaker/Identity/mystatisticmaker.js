//$(document).ready(function () {
function displayClusterMetrics() {
    var metrics =
        [
            {
                name: 'Cluster capacity',
                value: 55,
                max: 64
            },
            {
                name: 'Avg. CPU %',
                value: 37,
                max: 100
            },
            {
                name: 'Storage capacity [TB]',
                value: 89.3,
                max: 256
            },
            {
                name: 'Network utilization %',
                value: 47,
                max: 100
            }
        ];
    for (var i = 0; i < metrics.length; i++) {
        var data = [];
        data.push({ text: 'Used', value: metrics[i].value }); // current
        data.push({ text: 'Available', value: metrics[i].max - metrics[i].value }); // remaining
        var settings = {
            title: metrics[i].name,
            description: '',
            enableAnimations: true,
            showLegend: false,
            showBorderLine: true,
            backgroundColor: '#FAFAFA',
            padding: { left: 5, top: 5, right: 5, bottom: 5 },
            titlePadding: { left: 5, top: 5, right: 5, bottom: 5 },
            source: data,
            showToolTips: true,
            seriesGroups:
                [
                    {
                        type: 'donut',
                        useGradientColors: false,
                        series:
                            [
                                {
                                    showLabels: true,
                                    enableSelection: true,
                                    displayText: 'text',
                                    dataField: 'value',
                                    labelRadius: 120,
                                    initialAngle: 90,
                                    radius: 60,
                                    innerRadius: 50,
                                    centerOffset: 0
                                }
                            ]
                    }
                ]
        };
        var selector = '#chartContainer' + (i + 1).toString();
        var valueText = metrics[i].value.toString();
        settings.drawBefore = function (renderer, rect) {
            sz = renderer.measureText(valueText, 0, { 'class': 'chart-inner-text' });
            renderer.text(
                valueText,
                rect.x + (rect.width - sz.width) / 2,
                rect.y + rect.height / 2,
                0,
                0,
                0,
                { 'class': 'chart-inner-text' }
            );
        }
        $(selector).jqxChart(settings);
        $(selector).jqxChart('addColorScheme', 'customColorScheme', ['#00BAFF', '#EDE6E7']);
        $(selector).jqxChart({ colorScheme: 'customColorScheme' });
    }
}
function displayServerResponseMetrics(Performance_For_Day1_Day28Array, work_class_project_For_Day1_Day28Array) {
    // LatencyThreshold is the red Horizontal Line
    var data =
        [
            // day = hour 
            // x-axis labelValue, level of the rectangle, position of the snake line (this uses text label: get request per secods) 
            /*  { Day: 1, Performance: 235, work_class_project: 2200 },
             { Day: 2, Performance: 211, work_class_project: 2300 },
             { Day: 3, Performance: 217, work_class_project: 3350 },
             { Day: 4, Performance: 213, work_class_project: 3260 },
             { Day: 5, Performance: 225, work_class_project: 3350 },
             { Day: 6, Performance: 235, work_class_project: 3400 },
             { Day: 7, Performance: 239, work_class_project: 3550 },
             { Day: 8, Performance: 255, work_class_project: 4100 },
             { Day: 9, Performance: 251, work_class_project: 4200 },
             { Day: 10, Performance: 259, work_class_project: 4500 },
             { Day: 11, Performance: 265, work_class_project: 4560 },
             { Day: 12, Performance: 257, work_class_project: 4500 },
             { Day: 13, Performance: 265, work_class_project: 4490 },
             { Day: 14, Performance: 261, work_class_project: 4400 },
             { Day: 15, Performance: 258, work_class_project: 4350 },
             { Day: 16, Performance: 257, work_class_project: 4340 },
             { Day: 17, Performance: 255, work_class_project: 4200 },
             { Day: 18, Performance: 245, work_class_project: 4050 },
             { Day: 19, Performance: 241, work_class_project: 4020 },
             { Day: 20, Performance: 239, work_class_project: 3900 },
             { Day: 21, Performance: 237, work_class_project: 3810 },
             { Day: 22, Performance: 236, work_class_project: 3720 },
             { Day: 23, Performance: 235, work_class_project: 3610 },
             { Day: 24, Performance: 239, work_class_project: 3250 },
             { Day: 25, Performance: 250, work_class_project: 2570 },
             { Day: 26, Performance: 242, work_class_project: 3720 },
             { Day: 27, Performance: 251, work_class_project: 3150 },
             { Day: 28, Performance: 245, work_class_project: 3030 }, */



            { Day: 1, Performance: Performance_For_Day1_Day28Array[0], work_class_project: work_class_project_For_Day1_Day28Array[0] },
            { Day: 2, Performance: Performance_For_Day1_Day28Array[1], work_class_project: work_class_project_For_Day1_Day28Array[1] },
            { Day: 3, Performance: Performance_For_Day1_Day28Array[2], work_class_project: work_class_project_For_Day1_Day28Array[2] },
            { Day: 4, Performance: Performance_For_Day1_Day28Array[3], work_class_project: work_class_project_For_Day1_Day28Array[3] },
            { Day: 5, Performance: Performance_For_Day1_Day28Array[4], work_class_project: work_class_project_For_Day1_Day28Array[4] },
            { Day: 6, Performance: Performance_For_Day1_Day28Array[5], work_class_project: work_class_project_For_Day1_Day28Array[5] },
            { Day: 7, Performance: Performance_For_Day1_Day28Array[6], work_class_project: work_class_project_For_Day1_Day28Array[6] },
            { Day: 8, Performance: Performance_For_Day1_Day28Array[7], work_class_project: work_class_project_For_Day1_Day28Array[7] },
            { Day: 9, Performance: Performance_For_Day1_Day28Array[8], work_class_project: work_class_project_For_Day1_Day28Array[8] },
            { Day: 10, Performance: Performance_For_Day1_Day28Array[9], work_class_project: work_class_project_For_Day1_Day28Array[9] },
            { Day: 11, Performance: Performance_For_Day1_Day28Array[10], work_class_project: work_class_project_For_Day1_Day28Array[10] },
            { Day: 12, Performance: Performance_For_Day1_Day28Array[11], work_class_project: work_class_project_For_Day1_Day28Array[11] },
            { Day: 13, Performance: Performance_For_Day1_Day28Array[12], work_class_project: work_class_project_For_Day1_Day28Array[12] },
            { Day: 14, Performance: Performance_For_Day1_Day28Array[13], work_class_project: work_class_project_For_Day1_Day28Array[13] },
            { Day: 15, Performance: Performance_For_Day1_Day28Array[14], work_class_project: work_class_project_For_Day1_Day28Array[14] },
            { Day: 16, Performance: Performance_For_Day1_Day28Array[15], work_class_project: work_class_project_For_Day1_Day28Array[15] },
            { Day: 17, Performance: Performance_For_Day1_Day28Array[16], work_class_project: work_class_project_For_Day1_Day28Array[16] },
            { Day: 18, Performance: Performance_For_Day1_Day28Array[17], work_class_project: work_class_project_For_Day1_Day28Array[17] },
            { Day: 19, Performance: Performance_For_Day1_Day28Array[18], work_class_project: work_class_project_For_Day1_Day28Array[18] },
            { Day: 20, Performance: Performance_For_Day1_Day28Array[19], work_class_project: work_class_project_For_Day1_Day28Array[19] },
            { Day: 21, Performance: Performance_For_Day1_Day28Array[20], work_class_project: work_class_project_For_Day1_Day28Array[20] },
            { Day: 22, Performance: Performance_For_Day1_Day28Array[21], work_class_project: work_class_project_For_Day1_Day28Array[21] },
            { Day: 23, Performance: Performance_For_Day1_Day28Array[22], work_class_project: work_class_project_For_Day1_Day28Array[22] },
            { Day: 24, Performance: Performance_For_Day1_Day28Array[23], work_class_project: work_class_project_For_Day1_Day28Array[23] },
            { Day: 25, Performance: Performance_For_Day1_Day28Array[24], work_class_project: work_class_project_For_Day1_Day28Array[24] },
            { Day: 26, Performance: Performance_For_Day1_Day28Array[25], work_class_project: work_class_project_For_Day1_Day28Array[25] },
            { Day: 27, Performance: Performance_For_Day1_Day28Array[26], work_class_project: work_class_project_For_Day1_Day28Array[26] },
            { Day: 28, Performance: Performance_For_Day1_Day28Array[27], work_class_project: work_class_project_For_Day1_Day28Array[27] }




        ];
    var latencyThreshold = 260; // maximum performace
    var settings = {
        title: 'Daily Performance on Project and Work Force during studies',
        description: '(Aggregated values for the last 28days in last previous month)',
        enableAnimations: true,
        showLegend: false,//hide and show toggle botton
        showBorderLine: true,
        backgroundColor: '#FAFAFA',
        padding: { left: 5, top: 5, right: 5, bottom: 5 },
        titlePadding: { left: 5, top: 5, right: 5, bottom: 5 },
        source: data,
        xAxis:
        {
            dataField: 'Day',
            displayText: 'Day',
        },
        seriesGroups:
            [
                {
                    type: 'column',
                    valueAxis:
                    {
                        title: { text: 'Performance Latency (Threshold) [ms]<br>' },
                        position: 'left'
                    },
                    toolTipFormatSettings: { sufix: 'ms' },
                    series:
                        [
                            {
                                dataField: 'Performance',
                                displayText: 'Performance Latency',
                                colorFunction: function (value, itemIndex, serie, group) {
                                    return (value > latencyThreshold) ? 'darkred' : 'black';// color of the bar_or_rectangle , by default it is  ,#CC1133  and blue, that is red and blue
                                }
                            }
                        ],
                    bands:
                        [
                            {
                                minValue: latencyThreshold,
                                maxValue: latencyThreshold,
                                lineWidth: 1, // line-size of the threshold
                                color: 'red' //color of horizontal line of threshold
                            }
                        ]
                },
                {
                    type: 'spline',
                    valueAxis:
                    {
                        title: { text: 'Work Force per Day (Kg) and Effort' },
                        position: 'right'
                    },
                    toolTipFormatSettings: { sufix: ' Kg' },
                    series:
                        [
                            {
                                dataField: 'work_class_project',
                                displayText: 'Work Level or Effort',
                                lineColor: 'orange',
                                lineWidth: 2 //  line-size of the Frequency thread line_or_snakeLine
                            }
                        ]
                },
            ]
    };
    $(chartContainer5).jqxChart(settings);
}
// displayClusterMetrics();
// displayServerResponseMetrics();
//});


export { displayClusterMetrics, displayServerResponseMetrics };