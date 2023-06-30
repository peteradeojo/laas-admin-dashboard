interface IButtonProps {
    title?: string
    icon?: JSX.Element
    onClick?: () => void
    onKeyDown?: () => void
    className?: string
    disabled?: boolean

}

export const FilledButton = ({ title, icon, onClick, onKeyDown, className, disabled }: IButtonProps) => {
    return (
        <button disabled={disabled} onClick={onClick} className={`flex items-center justify-center gap-1 rounded-md p-[0.5rem] hover:bg-opacity-90 h-[38px] text-[14px] ${className}`} onKeyDown={onKeyDown}>
            {icon} {title}
        </button>
    )
}

export const OutlineButton = ({ title, icon, onClick, onKeyDown, className, disabled }: IButtonProps) => {
    return (
        <button onClick={onClick} disabled={disabled} className={`flex items-center justify-center gap-1 rounded-md p-[0.5rem] text-mainColor hover:border-mainColor hover:text-mainColor  h-[38px] text-[14px]  ${className} border-[1px] border-[#D6DDEB]`} onKeyDown={onKeyDown}>
            {icon} {title}
        </button>
    )
}