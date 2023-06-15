import { Outlet } from 'react-router-dom';
import { useProfileQuery } from '../../services/api';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
	const { data, error, isLoading } = useProfileQuery('');

	return (
		<>
			{error ? (
				<Navigate to="/" />
			) : isLoading ? (
				<>Loading</>
			) : data ? (
				(console.log(data), (<Outlet />))
			) : (
				<>Can't tell what's up</>
			)}
		</>
	);
};

export default ProtectedRoutes;
