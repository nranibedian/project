//api key 1d776447abea4e739b9cad8d8b48d531.
let responsecount=0;
//    console.log("labels");
//    console.log(labels);

// These are colors from chart.js utils
    const CHART_COLORS = {
      red: 'rgb(255, 99, 132)',
      orange: 'rgb(255, 159, 64)',
      yellow: 'rgb(255, 255, 0)',
      green: 'rgb(75, 192, 192)',
      blue: 'rgb(54, 162, 235)',
      purple: 'rgb(153, 102, 255)',
      lavender: 'rgb(219, 215, 247)',
      grey: 'rgb(201, 203, 207)',
      navy: 'rgb(17, 79, 120)',
      darkgreen: 'rgb(201, 203, 207)',
      maroon: 'rgb(122, 37, 55)',
      pink: 'rgb(255, 92, 252)',
      black: 'rgb(0, 0, 0)',
      lime: 'rgb(144, 255, 110)',
      coral: 'rgb(240,128,128)',
      gold: 'rgb(255,215,0)',
      teal: 'rgb(0,206,209)',
      blush: 'rgb(255,192,203)',
      honeydew: 'rgb(240,255,240)',
      peach: 'rgb(255,228,181)',
      indigo: 'rgb(75,0,130)',
      seafoam: 'rgb(127,255,212)'
    };
let chart_colorskeys=Object.keys(CHART_COLORS);
console.log(chart_colorskeys);

//    console.dir(CHART_COLORS);

    const CHART_COLORS_50_Percent = {
      red: 'rgba(255, 99, 132, 0.5)',
      orange: 'rgba(255, 159, 64, 0.5)',
      yellow: 'rgba(255, 205, 86, 0.5)',
      green: 'rgba(75, 192, 192, 0.5)',
      blue: 'rgba(54, 162, 235, 0.5)',
      purple: 'rgba(153, 102, 255, 0.5)',
      lavender: 'rgba(219, 215, 247,0.5)',
      grey: 'rgb(201, 203, 207,0.5)',
      navy: 'rgb(17, 79, 120,0.5)',
      darkgreen: 'rgb(201, 203, 207,0.5)',
      maroon: 'rgb(122, 37, 55,0.5)',
      pink: 'rgb(255, 92, 252,0.5)',
      black: 'rgb(0, 0, 0,0.5)',
      lime: 'rgb(144, 255, 110,0.5)',
      coral: 'rgb(240,128,128,0.5)',
      gold: 'rgb(255,215,0,0.5)',
      teal: 'rgb(0,206,209,0.5)',
      blush: 'rgb(255,192,203,0.5)',
      honeydew: 'rgb(240,255,240,0.5)',
      brown: 'rgb(160,82,45,0.5)',
      peach: 'rgb(255,228,181,0.5)',
      indigo: 'rgb(75,0,130,0.5)',
      seafoam: 'rgb(127,255,212,0.5)'
    };
//    console.log(CHART_COLORS_50_Percent);
//    end utils

    const data = {
      labels: [],
      datasets: []
    };
  //  console.dir(data);
  let super_sector={
    CEU6500000001: "Education and Health Services",
    CEU1000000001: "Mining and Logging",
    CEU5500000001: "Financial Activities",
    CEU5000000001: "Information",
    CEU6000000001: "Professional and Business Services",
    CEU8000000001: "Other Services",
    CEU9000000001: "Government",
    CEU0000000001: "Total nonfarm",
    CEU0600000001: "Goods Producing",
    CEU0700000001: "Service-providing'",
    CEU0500000001: "Total private",
    CEU0800000001: "Private service providing",
    CEU2000000001: "Construction",
    CEU3000000001: "Manufacturing",
    CEU4000000001: "Trade, transportation, and utilities",
    CEU3100000001: "Durable Goods",
    CEU4100000001: "Wholesale Trade",
    CEU3100000001: "Nondurable Goods",
    CEU3200000001: "Transportation and warehousing",
    CEU4200000001: "Retail Trade",
    CEU7000000001: "Leisure and hospitality"
  };
  let supersectorcodes = Object.keys(super_sector);

for (sector in super_sector){
  let xhr = new XMLHttpRequest();
  xhr.addEventListener("load", responseReceivedHandler);
  xhr.responseType = "json";
  xhr.open("GET", "https://api.bls.gov/publicAPI/v2/timeseries/data/"+sector+"?registrationkey=1d776447abea4e739b9cad8d8b48d531");
  xhr.send();
 }
const config = {
  type: 'line',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart Exercise'
      }
    }
  }
};
//    console.log(config);


function responseReceivedHandler(){
  if (this.status == 200) {
    console.log(this.response.Results);
    let dataArray = this.response.Results.series[0].data;
    let seriesID = this.response.Results.series[0].seriesID;
    let sectorline =   {
        label: 'Super Sector Name',
        data: [],
        borderColor: CHART_COLORS.red,
        backgroundColor: CHART_COLORS_50_Percent.red,
        hidden: true
      };
    sectorline.label = super_sector[seriesID];
    sectorline.borderColor = CHART_COLORS[chart_colorskeys[responsecount]];
    sectorline.backgroundColor = CHART_COLORS_50_Percent[chart_colorskeys[responsecount]];
    for(let i = dataArray.length-1;i>=0;i--){
      sectorline.data.push(dataArray[i].value)
      if (responsecount === 0) {
        data.labels.push(dataArray[i].period.substring(1)+"/"+dataArray[i].year)
      }
    }
    responsecount++
    data.datasets.push(sectorline);
    if (responsecount==supersectorcodes.length){
      const myChart = new Chart(
        document.getElementById('myChart'),
          config);
    }

  }
}
