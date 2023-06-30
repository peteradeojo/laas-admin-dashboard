
interface IWidgetProps {
    icon: JSX.Element
    value: string
    title: string

}
const Widget = ({ icon, value, title }: IWidgetProps) => {
    return (
        <div className="bg-[#fff] p-3 shadow-sm flex justify-between rounded-md items-center h-[120px] w-full">
            <div className="flex items-start flex-col gap-2">
                <span className=" bg-mainColor text-[#ffffff]  rounded-[50%] text-[1.8rem] w-[40px] h-[40px] flex items-center justify-center">{icon}</span>
                <p className="text-mainColor text-[14px] font-semibold ">{title}</p>
            </div>
            <span className="text-mainColor font-semibold text-[22px] ">{value}</span>
        </div>
    )
}

export default Widget