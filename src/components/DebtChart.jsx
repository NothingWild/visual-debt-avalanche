import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const colors = [
  "#4f46e5",
  "#0891b2",
  "#16a34a",
  "#ea580c",
  "#db2777",
  "#7c3aed",
  "#ca8a04",
];

export default function DebtChart({ debts, payoffData }) {
  const chartData = useMemo(() => {
    const debtIds = [
      ...new Set(
        payoffData.flatMap((snapshot) => Object.keys(snapshot.balances || {}))
      ),
    ];

    return {
      labels: payoffData.map((snapshot) => `Month ${snapshot.month}`),
      datasets: debtIds.map((id, index) => {
        const color = colors[index % colors.length];
        const loan = debts.find((debt) => String(debt.id) === String(id));
        const label = loan?.name?.trim() || "Unnamed Loan";

        return {
          label,
          data: payoffData.map((snapshot) => snapshot.balances?.[id] ?? 0),
          borderColor: color,
          backgroundColor: color,
          borderWidth: 2.5,
          pointRadius: 2,
          pointHoverRadius: 5,
          tension: 0.4,
        };
      }),
    };
  }, [debts, payoffData]);

  if (!payoffData?.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-500 shadow-sm">
        Add your loans to see a payoff chart.
      </div>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold text-slate-900">
        Debt Payoff Timeline
      </h2>

      <div className="h-80">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
              mode: "index",
              intersect: false,
            },
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Remaining Loan Balances",
              },
              tooltip: {
                callbacks: {
                  label: (context) =>
                    `${context.dataset.label}: ${new Intl.NumberFormat(
                      "en-US",
                      {
                        style: "currency",
                        currency: "USD",
                      }
                    ).format(context.parsed.y)}`,
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Months",
                },
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Remaining Balance",
                },
                ticks: {
                  callback: (value) =>
                    new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    }).format(value),
                },
              },
            },
          }}
        />
      </div>
    </section>
  );
}