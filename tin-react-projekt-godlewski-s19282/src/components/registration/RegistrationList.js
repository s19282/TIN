import React from "react";
import {Link} from 'react-router-dom'
import {getRegistrationsApiCall} from "../../apiCalls/registrationApiCalls";
import RegistrationListTable from "./RegistrationListTable";
import { withTranslation } from 'react-i18next';

class RegistrationList extends React.Component
{
    constructor(props) {
        super(props)
        let notice = props.location.state && props.location.state.notice ? props.location.state.notice : ''
        this.state = {
            error: null,
            isLoaded: false,
            employments: [],
            notice: notice
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
        const { t } = this.props;

        if (error)
            content = <p>{t('validation.error')}: {error.message}</p>
        else if (!isLoaded)
            content = <p>{t('registration.list.loadingData')}</p>
        else
            content = <RegistrationListTable registrationsList={registrations} />

        return (
            <main>
                <h2>{t('registration.list.pageTitle')}</h2>
                <p className={this.state.notice===""?"invisible":"success" }>{this.state.notice}</p>
                {content}
                <p className="section-buttons">
                    <Link to="/registration/add" className="button-add">{t('registration.list.addNew')}</Link>
                </p>
            </main>
        )
    }
}

export default withTranslation() (RegistrationList)