import type { ColumnsType } from 'antd/es/table';
import { Table, Space } from 'antd';
import { OutlineButton } from '@/shared/UIs/CustomButton';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface IProps {
    data: any
    count?: number
}
interface DataType {
    id: number;
    name: string;
    email: string;
    role: string;
    isAdmin: boolean;
    // createdAt: string;
}

const Users = ({ data, count }: IProps) => {
    const navigate = useNavigate();

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
            render: (_, record: DataType) => (
                <span className={`p-[6px] rounded-md ${record.isAdmin ? "bg-[#72E1281F] text-[#71DD37]" : "bg-[#FDB5281F] text-[#E89806]"}`}>{record.isAdmin ? "admin": "user"}</span>
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
                        navigate(`/dashboard/users/${record.id}`);
                    }} />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={data?.data} scroll={{ x: 600 }} pagination={{
                pageSize: count,
                responsive: true,
                total: data?.length,
            }} bordered />

        </div>
    )
}

export default Users