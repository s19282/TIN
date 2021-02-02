import React from "react";
import {withTranslation} from "react-i18next";

class Announcements extends React.Component
{
    handleLanguageChange = (language) => {
        const { i18n } = this.props
        i18n.changeLanguage(language, (err, t) => {
            if (err) return console.log('something went wrong loading', err);
        });
    }
    render()
    {
        return (
            <div className="rightPanel">
                <li className='lang'><button onClick={() => { this.handleLanguageChange('pl') }}>PL</button></li>
                <li><button onClick={() => { this.handleLanguageChange('en') }}>EN</button></li>
                <h4>a2</h4>
                <h4>a3</h4>
            </div>
        )
    }

}
export default withTranslation()(Announcements)