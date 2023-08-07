import { LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"

export const Spinner = () => {
    return (
        <>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} className='text-ruppiesColor z-[1000]' spin />} />
        </>
    )
}