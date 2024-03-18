import React from "react";
import CountryResponseDto from "@libs/dtos/Country/country-response.dto";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import Column from "./Column";
import clsx from "clsx";

const COLUMNS = [
	{
		key: 'name',
		header: 'Names',
	},
	{
		key: 'currencies',
		header: 'Currencies',
	},
	{
		key: 'active',
		header: 'Status',
	},
] as unknown as Column[];

async function getData() {
	const res = await fetch(`http://localhost:3000/api/countries?limit=${1000}`, {
		headers: {
			"Content-Type": "application/json",
		},
		method: "GET",
	});

	if (!res.ok) {
		throw new Error('Failed to fetch data')
	}

	return res.json();
}

export default function CustomTable() {
	const [data, setData] = useState<CountryResponseDto[]>([]);
	const [columns, setColumns] = useState<Column[]>(COLUMNS);
	const [page, setPage] = useState(1);
	const rowsPerPage = 10;
	const pages = Math.ceil(data.length / rowsPerPage);
	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;
	
		return data.slice(start, end);
	}, [page, data]);
	
	const switchColumns = () => {
		setColumns([columns[1], columns[0], ...columns.slice(2)])
	}

	const fetchData = async () => {
		const response: CountryResponseDto[] = await getData();
		setData(response);
	};

	async function toggleStatus(country: CountryResponseDto) {
		await fetch(`http://localhost:3000/api/countries/${country.id}`, {
			headers: {
				"Content-Type": "application/json",
			},
			method: "PATCH",
			body: JSON.stringify({
				active: !country.active
			})
		});
		fetchData();
	}

	useEffect(() => {
		fetchData();
	}, [columns]);

	return (
		<div className="flex min-h-screen flex-col items-center p-24">
			<button className="p-4 rounded bg-[#1da1f2]" onClick={() => switchColumns()}>Switch</button>
			<Table
				aria-label="Example empty table"
				bottomContent={
					<div className="flex w-full p-5 items-center justify-center">
						<Pagination
							showControls
							showShadow
							color="secondary"
							classNames={{
								wrapper: "gap-0 overflow-visible h-8 rounded border border-divider",
								item: "w-8 h-8 text-small rounded-none bg-transparent",
								cursor:
								"bg-gradient-to-b shadow-lg from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold",
							}}
							page={page}
							total={pages}
							onChange={(page) => setPage(page)}
						/>
					</div>
				}
			>
				<TableHeader>
					{columns.map((column: Column) =>
						<TableColumn key={column.key}>{column.header}</TableColumn>
					)}
				</TableHeader>
				<TableBody emptyContent={"No rows to display."}>
					{items.map((item: CountryResponseDto) =>
						<TableRow key={item.id}>
							<TableCell className="text-center">
								{item[columns[0].key as keyof CountryResponseDto] ? item[columns[0].key as keyof CountryResponseDto] : "No data"}
							</TableCell>
							<TableCell className="text-center">
								{item[columns[1].key as keyof CountryResponseDto] ? item[columns[1].key as keyof CountryResponseDto] : "No data"}
							</TableCell>
							<TableCell className="text-center">
								<button
									className={clsx(
										'w-20 items-center rounded-full px-2 py-1 text-sm',
										{
										'bg-gray-100 text-gray-500': item.active === false,
										'bg-green-500 text-white': item.active === true,
										},
									)}
									onClick={() => toggleStatus(item)}
								>
									{item.active ? "Active" : "Inactive"}
								</button>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	)
}