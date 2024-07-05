import { SVGProps } from 'react';
const SvgIconUncheckedCheckBox = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={25}
        height={24}
        fill="#000"
        {...props}
    >
        <path
            fill="#4EA8DE"
            d="M12.464 4.86A7.14 7.14 0 1 1 5.324 12a7.168 7.168 0 0 1 7.14-7.14Zm0-1.587a8.727 8.727 0 1 0 .072 17.454 8.727 8.727 0 0 0-.072-17.454Z"
        />
    </svg>
);
export default SvgIconUncheckedCheckBox;
