import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import React from "react";

const SimplePieChart = ({ data }) => {
  const COLORS = ["#4e73df", "#1cc88a", "#36b9cc"];
  return (
    <React.Fragment>
      <PieChart
        width={350}
        height={250}
        margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <Pie
          dataKey="value"
          isAnimationActive={true}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          innerRadius={65}
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          formatter={(value, entry, index) => (
            <span className="text-xs text-gray-900">{value}</span>
          )}
          layout="horizontal"
          align="center"
          verticalAlign="bottom"
          payload={data?.map((item, index) => ({
            id: item.name,
            type: "circle",
            value: `${item.name}`,
            color: COLORS[index % COLORS.length],
          }))}
        />
      </PieChart>
    </React.Fragment>
  );
};

export default SimplePieChart;
