import { TwoFA } from '@/components'
import React from 'react'

const Setting = () => {
    return (
        <div className='flex flex-col gap-2'>
            <h1 className='text-[24px] font-medium'>Setting</h1>
            <hr />
            <TwoFA />
        </div>
    )
}

export default Setting