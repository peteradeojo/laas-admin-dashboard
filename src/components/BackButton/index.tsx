import { useNavigate } from 'react-router-dom';

const BackButton = () => {
	const navigate = useNavigate();

	const goBack = () => {
		navigate(-1);
	};

	return (
		<button className="btn btn-primary" onClick={goBack}>
			Back
		</button>
	);
};

export default BackButton;
