import { SVGProps } from 'react';

function SvgComponent(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            width={25}
            height={24}
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect x={0.5} width={24} height={24} rx={4} fill="#333" />
            <path
                d="M14.702 9.985h-1.33v5.522h1.33V9.985zM11.962 9.985h-1.33v5.522h1.33V9.985z"
                fill="#E25858"
            />
            <path
                d="M18.978 7.167a.644.644 0 00-.46-.605.62.62 0 00-.184-.045h-3.547a2.144 2.144 0 00-4.1 0H7.138a.641.641 0 00-.172.027h-.015a.641.641 0 00.09 1.246l.711 9.743A1.512 1.512 0 009.183 19h7.104a1.512 1.512 0 001.433-1.467l.708-9.734a.638.638 0 00.55-.632zm-6.242-.952a.937.937 0 01.69.302h-1.379a.932.932 0 01.69-.302zm3.55 11.575H9.184c-.081 0-.208-.133-.223-.344L8.258 7.81h8.957l-.701 9.635c-.016.211-.143.344-.227.344z"
                fill="#E25858"
            />
        </svg>
    );
}

export default SvgComponent;
