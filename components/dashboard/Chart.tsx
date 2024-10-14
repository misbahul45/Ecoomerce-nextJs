"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface Props{
    chartData: any
}

const chartConfig = {
  orders:{
    label: "Orders",
    color: "#f97316",
  },
  users:{
    label: "Users",
    color: "#ef4444",
  },
  products:{
    label: "Products",
    color: "#22c55e",
  },
  comments:{
    label: "Comments",
    color: "#64748b",
  },
  categories:{
    label: "Categories",
    color: "#f59e0b",
  }

} satisfies ChartConfig

export default function Chart({ chartData }: Props) {
  return (
    <div className="w-full h-full py-2">
        <h1 className="lg:text-4xl md:text-3xl text-2xl text-center font-bold my-4">Monthly Statistic</h1>
        <ChartContainer config={chartConfig} className="h-auto w-full max-w-5xl mx-auto">
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={
                    (value) => {    
                        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                        return months[value - 1];
                    }
                }
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="orders" fill={chartConfig.orders.color} />
                <Bar dataKey="users" fill={chartConfig.users.color} />
                <Bar dataKey="products" fill={chartConfig.products.color} />
                <Bar dataKey="comments" fill={chartConfig.comments.color} />
                <Bar dataKey="categories" fill={chartConfig.categories.color} />    
            </BarChart>
        </ChartContainer>
    </div>
  )
}
