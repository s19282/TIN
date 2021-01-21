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

function App() {
  return (
    <Router>
        <div>
            <Header/>
            <Navigation/>
            <Switch>
                <Route exact path="/" component={MainContent}/>
                <Route exact path="/owners" component={OwnerList}/>
            </Switch>
            <Announcements/>
            <Footer/>
        </div>
    </Router>
  );
}

export default App;
