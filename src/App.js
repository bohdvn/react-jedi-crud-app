import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

// import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "./components/navbar/NavBar";
import PeoplePage from "./components/pages/PeoplePage";
import PlanetsPage from "./components/pages/PlanetsPage";
import StarshipsPage from "./components/pages/StarshipsPage";
import PersonPage from "./components/pages/forms/PersonPage";
import PlanetPage from "./components/pages/forms/PlanetPage";
import StarshipPage from "./components/pages/forms/StarshipPage";
import NotFound from "./components/pages/NotFound";

function App() {

    return (
        <>
            <Navbar/>
            <div className="container">
                <Switch>
                    <Route path="/people" component={PeoplePage}/>}/>
                    <Route path="/planets" component={PlanetsPage}/>
                    <Route path="/starships" component={StarshipsPage}/>
                    <Route path="/person" component={PersonPage}/>}/>
                    <Route path="/planet" component={PlanetPage}/>
                    <Route path="/starship" component={StarshipPage}/>
                    <Route path="/not-found" component={NotFound}/>
                    <Redirect exact from="/" to="/people" component={PeoplePage}/>
                    <Redirect to="/not-found"/>
                </Switch>
            </div>
        </>
    );
}

export default App;
