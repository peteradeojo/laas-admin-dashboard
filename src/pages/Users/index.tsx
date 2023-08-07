
import { useGetUsersQuery } from '@/services/Api/userApi';
import { UsersComponent } from '@/components';
import { useEffect, useState } from 'react';
import { Spin, notification } from 'antd';

const Users = () => {
	const [userData, setUserData] = useState();
	const [page] = useState<number>(1);
	const [count] = useState<number>(20);

	const { data, isLoading, error, isSuccess } = useGetUsersQuery({ page: page, count: count });

	useEffect(() => {
		if (error) {
			const errorMesg = (error) as any
			notification.error({
				message: errorMesg?.data?.message,
				duration: 3,
				placement: "topRight",
			});
		}
	}, [error]);

	useEffect(() => {
		if (isSuccess) {
			setUserData(data?.data);
		}
	}, [data, isSuccess])

	console.log(data);


	return (
		<div className='flex flex-col gap-2'>
			<h1 className='text-[20px] font-semibold tracking-wider'>Users</h1>

			{
				isLoading ? (<Spin />) : (
					<UsersComponent data={userData} count={count} />
				)
			}
		</div>
	);
};

export default Users;
