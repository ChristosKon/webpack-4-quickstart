import React from 'react';

function SimpleOption({ id, name, value, checked, desc, onChange, isNew, type }) {
    return (
        <div className={type}>
            <label className="rad">
                <input
                    checked={checked}
                    onChange={onChange}
                    id={id}
                    name={name}
                    type={type}
                    value={value} />
                <i></i>
                <span style={(checked) ? {color: '#00838f'} : {color: '#333'}}>
                    {desc}
                </span>
            </label>
            {(isNew) ? <span style={{marginLeft: '1rem'}} className="label label-info m-l-1">Νέο</span> : null}
        </div>
    );
}
SimpleOption.propTypes = {
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    value: React.PropTypes.string,
    checked: React.PropTypes.bool,
    desc: React.PropTypes.string,
    onChange: React.PropTypes.func,
    isNew: React.PropTypes.bool,
    type: React.PropTypes.string,
};

export default SimpleOption;
