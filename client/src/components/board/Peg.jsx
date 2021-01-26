import React, { useState } from 'react';

export const Peg = (props) => {
    const [node] = useState(props.node);

    return (
        <button
            id={node.id}
            value={node.value}
            onClick={() => toogleName()}
            className={getStyle()}>
            {/* {node.displayValue} */}
        </button>
    );

    function getStyle() {
        let style = 'pegbttn ';
        style += node.stylename + ' ';
        style += node.displayValue === 'O' ? 'greyIt' : '';
        return style;
    }

    function toogleName() {
        props.handleSelect(node.id);
    }
}

