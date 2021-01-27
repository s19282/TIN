import React from 'react';
import Header from "./components/fragments/Header";
import Navigation from "./components/fragments/Navigation";
import MainContent from "./components/other/MainContent";
import Footer from "./components/fragments/Footer";
import Announcements from "./components/fragments/Announcements";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
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
                <Route exact path="/owners/details/:ownerId" component={OwnerDetails}/>
                <Route exact path="/owners/add" component={OwnerForm}/>
                <Route exact path="/owners/edit/:ownerId" component={OwnerForm}/>

                <Route exact path="/registrations" component={RegistrationList}/>
                <Route exact path="/registrations/details/:registrationId" component={RegistrationDetails}/>
                <Route exact path="/registrations/add" component={RegistrationForm}/>
                <Route exact path="/registrations/edit/:registrationId" component={RegistrationForm}/>

                <Route exact path="/vehicles" component={VehicleList}/>
                <Route exact path="/vehicles/details/:vehicleId" component={VehicleDetails}/>
                <Route exact path="/vehicles/add" component={VehicleForm}/>
                <Route exact path="/vehicles/edit/:vehicleId" component={VehicleForm}/>
            </Switch>
            <Announcements/>
            <Footer/>
        </div>
    </Router>
  );
}

export default App;
