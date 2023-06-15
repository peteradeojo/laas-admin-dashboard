import { GenericCard } from '@components/Card';
import { MdPersonOutline, MdWorkspaces } from 'react-icons/md';
import { useAnalyticsQuery } from '@/services/api';
import { useGetRecentUsersQuery } from '@/services/userApi';

import { Link } from 'react-router-dom';
import styles from './style.module.scss';
import { ReactElement } from 'react';

const UserList = ({ users }: { users: any[] }) => {
	if (users.length < 1) {
		return <li className={styles.userListItem}>No recent user</li>;
	}

	return users.map((user: any) => <li className={styles.userListItem}>{user.name}</li>);
};

const AnalyticCard = ({
	icon,
	qty = 0,
	title,
}: {
	icon: ReactElement;
	qty?: string | number;
	title: string;
}) => {
	return (
		<div className={'col-3 mx-1 ' + styles.AnalyticCard1}>
			<GenericCard pops>
				{icon}
				<p className={styles.weight}>{qty}</p>
				<p className={styles.AcTitle}>{title}</p>
			</GenericCard>
		</div>
	);
};

const Dashboard = () => {
	const { data: analytics } = useAnalyticsQuery('');
	const {
		data: users,
		isError: IsUserError,
		isLoading: usersLoading,
		error: usersError,
	} = useGetRecentUsersQuery('');

	return (
		<>
			<h1>Analytics</h1>

			<div className="mt-2">
				<div className={'row wrap start ' + styles.Analytics}>
					<AnalyticCard
						icon={<MdPersonOutline />}
						qty={analytics?.data.users?.total}
						title="Registered Users"
					/>
					<AnalyticCard
						icon={<MdWorkspaces />}
						qty={analytics?.data.apps?.total}
						title="Active Applications"
					/>
				</div>

				<div className="row between mt-3">
					<h2>Recent users</h2>
					<Link to="/users">View All</Link>
				</div>
				<ul className={styles.recentUsersList + ' mt-1'}>
					{usersLoading ? (
						<li>Loading data</li>
					) : IsUserError ? (
						<li>{(usersError as any).data.message}</li>
					) : (
						<UserList users={users.data} />
					)}
				</ul>
			</div>
		</>
	);
};

export default Dashboard;
