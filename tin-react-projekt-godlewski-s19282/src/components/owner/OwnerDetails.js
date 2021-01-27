import React from "react";
import {Link} from "react-router-dom";
import {getOwnerByIdApiCall} from "../../apiCalls/ownerApiCalls";
import OwnerDetailsData from "./OwnerDetailsData";


class OwnerDetails extends React.Component
{
    constructor(props)
    {
        super(props);
        let {ownerId} = props.match.params
        this.state = {
            ownerId : ownerId,
            owner : null,
            error : null,
            isLoaded : false,
            message : null
        }
    }

    fetchOwnerDetails = () => {
        getOwnerByIdApiCall(this.state.ownerId)
            .then(res => res.json())
            .then((data) => {
                if(data.message) {
                    this.setState({
                        owner : null,
                        message : data.message
                    })
                }
                else {
                    this.setState({
                        owner : data,
                        message : null
                    })
                }
                this.setState({
                    isLoaded: true
                })
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            })
    }

    componentDidMount() {
        this.fetchOwnerDetails()
    }

    render()
    {
        const {owner, error, isLoaded, message } = this.state
        let content;

        if(error)
            content = <p>Błąd: {error.message}</p>
        else if (!isLoaded)
            content = <p>Ładowanie danych właściciela</p>
        else if (message)
            content = <p>{message}</p>
        else
            content = <OwnerDetailsData ownerData={owner}/>

        return (
            <main>
                <h2>Szczegóły właściciela</h2>
                {content}
                <div className="section-buttons">
                    <Link to="/owners" className="button-back">Powrót</Link>
                </div>
            </main>
        )
    }
}

export default OwnerDetails