
import { MdPersonOutline, MdWorkspaces } from 'react-icons/md';
import { useAnalyticsQuery } from '@/services/Api/api';
import { useGetRecentUsersQuery } from '@/services/Api/userApi';

import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { UsersComponent, Widget } from '@/components';
import { Spin, notification } from 'antd';

const Dashboard = () => {
	const navigate = useNavigate()
	const [usersData, setUsersData] = useState<any>();
	const [dashboardData, setDashboardData] = useState<any>();
	const { data: analytics } = useAnalyticsQuery('');
	const {
		data: users,
		isLoading: usersLoading,
		error: usersError,
	} = useGetRecentUsersQuery({});

	useEffect(() => {
		if (analytics) {
			setDashboardData(analytics?.data);
		}
		if (users) {
			setUsersData(users);
		}

	}, [analytics, users]);

	useEffect(() => {
		if (usersError) {
			const errorMesg = (usersError) as any
			notification.error({
				message: errorMesg.data.message,
				duration: 3,
				placement: "topRight",
			});
		}
	}, [usersError]);
	return (
		<>
			<div className="mt-2">
				<div className='w-full flex gap-2 flex-wrap lg:flex-nowrap'>

					<Widget icon={<MdPersonOutline />} value={dashboardData?.users?.total} title='Registered Users' />
					<Widget icon={<MdWorkspaces />} value={dashboardData?.apps?.total} title='Active Applications' />
				</div>

				<div className="flex flex-col gap-3 mt-2 bg-[#fff] p-1">
					<div className="flex items-center justify-between">
						<h3 className='text-[18px] font-medium text-mainColor'>Recent Users</h3>
						<span className='underline text-mainColor font-medium cursor-pointer' onClick={() => {
							navigate("/dashboard/users")
						}}>View All</span>
					</div>					{
						usersLoading ? (<Spin />) : (
							<UsersComponent data={usersData} />
						)
					}
				</div>

			</div>
		</>
	);
};

export default Dashboard;
