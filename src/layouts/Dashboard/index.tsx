import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

import styles from './style.module.scss';

const DashboardLayout = () => {
	return (
		<div className={'row wrap position-relative'}>
			<Navigation
				user={{ name: 'Boluwatife Ade-Ojo', email: 'adeojopeter@gmail.com' }}
			/>
			<div className={styles.mainPage}>
				<div className="container">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
