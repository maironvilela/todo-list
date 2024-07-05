import * as React from 'react';
import { SVGProps } from 'react';
const SvgIconCheckedCheckBox = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={25}
        height={24}
        fill="none"
        {...props}
    >
        <g opacity={0.9}>
            <path
                fill="#5E60CE"
                d="M12.48 19.426a7.41 7.41 0 1 0 0-14.82 7.41 7.41 0 0 0 0 14.82Z"
            />
            <path
                fill="#5E60CE"
                d="M12.464 4.86A7.14 7.14 0 1 1 5.324 12a7.168 7.168 0 0 1 7.14-7.14Zm0-1.587a8.727 8.727 0 1 0 .072 17.454 8.727 8.727 0 0 0-.072-17.454Z"
            />
            <path
                fill="#F2F2F2"
                d="M15.93 9.342 11.6 13.674l-2.483-2.482-.836.835 3.319 3.319 5.168-5.168-.836-.836Z"
            />
        </g>
    </svg>
);
export default SvgIconCheckedCheckBox;
