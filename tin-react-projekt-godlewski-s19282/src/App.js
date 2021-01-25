import React from 'react';
import Header from "./components/fragments/Header";
import Navigation from "./components/fragments/Navigation";
import MainContent from "./components/other/MainContent";
import Footer from "./components/fragments/Footer";
import Announcements from "./components/fragments/Announcements";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import OwnerList from "./components/owner/OwnerList";
import OwnerDetails from "./components/owner/OwnerDetails";
import OwnerForm from "./components/owner/OwnerForm";
import RegistrationList from "./components/registration/RegistrationList";
import RegistrationDetails from "./components/registration/RegistrationDetails";
import RegistrationForm from "./components/registration/RegistrationForm";

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
                <Route exact path="/registration" component={RegistrationList}/>
                <Route exact path="/registration/details/:registrationId" component={RegistrationDetails}/>
                <Route exact path="/registration/add" component={RegistrationForm}/>
                <Route exact paht="/registration/edit/:registrationId" component={RegistrationForm}/>
            </Switch>
            <Announcements/>
            <Footer/>
        </div>
    </Router>
  );
}

export default App;
