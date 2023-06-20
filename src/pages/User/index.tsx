import { GenericCard } from '@/components/Card';
import ErrorMessage from '@/components/ErrorMessage';
import { useGetUserQuery } from '@/services/userApi';
import { useParams, useNavigate } from 'react-router-dom';
import { Tag, UserRole } from '../Users';

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
				<h1>{user.name}</h1>
				<h3>
					<a href={`mailto:${user.email}`} target='_blank'>{user.email}</a>
				</h3>
			</div>

			<div className="row wrap">
				{user.apps?.map((app: any) => (
					<div className="col-4 mx-1">
						<GenericCard>
							<h2>{app.title}</h2>
							<p>
								<b>Status: </b>{' '}
								{app.token ? (
									<Tag tag="active" className="admin" />
								) : (
									<Tag tag="inactive" />
								)}
							</p>
							<p>
								<b>Created: </b>
								{app.createdAt}
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
	const navigate = useNavigate();

	if (!id) {
		return navigate('/users');
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
