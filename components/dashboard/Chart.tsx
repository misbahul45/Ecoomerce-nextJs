"use client"

import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface Props {
  chartData: any;
}

const chartConfig = {
  orders: {
    label: "Orders",
    color: "#f97316",
  },
  users: {
    label: "Users",
    color: "#ef4444",
  },
  products: {
    label: "Products",
    color: "#22c55e",
  },
  comments: {
    label: "Comments",
    color: "#64748b",
  },
  categories: {
    label: "Categories",
    color: "#f59e0b",
  },
};

export default function Chart({ chartData }: Props) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="w-full h-full py-2">
      <h1 className="lg:text-4xl md:text-3xl text-2xl text-center font-bold my-4">Monthly Statistic</h1>
      <div className="w-full max-w-5xl mx-auto h-auto">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => months[value - 1]}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="orders" fill={chartConfig.orders.color} name={chartConfig.orders.label} />
            <Bar dataKey="users" fill={chartConfig.users.color} name={chartConfig.users.label} />
            <Bar dataKey="products" fill={chartConfig.products.color} name={chartConfig.products.label} />
            <Bar dataKey="comments" fill={chartConfig.comments.color} name={chartConfig.comments.label} />
            <Bar dataKey="categories" fill={chartConfig.categories.color} name={chartConfig.categories.label} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
