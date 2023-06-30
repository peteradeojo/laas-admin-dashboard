/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from 'react'
import { Layout, Menu, theme } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { sidebarItems } from '@/shared/constants'

const { Sider } = Layout

const Sidebar = (): JSX.Element => {
    const navigate = useNavigate()
    const location = useLocation()
    const {
        token: { colorBgContainer },
    } = theme.useToken()
    const handleMenuClick = (key: string) => {
        if (key === '/login') {
            sessionStorage.removeItem('token')
            navigate('/login')
        } else {
            navigate(key)
            setSelectedKeys([key])
        }
    }
    const [selectedKeys, setSelectedKeys] = useState<string[]>([])
    useEffect(() => {
        const path = window.location.pathname
        const link = sidebarItems.find((link) => link.key === path)
        if (link) {
            setSelectedKeys([link.key])
        }
    }, [location.pathname])
    return (
        <div>
            <Layout
                hasSider
                style={{ padding: '24px 0', background: '#fff' }}
                className='flex flex-col h-screen top-0 sticky'
            >
                <Sider
                    style={{ background: colorBgContainer }}
                    width={250}
                    className='h-screen '
                >
                    <div className='ml-[1.8rem] font-semibold mb-[0.5rem] text-[35px]'>
                        {/* <img
                            src=""
                            alt='Logo'
                            className='cursor-pointer'
                            onClick={() => {
                                navigate('/dashboard')
                            }}
                            style={{ width: '60%', height: 'auto', padding: '0.5rem' }}
                        /> */}
                        <h1>LAAS</h1>
                    </div>
                    <Menu
                        onClick={({ key }) => handleMenuClick(key)}
                        mode='inline'
                        selectedKeys={selectedKeys}
                        defaultSelectedKeys={['/dashboard']}
                    >
                        {sidebarItems.map((item) => {
                            // if (item.children) {
                            //     return (
                            //         <Menu.SubMenu
                            //             className='text-primaryColor'
                            //             key={item.key}
                            //             icon={item.icon}
                            //             title={item.title}
                            //         >
                            //             {item.children.map((child) => (
                            //                 <Menu.Item className='text-primaryColor' key={child.key}>
                            //                     {child.title}
                            //                 </Menu.Item>
                            //             ))}
                            //         </Menu.SubMenu>
                            //     )
                            // }
                            return (
                                <Menu.Item
                                    className='text-[14px] text-mainColor'
                                    key={item.key}
                                    icon={item.icon}
                                >
                                    <span>{item.title}</span>
                                </Menu.Item>
                            )
                        })}
                    </Menu>
                </Sider>
            </Layout>
        </div>
    )
}

export default React.memo(Sidebar)
