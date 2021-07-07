import { Component } from 'react';

import ExchangeRate from '../Components/ExchangeRate';

/**
 *
 *
 * @class Contact
 * @extends {Component}
 */
class Contact extends Component {
    /**
     *
     *
     * @return {*} 
     * @memberof Contact
     */
    render() {
        return (
            <div>
                <h2>Contact</h2>
                <ExchangeRate />
            </div>
        )
    }
}

export default Contact;