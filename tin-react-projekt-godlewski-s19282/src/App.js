import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Header from "./components/fragments/Header";
import Navigation from "./components/fragments/Navigation";
import MainContent from "./components/other/MainContent";
import Footer from "./components/fragments/Footer";
import Announcements from "./components/fragments/Announcements";
import OwnerList from "./components/owner/OwnerList";
import OwnerDetails from "./components/owner/OwnerDetails";
import OwnerForm from "./components/owner/OwnerForm";
import RegistrationList from "./components/registration/RegistrationList";
import RegistrationDetails from "./components/registration/RegistrationDetails";
import RegistrationForm from "./components/registration/RegistrationForm";
import VehicleList from "./components/vehicle/VehicleList";
import VehicleDetails from "./components/vehicle/VehicleDetails";
import VehicleForm from "./components/vehicle/VehicleForm";
import LoginForm from "./components/other/LoginForm";
import ProtectedRoute from "./components/other/ProtectedRoute";
import {getCurrentUser} from "./helpers/authHelper";
import AnnouncementDetails from "./components/announcement/AnnouncementDetails";
import AnnouncementList from "./components/announcement/AnnouncementList";
import AnnouncementForm from "./components/announcement/AnnouncementForm";
import PageNotFound from "./components/other/PageNotFound";

class App extends React.Component
{
    constructor(props) {
        super(props)
        this.state = {
            user: undefined,
            prevPath: ''
        }
    }

    handleLogin = (user) => {
        localStorage.setItem("user", user)
        this.setState({ user: user })
    }

    handleLogout = () => {
        localStorage.removeItem("user");
        this.setState({ user: undefined })
    }

    componentDidMount() {
        const currentUser = getCurrentUser()
        this.setState({ user: currentUser })
    }


    render() {
        return (
            <Router>
                    <Header/>
                    <div className="centerBox">
                        <Navigation handleLogout={this.handleLogout} />
                        <Switch>
                            <Route exact
                                   path="/login"
                                   render={() => (
                                       <LoginForm handleLogin={this.handleLogin} />
                                   )}/>

                            <Route exact path="/" component={MainContent}/>
                            {/*//todo logging cache*/}
                            <ProtectedRoute exact={true} path="/announcements" component={AnnouncementList} />
                            <ProtectedRoute exact={true} path="/announcement/details/:announcementId" component={AnnouncementDetails} />
                            <ProtectedRoute exact={true} path="/announcement/add" component={AnnouncementForm} />
                            <ProtectedRoute exact={true} path="/announcement/edit/:announcementId" component={AnnouncementForm} />
                            <ProtectedRoute exact={true} path="/announcement/delete/:announcementId" component={AnnouncementList} />

                            <ProtectedRoute exact={true} path="/owners" component={OwnerList} />
                            <ProtectedRoute exact={true} path="/owner/details/:ownerId" component={OwnerDetails} />
                            <Route exact={true} path="/owner/add" component={OwnerForm} />
                            <ProtectedRoute exact={true} path="/owner/edit/:ownerId" component={OwnerForm} />
                            <ProtectedRoute exact={true} path="/owner/delete/:ownerId" component={OwnerList} />

                            <ProtectedRoute exact={true} path="/registrations" component={RegistrationList} />
                            <ProtectedRoute exact={true} path="/registration/details/:registrationId" component={RegistrationDetails} />
                            <ProtectedRoute exact={true} path="/registration/add" component={RegistrationForm} />
                            <ProtectedRoute exact={true} path="/registration/edit/:registrationId" component={RegistrationForm} />
                            <ProtectedRoute exact={true} path="/registration/delete/:registrationId" component={RegistrationList} />

                            <Route exact path="/vehicles" component={VehicleList}/>
                            <Route exact={true} path="/vehicle/details/:vehicleId" component={VehicleDetails} />
                            <ProtectedRoute exact={true} path="/vehicle/add" component={VehicleForm} />
                            <ProtectedRoute exact={true} path="/vehicle/edit/:vehicleId" component={VehicleForm} />
                            <ProtectedRoute exact={true} path="/vehicle/delete/:vehicleId" component={VehicleList} />
                            <Route path="" component={PageNotFound} />
                        </Switch>
                        <Announcements/>
                    </div>
                    <Footer/>
            </Router>
        );
    }
}

export default App;
