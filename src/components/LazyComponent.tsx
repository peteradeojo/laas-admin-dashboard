
import React, { ReactNode, Suspense, useEffect, useState, useTransition } from 'react';
import { Spinner } from './Spinner';

interface LazyLoadedComponentProps {
    component: ReactNode
}

const LazyComponent: React.FC<LazyLoadedComponentProps> = ({
    component: children,
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [transition, startTransition] = useTransition()

    const LoadingComponent: React.FC = () => {
        return <div className='flex items-center justify-center absolute right-[5%]'>
            <Spinner />
        </div>
    };

    const render = () => {
        if (isLoaded) {
            return children;
        } else {
            return <LoadingComponent />;
        }
    };

    useEffect(() => {
        startTransition(() => {
            setIsLoaded(true);
        });

        return () => {
            setIsLoaded(false);
        };
    }, [startTransition]);

    return (
        <Suspense >
            {render()}
        </Suspense>
    );
};


export default LazyComponent;