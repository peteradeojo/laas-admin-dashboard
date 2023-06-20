import styles from './style.module.scss';
import { Link } from 'react-router-dom';
import { MdPerson, MdHome, MdSettings, MdLogout } from 'react-icons/md';

const Navigation = () => {
	// const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem('authToken');
		window.location.reload();
	};

	return (
		<nav className={styles.navigation}>
			<div className="container">
				<div className={styles.logo}>Logo</div>

				<ul className={styles.navLinks}>
					<li>
						<MdHome />
						<Link to="/dashboard">Dashboard</Link>
					</li>
					<li>
						<MdPerson />
						<Link to="/users">Users</Link>
					</li>
					<li>
						<MdSettings />
						<Link to="/settings">Settings</Link>
					</li>
					{/* <li>
						<MdHome />
						<Link to="/dashboard">Dashboard</Link>
					</li>
					<li>
						<MdHome />
						<Link to="/dashboard">Dashboard</Link>
					</li> */}
					<li onClick={logout}>
						<MdLogout />
						Logout
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navigation;
