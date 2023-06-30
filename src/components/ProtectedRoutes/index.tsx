import { Outlet } from 'react-router-dom';
import { useProfileQuery } from '../../services/api';
import { Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const ProtectedRoutes = () => {
	const { data, error, isLoading } = useProfileQuery('');

	return (
		<>
			{error ? (
				<Navigate to="/" />
			) : isLoading ? (
				<> <Spin
					className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
					indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
				/></>
			) : data ? (
				<Outlet />
			) : (
				<>Can't tell what's up</>
			)}
		</>
	);
};

export default ProtectedRoutes;
