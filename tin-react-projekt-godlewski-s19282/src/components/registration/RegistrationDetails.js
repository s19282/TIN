import React from "react";
import {Link} from 'react-router-dom'
import {getRegistrationByIdApiCall} from "../../apiCalls/registrationApiCalls";
import RegistrationDetailsData from "./RegistrationDetailsData";
import { withTranslation } from 'react-i18next';

class RegistrationDetails extends React.Component {
    constructor(props) {
        super(props);
        let {registrationId} = props.match.params
        this.state = {
            registrationId: registrationId,
            registration: null,
            error: null,
            isLoaded: false
        }
    }

    componentDidMount() {
        this.fetchRegistrationDetails();
    }

    fetchRegistrationDetails = () => {
        getRegistrationByIdApiCall(this.state.registrationId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            registration: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            registration: data,
                            message: null,
                        })
                    }
                    this.setState({
                        isLoaded: true,
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                })
    }

    render() {
        const {registration, error, isLoaded, message} = this.state
        let content;
        const { t } = this.props;

        if (error)
            content = <p>{t('validation.error')}: {error.message}</p>
        else if (!isLoaded)
            content = <p>{t('registration.details.loadingData')}</p>
        else if (message)
            content = <p>{message}</p>
        else
            content = <RegistrationDetailsData registrationData={registration}/>

        return (
            <main>
                <h2>{t('registration.details.details')}</h2>
                {content}
                <div className="section-buttons">
                    <Link to="/registrations" className="form-button-cancel">{t('form.actions.return')}</Link>
                </div>
            </main>
        )
    }
}

export default withTranslation() (RegistrationDetails)