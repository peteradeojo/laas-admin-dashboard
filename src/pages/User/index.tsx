/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-mixed-spaces-and-tabs */
import { GenericCard } from '@/components/Card';
import ErrorMessage from '@/components/ErrorMessage';
import { useGetUserQuery } from '@/services/Api/userApi';
import { useParams, Navigate } from 'react-router-dom';
// import { Tag } from '../Users';
import moment from 'moment';
import React from 'react';

interface UserProps {
	user: {
		name: string;
		email: string;
		role: string;
		_id: string;
		apps?: any[];
	};
}

const UserDisplay = ({ user }: UserProps) => {
	return (
		<>
			<div className="pb-3">
				<h1 className="h5">{user.name}</h1>
				<h3>
					<a href={`mailto:${user.email}`} target="_blank">
						{user.email}
					</a>
				</h3>
			</div>

			<div className="row wrap">
				{user.apps?.map((app: any) => (
					<div className="col-4 mx-1">
						<GenericCard pops>
							<h2 className="h6">{app.title}</h2>
							<p>
								<b>Status: </b>{' '}
								{app.token == '1' ? (
									<>
										Active
										{/* <Tag tag="active" className="admin" /> */}
									</>
								) : (
									<>Inactive</>
								)}
							</p>
							<p>
								<b>Logs Generated:</b> {app.total_logs}
							</p>
							<p>
								<b>Created: </b>
								{moment(app.createdAt).format('MMMM Do Y, hh:mm:ss')}
							</p>
						</GenericCard>
					</div>
				))}
			</div>
		</>
	);
};

const User = () => {
	const { id } = useParams<{ id: string }>();

	if (!id) {
		return <Navigate to={'/users'} />;
	}

	const userHook = useGetUserQuery({ id });

	return (
		<>
			{userHook.isLoading || userHook.isFetching ? (
				<>
					<ErrorMessage message="loading" />
				</>
			) : userHook.isError ? (
				<ErrorMessage
					message={(userHook.error as any).data?.message || 'An error occured'}
				/>
			) : (
				<UserDisplay user={userHook.data} />
			)}
		</>
	);
};

export default User;
