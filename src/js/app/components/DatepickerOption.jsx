import React, { Component } from 'react';
import SimpleOption from './SimpleOption.jsx';
import moment from 'moment';
import $ from 'jquery';

function HOC(SimpleOption) {
    class DatepickerOption extends Component {
        constructor(props) {
            super(props);

            this.$datepicker = undefined;
            this.handleClick = this.handleClick.bind(this);
        }

        componentDidMount() {
            this.$datepicker = $('#other-day-filter');
            this.$datepicker.datepicker({
                dateFormat: 'dd-mm-yy',
                minDate: new Date(),
                onSelect: () => {
                    let date = this.$datepicker.datepicker('getDate'); //the getDate method
                    this.props.onDateSelection(date);
                }
            });
        }

        handleClick() {
            this.$datepicker.datepicker("show");
        }

        render() {
            let date = moment(this.props.date);
            const extraProps = {
                type: 'radio',
                desc: (this.props.checked) ? date.format('ll') : this.props.desc,
                value: date.format('DD-MM-YYYY'),
                id: `${this.props.name}-filter`,
                onChange: this.handleClick
            };

            return (
                <SimpleOption
                    checked={this.props.checked}
                    desc={this.props.desc}
                    name={this.props.name}
                    { ...extraProps } />
            );
        }
    }
    DatepickerOption.propTypes = {
        date: React.PropTypes.number,
        checked: React.PropTypes.bool,
        desc: React.PropTypes.string,
        name: React.PropTypes.string,
        onDateSelection: React.PropTypes.func
    };

    return DatepickerOption;
}

const DatepickerOption = HOC(SimpleOption);

export default DatepickerOption;
