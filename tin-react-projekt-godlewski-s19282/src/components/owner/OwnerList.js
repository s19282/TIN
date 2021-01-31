import React from "react";
import {Link} from "react-router-dom";
import {getOwnersApiCall} from "../../apiCalls/ownerApiCalls";
import OwnerListTable from "./OwnerListTable";
import { withTranslation } from 'react-i18next';

class OwnerList extends React.Component
{
    constructor(props)
    {
        super(props);
        let notice = props.location.state && props.location.state.notice ? props.location.state.notice : ''
        this.state =
            {
                error: null,
                isLoaded: false,
                owners: [],
                notice: notice
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
        const { t } = this.props;

        if (error)
            content = <p>Błąd: {error.message}</p>
        else if (!isLoaded)
            content = <p>{t('owner.list.loadingData')}</p>
        else
            content = <OwnerListTable ownerList={owners} />

        return (
            <main>
                <h2>{t('owner.list.pageTitle')}</h2>
                {content}
                <p className="section-buttons">
                    <Link to="/owner/add" className="button-add">{t('owner.list.addNew')}</Link>
                </p>
                <p className="success">{this.state.notice}</p>
            </main >
        )
    }

}

export default withTranslation()(OwnerList);