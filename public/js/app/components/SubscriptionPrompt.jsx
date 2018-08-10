import React, {Component} from 'react';
import notify from '../notifications';
import $ from 'jquery';

class SubscriptionPrompt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.tempClose = this.tempClose.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleInput(e) {
        this.setState({email: e.target.value});
    }

    handleSend() {
        let validEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!validEmail.test(this.state.email)) {
            notify({
                message: 'Παρακαλούμε βάλτε μια έγκυρη διεύθυνση email'
            });
        } else {
            $.ajax({
                method: "POST",
                url: "/subscribe#services",
                data: { email: this.state.email}
            })
            .done((msg) => {
                console.log(msg);
                notify({
                    message: 'Η εγγραφή ολοκληρώθηκε με επιτυχία!'
                });
                this.props.handleClose(false);
            })
            .fail((msg) => {
                console.log(msg);
            });


        }
    }

    handleKeyPress(e) {
        if (e.charCode === 13) {
            this.handleSend();
        }
    }

    tempClose() {
        this.props.handleClose(true);
    }

    componentWillAppear(callback) {
        callback();
    }

    componentWillEnter(callback) {
        callback();
    }

    componentWillLeave(callback) {
        $(this.DOMNode).fadeOut(100, callback);
    }

    componentWillUnmount() {
        if (process.env.NODE_ENV !== 'production') {
            console.log('Unmounted sub prompt');
        }
    }

    render() {
        return(
            <div id="subscribe-prompt" ref={(DOMNode) => {this.DOMNode = DOMNode;}}>
                <div className="container-fluid">
                    <span className="sub-desc">
                        Γράψου στο newsletter και μείνε ενήμερος για τα events της βραδινής Αθήνας!
                    </span>
                    <div className="input-group">
                        <input id="subscription-email" className="form-control" type="email" placeholder="Βάλε το email σου" onChange={this.handleInput} onKeyPress={this.handleKeyPress} value={this.state.email} />
                        <span className="input-group-btn">
                            <button className="btn btn-primary" id="subscription-confirm" onClick={this.handleSend}>
                                Εγγραφή
                            </button>
                        </span>
                    </div>
                    <button className="close" onClick={this.tempClose} id="close-sub-prompt">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
            </div>
        );
    }
}
SubscriptionPrompt.propTypes = {
    handleClose: React.PropTypes.func
};

export default SubscriptionPrompt;
