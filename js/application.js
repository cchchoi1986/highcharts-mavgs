

$(document).ready(function(){
  // data is an array
  var dataWeek = [];
  var dataMonth = [];
  var dataQuarter =[];
  var dataAnnual = [];
  var dMyo = [];
  // var dataLondon = [];
  // var urlHK = 'http://api.openweathermap.org/data/2.5/history/city?q=HongKong&type=hour';
  // var urlLondon = 'http://api.openweathermap.org/data/2.5/history/city?q=London&type=hour';
    var index = 0;
    var lastData = [];
  {//list of countries
  //   var countries = [
  //     {
  //       name: 'Gasoline Prices',
  //       url: 'https://www.quandl.com/api/v1/datasets/BTS_MM/RETAILGAS.json?trim_start=1995-01-02&trim_end=2012-10-15&auth_token=E6kNzExHjay2DNP8pKvB'
  //     },
  //   ]
  }
  

  {  //ajax get data request
    var grabData = function(dataW, dataM, dataA){
      $.ajax({
        type: 'GET',
        url: 'https://www.quandl.com/api/v1/datasets/BTS_MM/RETAILGAS.json?trim_start=1995-01-02&trim_end=2012-10-15&auth_token=E6kNzExHjay2DNP8pKvB',
        datatype: 'JSON',
        success: function(response){
          // getting 1 temperature
          // console.log(response.data[i][0]);
          // console.log(response.data[i][1]);
          
          // var sData = []

          // loop to getting all temperatures
          $(response.data).each(function(){
          //   console.log(this[0]);
          //   console.log(this[1]);
          // });

        //   // collecting each data point
            var dataPoint = {};
            dataPoint.y = this[1];
            dataPoint.x = new Date(this[0]);
            // add each datapoint to data array
            dataW.push(dataPoint);

          });
          dataW = dataW.reverse();
          // console.log(dataW[30]);
          
          var getPointY = function(inputY,index,weeks){
            var yPtotal = 0;
            var j= 0;
            // console.log(inputY[index].y);
            while (j < weeks) {
              yPtotal+=inputY[index+j].y;
              j++;
            }
            yPtotal = yPtotal/weeks;
            return yPtotal;
            // console.log(yPtotal);
          }

          var calcSMA = function(input,weeks,output){
            var i =0;
            while (i+weeks < input.length){
              var xPoint = {};
              xPoint.y = getPointY(input,i,weeks);
              xPoint.x = input[i+(weeks-1)].x;
              output.push(xPoint);
              i++;
            };
          };
          calcSMA(dataW,4,dataMonth);
          calcSMA(dataW,13,dataQuarter);
          calcSMA(dataW,52,dataAnnual);


          // var i=0;
          // while ((i+4) < dataW.length){
          //   mPoint = {};
          //   mPoint.y = (dataW[i].y+dataW[i+1].y+dataW[i+2].y+dataW[i+3].y)/4;
          //   mPoint.x = dataW[i+3].x;
          //   dataM.push(mPoint);
          //   i++;
          // }
          // console.log(dataM[30]);


          // // print out data;
          // console.log(data);
          initializeHighChart();
          // index++;

          // if (index >= countries.length){
          //   initializeHighChart();
          // }
          
        },
        error: function(){
          alert("couldn't hit me bro!");
        }
      });
    }
  }
  {
    // for (i in countries){
    //   grabData(countries[i].name,countries[i].url);
    // }
    grabData(dataWeek, dataMonth, dataAnnual);
  }
  { //Chart settings
    function initializeHighChart(){
      $('#chart').highcharts({
        //key: value
        title: {
          text: 'Gasoline prices from quandl'
        },
        subtitle: {
          text: 'Monthly-Quarterly-Annual Averages'
        },
        xAxis: {
          // config of xAxis
          type: 'datetime',
          dateTimeLabelFormats: {
              millisecond: '%H:%M:%S.%L',
              second: '%H:%M:%S',
              minute: '%H:%M',
              hour: '%H:%M',
              day: '%e. %b',
              week: '%e. %b',
              month: '%b \'%y',
              year: '%Y'
          }
        },
        yAxis: {
          // config of yAxis
          min: 0.5,
          max: 4.5,
          title: {
              text: 'Gas Prices'
          }
        },
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom',
          borderWidth: 0
        },
        series: [
          {
            name: 'Daily',
            data: dataWeek
          },
          {
            name: 'Monthly',
            data: dataMonth
          },
          {
            name: 'Quaterly',
            data: dataQuarter
          },
          {
            name: 'Annual',
            data: dataAnnual
          }
        ]
      });
    }
  }
  // grabData();
});