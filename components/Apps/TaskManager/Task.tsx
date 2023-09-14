import { useState, useEffect } from "react";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

interface Props {
  title: string;
  value: number;
}

const MAX_HISTORY = 10;
export default function Task({ title, value }: Props) {
  const [data, setData] = useState<number[]>(
    new Array(MAX_HISTORY).fill(value)
  );

  useEffect(() => {
    let timer: undefined | NodeJS.Timeout;
    timer = setTimeout(updateGraph, 1000);

    function updateGraph() {
      setData((data) => [...data.slice(1), value]);
      timer = setTimeout(updateGraph, 1000);
    }

    return () => {
      clearTimeout(timer);
      timer = undefined;
    };
  }, [value]);

  return (
    <div className="grid grid-cols-2 h-32">
      <div>{title}</div>
      <div>{value}</div>

      <div className="col-span-2 px">
        <Chart
          type={"line"}
          width={"100%"}
          height={"100%"}
          options={{
            showLine: true,
            scales: {
              y: {
                min: 0,
                max: 100,
                ticks: {
                  display: false,
                },

                grid: {
                  display: false,
                  drawTicks: false,
                },
              },
              x: {
                grid: {
                  display: false,
                  drawTicks: false,
                },
                ticks: {
                  display: false,
                },
              },
            },
            elements: {
              point: {
                radius: 0,
              },
            },
            maintainAspectRatio: false,
            layout: {
              padding: 0,
            },
          }}
          data={{
            labels: new Array(MAX_HISTORY).fill(""),

            datasets: [
              {
                data,
                fill: true,
                backgroundColor: "#5eb2de",
              },
            ],
          }}
        />
      </div>
    </div>
  );
}
