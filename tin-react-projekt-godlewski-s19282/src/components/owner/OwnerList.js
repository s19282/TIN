import React from "react";
import {Link} from "react-router-dom";
import {getOwnersApiCall} from "../../apiCalls/ownerApiCalls";
import OwnerListTable from "./OwnerListTable";

class OwnerList extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state =
            {
                error: null,
                isLoaded: false,
                owners: []
            }
    }

    componentDidMount()
    {
        this.fetchOwnerList()
    }

    fetchOwnerList = () =>
    {
        getOwnersApiCall()
            .then(res => res.json())
            .then(
                (data) =>
                {
                    this.setState(
                        {
                        isLoaded: true,
                        owners: data
                    });
                },
                (error) =>
                {
                    this.setState(
                        {
                        isLoaded: true,
                        error
                    })
                }
            )
    }


    render()
    {
        const {error,isLoaded,owners} = this.state;
        let content;

        if (error)
            content = <p>Błąd: {error.message}</p>
        else if (!isLoaded)
            content = <p>Ładowanie danych właścicieli...</p>
        else
            content = <OwnerListTable ownerList={owners} />

        return (
            <main>
                <h2>Lista właścicieli</h2>
                { content}
                <p className="section-buttons">
                    <Link to="/owner/add" className="button-add">Dodaj nowego właściciela</Link>
                </p>
            </main >
        )
    }

}

export default OwnerList;