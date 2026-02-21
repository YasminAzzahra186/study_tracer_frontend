import Chart from "react-apexcharts";

export function ChartsPenyelesaian() {
  const series = [85];

  const options = {
    chart: {
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 15,
          size: "75%",
        },
        dataLabels: {
          name: {
            show: true,
            fontSize: "14px",
            formatter: function () {
              return "Tingkat Penyelesaian";
            },
          },
          value: {
            fontSize: "28px",
            fontWeight: 600,
          },
        },
      },
    },
    stroke: {
      lineCap: "round",
    },

    labels: ["Disetujui", "Belum"],
    colors: ["#3C5759", "#F3F4F4"],
    legend: {
      show: true,
      position: "bottom",
    },
  };

  return (
    <div style={{ width: 300 }}>
      <h4
        style={{ textAlign: "center", letterSpacing: 2 }}
        className="text-sm text-secondary"
      >
        Penyelesaian Persetujuan
      </h4>
      <Chart options={options} series={series} type="radialBar" height={250} />
    </div>
  );
}

export function ChartKarir() {
  return (<>has</>)
}
