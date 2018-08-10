import React from 'react';
import SimpleOption from './SimpleOption.jsx';

function HOC(SimpleOption) {
    function TypeOption(props) {
        const extraProps = {
            type: 'checkbox',
            value: props.name,
            id: `${props.name}-filter`
        };

        return (
            <SimpleOption { ...props } { ...extraProps } />
        );
    }
    TypeOption.propTypes = {
        name: React.PropTypes.string
    };

    return TypeOption;
}

const TypeOption = HOC(SimpleOption);

export default TypeOption;
