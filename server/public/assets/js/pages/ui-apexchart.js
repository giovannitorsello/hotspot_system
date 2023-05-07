const pastSevenDays = [];

for (let i = 6; i >= 0; i--) {
  const date = new Date();
  date.setDate(date.getDate() - i);
  pastSevenDays.push(date.toISOString().slice(0, 10));
}




var lineOptions = {
  chart: {
    type: "line",
  },
 
  series: [
    {
      name: "TICKET",
      data: [1, 4, 3, 7, 6, 2, 0],
    },
  ],
  chart:{
    toolbar: {
      show: false
    },
  },
  xaxis: {
    categories: pastSevenDays,
  },
};

var line = new ApexCharts(document.querySelector("#line"), lineOptions);

line.render();