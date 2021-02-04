import React from "react";
import {Link} from 'react-router-dom'
import {getVehicleByIdApiCall} from "../../apiCalls/vehicleApiCalls";
import VehicleDetailsData from "./VehicleDetailsData";
import { withTranslation } from 'react-i18next';

class VehicleDetails extends React.Component
{
    constructor(props) {
        super(props);
        let{vehicleId} = props.match.params
        this.state = {
            vehicleId : vehicleId,
            vehicle : null,
            error : null,
            isLoaded : false,
            message : null
        }
    }

    componentDidMount() {
        this.fetchVehicleDetails()
    }

    fetchVehicleDetails = () =>{
        getVehicleByIdApiCall(this.state.vehicleId)
            .then(res => res.json())
            .then((data) => {
                if(data.message)
                {
                    this.setState({
                        vehicle : null,
                        message : data.message
                    })
                }
                else
                {
                    this.setState({
                        vehicle : data,
                        message : null
                    })
                }
                this.setState({
                    isLoaded : true
                })
            },
            (error) => {
                this.setState({
                    isLoaded : true,
                    error
                })
            })
    }

    render() {
        const {vehicle, error, isLoaded, message} = this.state
        let content;
        const { t } = this.props;

        if(error)
            content = <p>{t('validation.error')}: {error.message}</p>
        else if (!isLoaded)
            content = <p>{t('vehicle.details.loadingData')}</p>
        else if (message)
            content = <p>{message}</p>
        else
             content = <VehicleDetailsData vehicleData={vehicle}/>

        return (
            <main>
                <h2>{t('vehicle.details.details')}</h2>
                {content}
                <div className="section-buttons">
                    <Link to="/vehicles" className="form-button-cancel">{t('form.actions.return')}</Link>
                </div>
            </main>
        )
    }
}

export default withTranslation() (VehicleDetails)