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
import clsx from "clsx";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

interface Props {
  title: string;
  value: number;
  graph?: boolean;
}

const MAX_HISTORY = 10;
export default function Task({ title, value, graph }: Props) {
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
    <div
      className={clsx("grid gap-x-4 mb-2", { "h-11": graph })}
      style={{ gridTemplateColumns: "0.25fr 1fr 1fr" }}
    >
      <div>icon</div>
      <div
        className={clsx("flex flex-col justify-center", {
          "col-span-2": !graph,
        })}
      >
        <div
          className={clsx("capitalize leading-3")}
          style={{ color: "#5eb2de" }}
        >
          {title}
        </div>
        <div
          className={clsx(
            "text-purple",
            { "text-6xl leading-8": !graph },
            { "ml-4 text-4xl leading-5 text-end": graph }
          )}
        >
          {value}
          {graph && (
            <text className="text-slate-400 text-2xl leading-3">/100</text>
          )}
        </div>
      </div>

      {graph && (
        <div className="w-full h-11">
          <Chart
            type={"line"}
            width={"100%"}
            height={"100%"}
            options={{
              animation: false,
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
      )}
    </div>
  );
}
