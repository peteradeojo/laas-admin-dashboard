import type { ColumnsType } from 'antd/es/table';
import { useGetAlertsQuery } from '@/services/Api/alerts';
import { Space, Spin, Table, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { OutlineButton } from '@/shared/UIs/CustomButton';
import { FaEdit } from 'react-icons/fa';

interface DataType {
	from_system: number;
	from_user: number;
	level: string;
	origin: string;
}

interface IAlertTableProps {
	data: any;
	pageSize: number;
	getPage(i: number, n: number): void;
}

interface IAlertProps {
	alert: DataType;
}

const AlertView: React.FC<{
	alert: Partial<DataType> & any;
	close: () => void;
}> = ({ alert, close }) => {
	return (
		<>
			<button onClick={close}>Close</button>
			<div>
				<p>Level: {alert.level}</p>
				<p>Origin: {alert.origin}</p>
				<p>Source: {alert.from_user == true ? 'USER' : 'SYSTEM'}</p>
				<p>Message: {alert.text}</p>
				<p>Stack: {alert.stack}</p>
				<p>Context: {JSON.stringify(alert.context)}</p>
				<p>{alert.createdAt}</p>
			</div>
		</>
	);
};

const AlertsTable = ({ data, pageSize, getPage }: IAlertTableProps) => {
	const [alert, setAlert] = useState<Partial<DataType> | undefined>(undefined);

	const columns: ColumnsType<DataType> = [
		{
			title: 'Level',
			dataIndex: 'level',
			render: (_, record) =>
				record.level[0].toUpperCase() + record.level.slice(1),
		},
		{
			title: 'Origin',
			key: 'role',
			render: (_, record: DataType) => (
				<span
					className={`p-[6px] rounded-md ${
						record.from_system == 1
							? 'bg-[red] text-[#fff]'
							: 'bg-[#FDB5281F] text-[#E89806]'
					}`}
				>
					{record.from_system == 1 ? 'system' : 'user'}
				</span>
			),
		},
		{
			title: 'Source',
			key: 'role',
			render: (_, record: DataType) => (
				<>
					<span
						className={`p-[6px] rounded-md ml-[6px] bg-[#FDB5281F] text-[#E89806]`}
					>
						{record.origin}
					</span>
				</>
			),
		},
		{
			title: 'Message',
			dataIndex: 'text',
			render: (v, _) => v.slice(0, 20) + '...',
		},
		{
			title: 'Date',
			dataIndex: 'createdAt',
		},
		{
			title: '',
			key: 'action',
			render: (_, record: DataType) => (
				<Space size="middle">
					<OutlineButton
						title="View"
						icon={<FaEdit />}
						onClick={() => {
							setAlert(record);
						}}
					/>
				</Space>
			),
		},
	];

	return (
		<div>
			<Table
				columns={columns}
				dataSource={data?.data}
				scroll={{ x: 600 }}
				pagination={{
					defaultCurrent: 1,
					current: data?.meta.page,
					defaultPageSize: 10,
					pageSize: pageSize,
					total: data?.meta.total,
					responsive: true,
					pageSizeOptions: [10, 20, 50],
					onChange(page, pageSize) {
						getPage(page, pageSize);
					},
					showSizeChanger: true,
					showQuickJumper: true,
					showTotal: (total, range) => (
						<div className="mx-2">
							Showing {range[0]} to {range[1]} of {total}
						</div>
					),
				}}
				bordered
			/>

			{alert ? (
				<AlertView
					alert={alert}
					close={() => {
						setAlert(undefined);
					}}
				/>
			) : null}
		</div>
	);
};

const Alerts = () => {
	const [page, setPage] = useState(1);
	const [pagesize, setPageSize] = useState(10);
	const {
		data: alerts,
		isLoading,
		isError,
		error,
		isSuccess,
	} = useGetAlertsQuery({ page, count: pagesize });
	const [alertsData, setAlertsData] = useState<any>();

	useEffect(() => {
		if (alerts) setAlertsData(alerts);
	}, [alerts]);

	useEffect(() => {
		if (isError) {
			notification.error({
				message: (error as any).data.message,
				duration: 3,
				placement: 'topRight',
			});
		}
	}, [isError]);

	return (
		<>
			<div className="flex flex-col gap-2">
				<h1 className="text-[20px] font-semibold tracking-wider">Alerts</h1>

				{isLoading ? (
					<Spin />
				) : isSuccess ? (
					<AlertsTable
						data={alertsData}
						getPage={(page, pageSize) => {
							setPage(page);
							setPageSize(pageSize);
						}}
						pageSize={pagesize}
					/>
				) : null}
			</div>
		</>
	);
};

export default Alerts;
