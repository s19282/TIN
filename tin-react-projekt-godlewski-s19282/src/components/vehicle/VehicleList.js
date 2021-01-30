import React from "react";
import {Link} from "react-router-dom";
import {getVehiclesApiCall} from "../../apiCalls/vehicleApiCalls";
import VehicleListTable from "./VehicleListTable";

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
                <p className="success">{this.state.notice}</p>
            </main >
        )
    }
}

export default VehicleList;