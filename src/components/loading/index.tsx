import { ComponentProps } from 'react';
import './loading.css';

type LoadingProps = ComponentProps<'svg'>;

export function Loading({ ...props }: LoadingProps) {
    return (
        <svg
            {...props}
            id="dots"
            width="132px"
            height="58px"
            viewBox="0 0 132 58"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs></defs>
            <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
            >
                <g id="dots" fill="#A3A3A3">
                    <circle id="dot1" cx="25" cy="30" r="13"></circle>
                    <circle id="dot2" cx="65" cy="30" r="13"></circle>
                    <circle id="dot3" cx="105" cy="30" r="13"></circle>
                </g>
            </g>
        </svg>
    );
}
