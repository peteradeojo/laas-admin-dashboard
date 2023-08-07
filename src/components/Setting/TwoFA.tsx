import React, { useState } from 'react';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';
import Setup2FA from './Setup2FA';
import LazyComponent from '../LazyComponent';
import { useProfileQuery } from '@/services/Api/api';

const TwoFA = () => {
    const [checked, setChecked] = useState(false);
    const { data } = useProfileQuery({});
    const toggle = () => setChecked((prevChecked) => !prevChecked);
    const toggleText = data?.twoFactorEnabled ? 'Deactivate' : 'Activate';
    const twoFAText = `${toggleText} 2FA (Two Factor Authentication)`;

    return (
        <>
            {checked && (
                <LazyComponent
                    component={<Setup2FA isModalOpen={checked} setOpenModal={setChecked} />}
                />
            )}
            <div className='flex flex-col gap-1'>
                <span className='font-medium'>{twoFAText}</span>
                <span className='text-[30px]' >
                    {data?.twoFactorEnabled ? <BsToggleOn /> : <BsToggleOff onClick={toggle} />}
                </span>
            </div>
        </>
    );
};

export default TwoFA;
