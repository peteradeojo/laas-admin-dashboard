import { FormEventHandler, ReactElement, useState } from 'react';
import { useLoginMutation } from '../../services/api';
import { useNavigate } from 'react-router-dom';

import Card from '@components/Card';
import ErrorMessage from '@components/ErrorMessage';

const Home = (): ReactElement => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [login, loginResult] = useLoginMutation();
	const navigate = useNavigate();

	const submitForm: FormEventHandler = async (e) => {
		e.preventDefault();

		try {
			const { data } = await login({ email, password }).unwrap();
			localStorage.setItem('authToken', data.token);
			navigate('/dashboard');
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<div className="container">
				<Card title="Login">
					<form onSubmit={submitForm}>
						<div className="form-group">
							<label htmlFor="email">E-mail</label>
							<input
								type="email"
								className="form-control"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input
								type="password"
								name="password"
								className="form-control"
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
							<div className="form-group">
								<button
									className="btn"
									type="submit"
									disabled={loginResult.isLoading}
								>
									Submit
								</button>
							</div>
						</div>
					</form>
					{loginResult.isError && (
						<ErrorMessage message={(loginResult.error as any).data?.message} />
					)}
				</Card>
			</div>
		</>
	);
};

export default Home;
