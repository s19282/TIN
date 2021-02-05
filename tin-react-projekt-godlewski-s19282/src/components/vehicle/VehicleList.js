import React from "react";
import {Link} from "react-router-dom";
import {getVehiclesApiCall} from "../../apiCalls/vehicleApiCalls";
import VehicleListTable from "./VehicleListTable";
import { withTranslation } from 'react-i18next';
import {isAuthenticated} from "../../helpers/authHelper";

class VehicleList extends React.Component
{
    constructor(props) {
        super(props)
        let notice = props.location.state && props.location.state.notice ? props.location.state.notice : ''
        this.state =
            {
                error : null,
                isLoaded : false,
                vehicles : [],
                notice: notice
            }
    }

    componentDidMount() {
        this.fetchVehicleList()
    }

    fetchVehicleList = () =>
    {
        getVehiclesApiCall()
            .then(res => res.json())
            .then(
                (data) =>
                {
                    this.setState({
                        isLoaded: true,
                        vehicles : data
                    });
                },
                (error) =>
                {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }

    render()
    {
        const {error, isLoaded, vehicles} = this.state;
        let content;
        const { t } = this.props;

        if (error)
            content = <p>{t('validation.error')}: {error.message}</p>
        else if (!isLoaded)
            content = <p>{t('vehicle.list.loadingData')}</p>
        else
            content = <VehicleListTable vehicleList={vehicles}/>

        return (
            <main>
                <h2>{t('vehicle.list.pageTitle')}</h2>
                <p className={this.state.notice===""?"invisible":"success" }>{this.state.notice}</p>
                {content}
                {isAuthenticated() &&
                    <p className="section-buttons">
                        <Link to="/vehicle/add" className="button-add">{t('vehicle.list.addNew')}</Link>
                    </p>
                }</main >
        )
    }
}

export default withTranslation() (VehicleList);