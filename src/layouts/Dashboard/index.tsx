import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

import styles from './style.module.scss';
import BackButton from '@/components/BackButton';

const DashboardLayout = () => {
	return (
		<>
			<Navigation />
			<div className={styles.mainPage}>
				<div className="container">
					<BackButton />
					<Outlet />
				</div>
			</div>
		</>
	);
};

export default DashboardLayout;
