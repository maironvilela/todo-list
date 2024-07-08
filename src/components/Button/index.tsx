type ButtonProps = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

export function Button({ children, ...rest }: ButtonProps) {
    return <button {...rest}>{children}</button>;
}
