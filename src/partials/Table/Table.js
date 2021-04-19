import React from 'react';

export default function Table(props) {
    return (
        <div className="bg-white shadow-lg rounded-sm border border-gray-200 text-gray-600">
            {props.title && (
                <header className="px-5 py-4">
                    <h2 className="font-semibold text-gray-800">
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