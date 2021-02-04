import React from "react";
import {withTranslation} from "react-i18next";
import {getAnnouncementsApiCall} from "../../apiCalls/announcementApiCalls";

class Announcements extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {announcements: []}
    }

    componentDidMount()
    {
        this.fetchAnnouncementList()
    }

    fetchAnnouncementList = () =>
    {
        getAnnouncementsApiCall()
            .then(res => res.json())
            .then(
                (data) =>
                {
                    this.setState({announcements: data});
                }
            )
    }
    handleLanguageChange = (language) => {
        const { i18n } = this.props
        i18n.changeLanguage(language, (err, t) => {
            if (err) return console.log('something went wrong loading', err);
        });
    }
    render()
    {
        const {announcements} = this.state;
        const { t } = this.props;

        return (
            <div className="rightPanel">
                <h4>
                    <p>{t('rightPanel.selectLang')}</p>
                    <ul className="chooseLang">
                        <li className='lang'><button onClick={() => { this.handleLanguageChange('pl') }}>PL</button></li>
                        <li><button onClick={() => { this.handleLanguageChange('en') }}>EN</button></li>
                    </ul>
                </h4>
                {announcements.map(announcement =>
                    <h4 key={announcement.id}>{announcement.text}</h4>
                )}
            </div>
        )
    }

}
export default withTranslation()(Announcements)