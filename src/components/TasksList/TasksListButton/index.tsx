import { ButtonHTMLAttributes, ElementType } from 'react';
interface TasksListButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: ElementType;
    isRendered?: boolean;
}
export function TasksListButton({
    icon: Icon,
    isRendered = true,
    ...rest
}: TasksListButtonProps) {
    return (
        <>
            {isRendered && (
                <button {...rest}>
                    <Icon />
                </button>
            )}
        </>
    );
}
