import { Sidebar } from '@/components';
import { Outlet } from 'react-router-dom';


const DashboardLayout = () => {
	return (
		<>
			<div className="flex">
				<Sidebar />
				<div className="w-full">
					<div className="p-2 bg-[#f8f8f8] h-screen">
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
};

export default DashboardLayout;
