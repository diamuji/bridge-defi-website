import React, { useState } from 'react';
import useOnclickOutside from 'react-cool-onclickoutside';

export default function DropdownMenu(props) {
    const [open, setOpen] = useState(false);
    const ref = useOnclickOutside(() => setOpen(false));

    return (
        <div className="relative inline-flex ml-3">
            <button
                className={`w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition duration-150 rounded-full ${open && 'bg-gray-200'}`}
                onClick={() => setOpen(!open)}
            >
                {props.button}
            </button>
            {open && (
                <div
                    ref={ref}
                    className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
                >
                    {props.children}
                </div>
            )}
        </div>
    );
}