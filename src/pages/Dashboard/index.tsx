import { GenericCard } from '@components/Card';
import { MdPersonOutline, MdWorkspaces } from 'react-icons/md';
import { useAnalyticsQuery } from '@/services/api';
import { useGetUsersQuery, useGetRecentUsersQuery } from '@/services/userApi';

import { Link } from 'react-router-dom';
import styles from './style.module.scss';
import { PropsWithChildren, ReactElement } from 'react';

interface UserProps extends PropsWithChildren {
	users: any[];
}

const UserList = ({ users }: UserProps) => {
	if (users.length < 1) {
		return <li className={styles.userListItem}>No recent user</li>;
	}

	return users.map((user, index) => (
		<li className={styles.userListItem} key={index}>
			<img
				src={`https://ui-avatars.com/api/?name=${user.name}`}
				className="circle"
				alt=""
			/>
			<Link to={`/users/${user._id}`}>{user.name}</Link>
		</li>
	));
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
	} = useGetRecentUsersQuery({});

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
