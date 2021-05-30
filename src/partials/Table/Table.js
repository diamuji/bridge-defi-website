import React from 'react';

export default function Table(props) {
    return (
        <div className="bg-darkblue-200 text-gray-200 shadow-lg rounded-sm overflow-hidden">
            {props.title && (
                <header className="px-5 py-4">
                    <h2 className="font-semibold text-gray-200">
                        {props.title}
                    </h2>
                </header>
            )}
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    {props.children}
                </table>
            </div>
        </div>
    );
}