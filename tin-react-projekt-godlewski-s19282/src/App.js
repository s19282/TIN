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


function App() {
  return (
    <Router>
        <div>
            <Header/>
            <Navigation/>
            <Switch>
                <Route exact path="/" component={MainContent}/>

                <Route exact path="/owners" component={OwnerList}/>
                <Route exact path="/owner/details/:ownerId" component={OwnerDetails}/>
                <Route exact path="/owner/add" component={OwnerForm}/>
                <Route exact path="/owner/edit/:ownerId" component={OwnerForm}/>

                <Route exact path="/registrations" component={RegistrationList}/>
                <Route exact path="/registration/details/:registrationId" component={RegistrationDetails}/>
                <Route exact path="/registration/add" component={RegistrationForm}/>
                <Route exact path="/registration/edit/:registrationId" component={RegistrationForm}/>

                <Route exact path="/vehicles" component={VehicleList}/>
                <Route exact path="/vehicle/details/:vehicleId" component={VehicleDetails}/>
                <Route exact path="/vehicle/add" component={VehicleForm}/>
                <Route exact path="/vehicle/edit/:vehicleId" component={VehicleForm}/>
            </Switch>
            <Announcements/>
            <Footer/>
        </div>
    </Router>
  );
}

export default App;
