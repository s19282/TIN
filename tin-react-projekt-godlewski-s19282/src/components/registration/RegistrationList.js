import React from "react";
import {Link} from 'react-router-dom'
import {getRegistrationsApiCall} from "../../apiCalls/registrationApiCalls";
import RegistrationListTable from "./RegistrationListTable";

class RegistrationList extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            employments: []
        }
    }

    componentDidMount() {
        this.fetchRegistrationList();
    }

    fetchRegistrationList = () => {
        getRegistrationsApiCall()
            .then(res => res.json())
            .then((data) =>{
                this.setState({
                    isLoaded: true,
                    registrations: data
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            })
    }

    render() {
        const {error, isLoaded, registrations} = this.state
        let content;

        if (error)
            content = <p>Błąd: {error.message}</p>
        else if (!isLoaded)
            content = <p>Ładowanie danych rejestracji...</p>
        else
            content = <RegistrationListTable registrationsList={registrations} />

        return (
            <main>
                <h2>Lista rejestracji</h2>
                {content}
                <p className="section-buttons">
                    <Link to="/registration/add" className="button-add">Dodaj nową rejestrację</Link>
                </p>
            </main>
        )
    }
}

export default RegistrationList