import { PropsWithChildren } from 'react';

import styles from './style.module.scss';

interface GenericCardProps extends PropsWithChildren {
	pops?: boolean;
}

interface CardProps extends GenericCardProps {
	title: string;
	center?: boolean;
}

const Card = ({ title, children, pops }: CardProps) => {
	return (
		<div className={styles.card + ' ' + (pops ? styles.popper : '')}>
			<h2>{title}</h2>
			<div>{children}</div>
		</div>
	);
};

export const CenteredCard = ({ title, children }: CardProps) => (
	<Card title={title} center>
		{children}
	</Card>
);

export const GenericCard = ({ children, pops }: GenericCardProps) => {
	return (
		<div className={`${styles.card} ${pops ? styles.popper : ''}`}>
			{children}
		</div>
	);
};

export default Card;
