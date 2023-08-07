import type { ColumnsType } from 'antd/es/table';
import { Table, Space } from 'antd';
import { OutlineButton } from '@/shared/UIs/CustomButton';
import { FaEdit } from 'react-icons/fa';

interface IProps {
    data: any
    count?: number
}
interface DataType {
    id: number;
    name: string;
    email: string;
    role: string;
    // createdAt: string;
}

const Users = ({ data, count }: IProps) => {
    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            render: (role) => (
                <span className={`p-[6px] rounded-md ${role === "admin" ? "bg-[#72E1281F] text-[#71DD37]" : "bg-[#FDB5281F] text-[#E89806]"}`}>{role}</span>
            )
        },
        // {
        //     title: 'Date',
        //     dataIndex: 'createdAt',

        // },
        {
            title: "",
            key: "action",
            render: (_, record: DataType) => (
                <Space size="middle">
                    <OutlineButton title='View Details' icon={<FaEdit />} onClick={() => {
                        sessionStorage.setItem("userId", String(record.id))
                    }} />
                </Space>
            ),
        },
    ];
    return (
        <div>
            <Table columns={columns} dataSource={data} scroll={{ x: 600 }} pagination={{
                pageSize: count,
                responsive: true,
                total: data?.length,
            }} bordered />

        </div>
    )
}

export default Users