import React from 'react';
import ReactLinkify from 'react-linkify';

const componentDecorator = (href, text, key) => (
    <a href={href} key={key} target="_blank" rel="noopener noreferrer">
        {text}
    </a>
);

export default function Linkify(props) {
    return (
        <ReactLinkify componentDecorator={componentDecorator}>
            {props.children}
        </ReactLinkify>
    );
};