import React, { useEffect, useState } from 'react';

export default function SidePanel(props) {
    const { title, onClose, isOpen, content } = props;
    const [opening, setOpening] = useState(true);

    const onCloseClick = () => {
        if (onClose) onClose();
    };

    useEffect(() => {
        setOpening(!isOpen);
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className={`fixed top-0 left-0 z-50 w-full h-full flex flex-row opacity-1 transition-opacity duration-75 ease ${
            opening && 'opacity-0'
        }`}>
            <div className="bg-white opacity-10 flex-grow cursor-pointer" onClick={onCloseClick} />
            <div className={`bg-darkblue-100 overflow-auto w-1/3 transform transition-all duration-75 ease ${opening && 'w-0'}`}>
                <div className="py-4 px-6">
                    {title && (
                        <div className="mb-4 pb-2 border-b border-gray-700 flex flex-row items-middle">
                            <span className="text-2xl text-gray-200 font-bold flex-grow">{title}</span>
                            <div className="ml-4 p-1 cursor-pointer" onClick={onCloseClick}>
                                <svg viewBox="0 0 24 24" width="24px" height="24px" fill="currentcolor">
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                </svg>
                            </div>
                        </div>
                    )}
                    {content && content(onCloseClick)}
                </div>
            </div>
        </div>
    );
}