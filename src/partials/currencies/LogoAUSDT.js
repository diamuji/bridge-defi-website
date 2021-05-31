import React from 'react';

export default function LogoAUSDT(props) {
    return (
        <svg viewBox="0 0 256 256" width={props.width} height={props.height} className={props.className}>
            <defs>
                <linearGradient id="a" x1=".843" x2=".206" y1=".135" y2=".886" gradientUnits="objectBoundingBox">
                    <stop offset="0" stop-color="#b6509e" />
                    <stop offset="1" stop-color="#2ebac6" />
                </linearGradient>
            </defs>
            <path fill="url(#a)" d="M128 256a128.976 128.976 0 01-25.8-2.6 127.309 127.309 0 01-45.77-19.261 128.366 128.366 0 01-46.375-56.315A127.357 127.357 0 012.6 153.8a129.251 129.251 0 010-51.593 127.31 127.31 0 0119.26-45.77 128.372 128.372 0 0156.317-46.378A127.33 127.33 0 01102.2 2.6a129.244 129.244 0 0151.593 0 127.308 127.308 0 0145.77 19.26 128.367 128.367 0 0146.375 56.316A127.343 127.343 0 01253.4 102.2a129.248 129.248 0 010 51.593 127.3 127.3 0 01-19.26 45.77 128.382 128.382 0 01-56.316 46.375A127.4 127.4 0 01153.8 253.4 128.977 128.977 0 01128 256zm0-242.287a115.145 115.145 0 00-23.033 2.322A113.657 113.657 0 0064.1 33.232a114.622 114.622 0 00-41.4 50.283 113.7 113.7 0 00-6.659 21.452 115.4 115.4 0 000 46.065 113.66 113.66 0 0017.2 40.866 114.627 114.627 0 0050.282 41.407 113.75 113.75 0 0021.453 6.658 115.381 115.381 0 0046.065 0 113.609 113.609 0 0040.866-17.2 114.622 114.622 0 0041.393-50.278 113.741 113.741 0 006.659-21.453 115.4 115.4 0 000-46.065 113.662 113.662 0 00-17.2-40.865A114.619 114.619 0 00172.485 22.7a113.74 113.74 0 00-21.453-6.659A115.145 115.145 0 00128 13.714z" />
            <path fill="#53ae94" d="M127.999 29.714a98.285 98.285 0 11-98.285 98.285 98.288 98.288 0 0198.285-98.285" />
            <path fill="#fff" d="M140.13 114.904v-14.621h33.435V78.006H82.521v22.277h33.439v14.609c-27.176 1.248-47.609 6.63-47.609 13.078s20.443 11.83 47.609 13.086v46.833h24.178v-46.837c27.127-1.252 47.519-6.63 47.519-13.072s-20.392-11.82-47.519-13.072m0 22.177v-.012c-.682.043-4.187.254-11.991.254-6.239 0-10.629-.177-12.176-.258v.02c-24.009-1.063-41.93-5.245-41.93-10.247s17.923-9.178 41.93-10.243v16.325c1.573.108 6.07.373 12.278.373 7.456 0 11.2-.311 11.893-.373v-16.325c23.962 1.067 41.842 5.252 41.842 10.237s-17.888 9.172-41.842 10.239" />
        </svg>
    );
}