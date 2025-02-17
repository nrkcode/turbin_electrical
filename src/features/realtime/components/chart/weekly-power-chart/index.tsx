"use client"

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
} from "chart.js"
import React from "react"
import { Line } from "react-chartjs-2"

import { LoadingComponent } from "@/common/components/loading"
import { useWeeklyPowerData } from "@/features/realtime/hooks/weekly-power-chart/useWeeklyPowerData"
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
} from "@/shadcn/components/card"

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
)

export default function WeeklyPowerChart() {
	const { data = [], isLoading, isError } = useWeeklyPowerData() // 기본값을 빈 배열로 설정
	console.log(data)

	// 데이터가 유효하지 않은 경우 대비
	const safeData = Array.isArray(data) ? data : []

	// 차트를 위한 데이터 및 옵션 정의
	const chartData = {
		labels: safeData.map((item) => item.날짜), // 안전한 데이터 처리
		datasets: [
			{
				label: "발전량 (kW)",
				data: safeData.map((item) => item.발전량), // 안전한 데이터 처리
				fill: true,
				backgroundColor: "rgba(135, 206, 250, 0.2)",
				borderColor: "rgba(70, 130, 180, 1)",
				borderWidth: 2,
				tension: 0.4,
			},
		],
	}

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: true,
				position: "top" as const,
			},
			title: {
				display: true,
				text: "주간 전력 생산량",
			},
		},
		scales: {
			x: {
				title: {
					display: true,
					text: "날짜",
				},
			},
			y: {
				title: {
					display: true,
					text: "발전량 (kW)",
				},
			},
		},
	}

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>주간 전력 생산량</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="h-[50vh] w-full">
					{isLoading ? (
						<div className="flex h-full items-center justify-center">
							<span>
								Loading...
								<LoadingComponent />
							</span>
						</div>
					) : isError ? (
						<div className="flex h-full items-center justify-center">Error</div>
					) : safeData.length > 0 ? (
						<Line data={chartData} options={options} />
					) : (
						<div className="flex h-full items-center justify-center">
							<p>No data available</p>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	)
}
