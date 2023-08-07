/* eslint-disable react-hooks/exhaustive-deps */
import { useSetup2FAQuery, useVerify2FAMutation } from '@/services/Api/twoApi'
import { OutlineButton } from '@/shared/UIs/CustomButton';
import { InputField } from '@/shared/UIs/InputField';
import { Image, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { Spinner } from '../Spinner';
import { useProfileQuery } from '@/services/Api/api';

interface IProps {
    current: number
    prev: () => void
    next: () => void
}

const Authenticate2FA = ({ current, prev, next }: IProps) => {
    const { data: userData } = useProfileQuery({})
    const { data, isSuccess, isError, isLoading } = useSetup2FAQuery({})
    const [code, setCode] = useState('')
    const [qrCodeGenerated, setQrCodeGenerated] = useState(false);
    const [verify2FA, { isSuccess: verifySuccess, isError: verifyIsError, error: verifyError, isLoading: verifyIsLoading }] = useVerify2FAMutation()

    const handleVerification = async () => {
        await verify2FA({
            email: userData?.email,
            token: code
        })
    }
    useEffect(() => {
        if (isError) {
            message.error('Error Occured in generating QR Code')
        }
        if (isSuccess) {
            message.success('QR Code Generated Successfully')
            setQrCodeGenerated(true);
        }
        if (verifySuccess) {
            message.success('Verification Successful')
            next()
        }
        if (verifyIsError) {
            const errMesg = verifyError as any
            message.error(errMesg?.data?.message)
            setCode('')
        }
    }, [isError, isSuccess, next, verifyError, verifyIsError, verifySuccess])

    useEffect(() => {
        if (code?.length === 6) {
            handleVerification()
        }
    }, [code])
    return (
        <>
            <div className='mt-[2px] flex flex-col items-center justify-center '>

                <span className='font-medium text-[16px]'>Scan QR Code and Fill Code</span>
                {isLoading ? <Spinner /> : (qrCodeGenerated &&
                    <>
                        <Image width={240} height={240} preview={false} src={data?.data?.qrCode} />
                        <div className="flex items-center gap-2">
                            <span className='font-medium text-[14px]'>Enter Code:</span>
                            <InputField inputValue={code} onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                setCode(event.target.value)
                            }
                                disabled={!qrCodeGenerated || verifyIsLoading}
                            />
                            {
                                verifyIsLoading && <Spinner />
                            }
                        </div>
                    </>
                )}
            </div>
            <div className="mt-2">
                {current > 0 && (
                    <OutlineButton title='Go Back' onClick={prev} />
                )}
            </div></>
    )
}

export default Authenticate2FA