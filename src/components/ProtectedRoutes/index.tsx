import { Outlet } from 'react-router-dom';
import { useProfileQuery } from '../../services/Api/api';
import { Navigate } from 'react-router-dom';

import React from 'react';

const ProtectedRoutes = () => {
	const { data, error } = useProfileQuery('');
	const token = sessionStorage.getItem('authToken')

	if (token || data) {
		return <Outlet />;
	}

	if (!token && !data) {
		return <Navigate to="/login" />;
	}

	if (error) {
		return <Navigate to="/login" />;
	}

};

export default ProtectedRoutes;
