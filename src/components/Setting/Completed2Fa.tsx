import { FilledButton } from '@/shared/UIs/CustomButton'
import React from 'react'
import { IoIosCheckmarkCircle } from 'react-icons/io'

interface IProps {
    closeModal: () => void
}

const Completed2Fa = ({ closeModal }: IProps) => {
    return (
        <div className='flex flex-col gap-2 items-center'><IoIosCheckmarkCircle className="text-[200px] text-green-500" />
            <span className='text-[20px] font-semibold'>2FA Activated</span>
            <FilledButton onClick={closeModal} title='Done' className='bg-mainColor text-white font-medium w-[20%] mt-1' />
        </div>
    )
}

export default Completed2Fa