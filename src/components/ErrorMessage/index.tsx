import { PropsWithChildren, useState } from 'react';

import styles from './style.module.scss';

interface ErrorProps extends PropsWithChildren {
	message: string | undefined;
}

const ErrorMessage = ({ message }: ErrorProps) => {
	const [visible, setVisible] = useState(true);

	if (!visible) return <></>;

	return (
		<div className={styles.error}>
			<span className={styles.close} onClick={() => setVisible(false)}>
				&times;
			</span>
			<p>{message}</p>
		</div>
	);
};

export default ErrorMessage;
