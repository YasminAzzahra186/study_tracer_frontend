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
  const series = [44, 55, 10, 29];

  const options = {
    chart: {
      type: "pie",
    },

    labels: ["Bekerja", "Kuliah", "Wirausaha", "Pencari Kerja"],

    colors: [
      "#3C5759",
      "#526061",
      "#9CA3AF",
      "#D0D5CE",
    ],

    legend: {
      position: "bottom",
      fontSize: "14px",
    },

    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return Math.round(val) + "%";
      },
    },

    stroke: {
      colors: ["#fff"],
    },

    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px"
      }}
      className="h-full"
    >
      <Chart options={options} series={series} type="pie" height={320} />
    </div>
  );
}

export function ChartJurusan() {

  const data = [
    { jurusan: "RPL", total: 120 },
    { jurusan: "TKJ", total: 95 },
    { jurusan: "Multimedia", total: 70 },
    { jurusan: "Akuntansi", total: 55 },
    { jurusan: "BDP", total: 40 },
  ];

  const series = [
    {
      name: "Jumlah Alumni",
      data: data.map((item) => item.total),
    },
  ];

  const options = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },

    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        borderRadius: 2,
      },
    },

    dataLabels: {
      enabled: true,
    },

    xaxis: {
      categories: data.map((item) => item.jurusan),
    },

    colors: ["#3C5759"],

    grid: {
      strokeDashArray: 4,
    },

    tooltip: {
      y: {
        formatter: (val) => val + " alumni",
      },
    },
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
      }}
    >
      <Chart options={options} series={series} type="bar" height={320} />
    </div>
  );
}
