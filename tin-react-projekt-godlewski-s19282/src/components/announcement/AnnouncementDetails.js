import React from "react";
import {Link} from "react-router-dom";
import {getAnnouncementByIdApiCall} from "../../apiCalls/announcementApiCalls";
import AnnouncementDetailsData from "./AnnouncementDetailsData";
import { withTranslation } from 'react-i18next';


class AnnouncementDetails extends React.Component
{
    constructor(props)
    {
        super(props);
        let {announcementId} = props.match.params
        this.state =
        {
            announcementId : announcementId,
            announcement : null,
            error : null,
            isLoaded : false,
            message : null
        }
    }

    fetchAnnouncementDetails = () => {
        getAnnouncementByIdApiCall(this.state.announcementId)
            .then(res => res.json())
            .then((data) => {
                if(data.message) {
                    this.setState({
                        announcement : null,
                        message : data.message
                    })
                }
                else {
                    this.setState({
                        announcement : data,
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
        this.fetchAnnouncementDetails()
    }

    render()
    {
        const {announcement, error, isLoaded, message } = this.state
        let content;
        const { t } = this.props;


        if(error)
            content = <p>{t('validation.error')}: {error.message}</p>
        else if (!isLoaded)
            content = <p>{t('announcement.details.loadingData')}</p>
        else if (message)
            content = <p>{message}</p>
        else
            content = <AnnouncementDetailsData announcementData={announcement}/>

        return (
            <main>
                <h2>{t('announcement.details.details')}</h2>
                {content}
                <div className="section-buttons">
                    <Link to="/announcements" className="form-button-cancel">{t('form.actions.return')}</Link>
                </div>
            </main>
        )
    }
}

export default withTranslation()(AnnouncementDetails)