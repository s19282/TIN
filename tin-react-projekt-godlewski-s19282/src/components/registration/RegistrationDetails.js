import React from "react";
import {Link} from 'react-router-dom'
import {getRegistrationByIdApiCall} from "../../apiCalls/registrationApiCalls";
import RegistrationDetailsData from "./RegistrationDetailsData";

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

        if (error)
            content = <p>Błąd: {error.message}</p>
        else if (!isLoaded)
            content = <p>Pobieranie danych rejestracji...</p>
        else if (message)
            content = <p>{message}</p>
        else
            content = <RegistrationDetailsData registrationData={registration}/>

        return (
            <main>
                <h2>Szczegóły rejestracji</h2>
                {content}
                <div className="section-buttons">
                    <Link to="/registrations" className="button-back">Powrót</Link>
                </div>
            </main>
        )
    }
}

export default RegistrationDetails