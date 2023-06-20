import ErrorMessage from '@/components/ErrorMessage';
import { useGetUsersQuery } from '@/services/userApi';
// import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './style.module.scss';

export const UserRole = ({ role }: { role?: string }) => {
	return (
		<span className={`${styles.roleTag} ${styles[role || 'empty']}`}>
			{role}
		</span>
	);
};

export const Tag = ({
	className,
	tag,
}: {
	className?: string;
	tag: string;
}) => {
	return (
		<span className={`${styles.roleTag} ${styles[className ?? 'user']}`}>{tag}</span>
	);
};

const Users = () => {
	// const [page, setPage] = useState(1);

	const usersHook = useGetUsersQuery({ page: 1, count: 20 });

	return (
		<>
			<h1>Users</h1>

			<table className={`table ${styles.userList}`}>
				<thead>
					<tr>
						<th>Name</th>
						<th>E-mail</th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{usersHook.isLoading || usersHook.isFetching ? (
						<tr>
							<td colSpan={5}>Loading</td>
						</tr>
					) : usersHook.isError ? (
						<tr>
							<td colSpan={5}>
								<ErrorMessage message={(usersHook.error as any).message} />
							</td>
						</tr>
					) : (
						usersHook.data.data.map((user: any) => {
							return (
								<tr key={user._id}>
									<td>{user.name}</td>
									<td>{user.email}</td>
									<td>
										<UserRole role={user.role} />
									</td>
									<td>
										<Link to={user._id} className="btn">
											View
										</Link>
									</td>
								</tr>
							);
						})
					)}
				</tbody>
			</table>
		</>
	);
};

export default Users;
