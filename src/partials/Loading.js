import React from 'react';

export default function Loading(props) {
    if (props.if) {
        return (
            <div className={`text-center ${props.className || ''}`}>
                <div className="loading-spinner">
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    } else {
        return props.children;
    }
}