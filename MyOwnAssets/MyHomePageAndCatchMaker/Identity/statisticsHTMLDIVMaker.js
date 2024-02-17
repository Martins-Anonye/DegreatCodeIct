
var mystatisticsDiv = `<div class="dposit_stat" style="display:inline-block; width:80%">
    <h2><span  class="username"> </span> Statistics</h2>

    <table cellpadding="0" cellspacing="0">
        <tr style="display: none;">
            <td>
                <div id='chartContainer1' style="width: 400px; height: 180px;"></div>
            </td>
            <td>
                <div id='chartContainer2' style="width: 400px; height: 180px;"></div>
            </td>
        </tr>
        <tr style="display: none;">
            <td>
                <div id='chartContainer3' style="width: 400px; height: 180px;"></div>
            </td>
            <td>
                <div id='chartContainer4' style="width: 400px; height: 180px;"></div>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <div id='chartContainer5' style="width: 800px; height: 300px;"></div>
            </td>
        </tr>
    </table>


</div>`;


var statistics = document.getElementsByClassName('statistics')[0];
statistics.innerHTML = mystatisticsDiv;