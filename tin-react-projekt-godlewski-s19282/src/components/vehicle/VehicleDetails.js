import React from "react";
import {Link, useParams} from 'react-router-dom'
import {getVehicleByIdApiCall} from "../../apiCalls/vehicleApiCalls";
import OwnerDetailsData from "../owner/OwnerDetailsData";
import VehicleDetailsData from "./VehicleDetailsData";

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
        getVehicleByIdApiCall(this.state.vechicleId)
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

        if(error)
            content = <p>Błąd: {error.message}</p>
        else if (!isLoaded)
            content = <p>Ładowanie danych pojazdu</p>
        else if (message)
            content = <p>{message}</p>
        else
            content = <VehicleDetailsData vehicleData={vehicle}/>

        return (
            <main>
                <h2>Szczegóły pojazdu</h2>
                {content}
                <div className="section-buttons">
                    <Link to="/vehicles" className="button-back">Powrót</Link>
                </div>
            </main>
        )
    }
}

export default VehicleDetails