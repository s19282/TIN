import React from "react";
import {Link} from "react-router-dom";
import {getVehiclesApiCall} from "../../apiCalls/vehicleApiCalls";
import OwnerListTable from "../owner/OwnerListTable";
import VehicleListTable from "./VehicleListTable";

class VehicleList extends React.Component
{
    constructor(props) {
        super(props);
        this.state =
            {
                error : null,
                isLoaded : false,
                vehicles : []
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

        if (error)
            content = <p>Błąd: {error.message}</p>
        else if (!isLoaded)
            content = <p>Ładowanie danych pojazdów...</p>
        else
            content = <VehicleListTable vehicleList={vehicles}/>

        return (
            <main>
                <h2>Lista pojazdów</h2>
                {content}
                <p className="section-buttons">
                    <Link to="/vehicle/add" className="button-add">Dodaj nowy pojazd</Link>
                </p>
            </main >
        )
    }
}

export default VehicleList;