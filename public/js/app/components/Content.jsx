import React from 'react';

function Content(props) {
    return(
        <main className="mdl-layout__content">
            {props.children}
        </main>
    );
}
Content.propTypes = {
    children: React.PropTypes.node,
};

export default Content;
