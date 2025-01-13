"use client"

import { useState } from "react"

import { TitleCard } from "@/common/components/card"
import { LineChartComponent } from "@/common/components/chart/line-chart"
import { TimeRangeOptions } from "@/common/components/chart/time-range-options"
import {
	dateFilteredData,
	recTimeRange,
} from "@/features/trading-dashboard/hook/date-range-filter"
import { generateChartConfig } from "@/features/trading-dashboard/hook/generate-chartConfig"
import { useRECChartData } from "@/features/trading-dashboard/hook/useRECChartData"

export function RecLineChart() {
	const [timeRange, setTimeRange] = useState("30d")
	const { data, isLoading, isError } = useRECChartData()
	const timeRangeOptions = recTimeRange

	const contents = () => {
		if (isLoading) {
			return <div className="pt-2">Loading...</div>
		}

		if (isError) {
			return <div className="pt-2">Error loading data</div>
		}

		if (data) {
			const chartConfig = generateChartConfig(data)
			const filteredData = dateFilteredData({
				chartData: data,
				timeRange: timeRange,
				type: "rec",
			})

			return (
				<div className="pt-2">
					<LineChartComponent
						chartConfig={chartConfig}
						chartData={filteredData}
						LineDataKey={"rec"}
						XAixsDataKey={"date"}
						type={"linear"}
						dot={false}
						Ymin={0}
						Ymax={"auto"}
					/>
				</div>
			)
		}

		return null
	}

	return (
		<TitleCard
			title="REC 가격"
			className="h-full"
			rightArea={TimeRangeOptions(timeRange, setTimeRange, timeRangeOptions)}
		>
			{contents()}
		</TitleCard>
	)
}
