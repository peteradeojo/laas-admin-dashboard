import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider,
	Route,
	createRoutesFromElements,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './store';

import './index.scss';
import Home from './pages/Home';
import ProtectedRoutes from '@components/ProtectedRoutes';
import DashboardLayout from '@layouts/Dashboard';
import Dashboard from '@pages/Dashboard';
import Users from './pages/Users';
import User from './pages/User';

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route index element={<Home />} />

			<Route element={<ProtectedRoutes />}>
				<Route element={<DashboardLayout />}>
					<Route path="dashboard" element={<Dashboard />} />
					<Route path='users' element={<Users />} />
					<Route path='users/:id' element={<User />} />
				</Route>
			</Route>
		</>
	)
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
