import React from "react";
import {Link} from "react-router-dom";
import {getAnnouncementsApiCallAdmin} from "../../apiCalls/announcementApiCalls";
import AnnouncementListTable from "./AnnouncementListTable";
import { withTranslation } from 'react-i18next';

class AnnouncementList extends React.Component
{
    constructor(props)
    {
        super(props);
        let notice = props.location.state && props.location.state.notice ? props.location.state.notice : ''
        this.state =
            {
                error: null,
                isLoaded: false,
                announcements: [],
                notice: notice
            }
    }

    componentDidMount()
    {
        this.fetchAnnouncementList()
    }

    fetchAnnouncementList = () =>
    {
        getAnnouncementsApiCallAdmin()
            .then(res => res.json())
            .then(
                (data) =>
                {
                    this.setState(
                        {
                        isLoaded: true,
                        announcements: data
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
        const {error,isLoaded,announcements} = this.state;
        let content;
        const { t } = this.props;

        if (error)
            content = <p>{t('validation.error')}: {error.message}</p>
        else if (!isLoaded)
            content = <p>{t('announcement.list.loadingData')}</p>
        else
            content = <AnnouncementListTable announcementList={announcements} />

        return (
            <main>
                <h2>{t('announcement.list.pageTitle')}</h2>
                {content}
                <p className="section-buttons">
                    <Link to="/announcement/add" className="button-add">{t('announcement.list.addNew')}</Link>
                </p>
                <p className="success">{this.state.notice}</p>
            </main >
        )
    }

}

export default withTranslation()(AnnouncementList);