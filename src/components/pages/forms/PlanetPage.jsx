import React, {useEffect, useState} from 'react';
import Form from "../../common/Form";
import {getPlanets} from "../../../services/swApiService";
import {useHistory} from "react-router-dom";

const columns = ['name', 'rotation_period', 'orbital_period', 'diameter', 'population'];

const PlanetPage = () => {
    const pageName = 'Planet';
    const [planets, setPlanets] = useState([]);
    const history = useHistory();


    useEffect(() => {
        // localStorage.removeItem('planets')
        if (localStorage.getItem('planets') !== null) {
            setPlanets(JSON.parse(localStorage.getItem('planets')))
        } else {
            const getData = async () => {
                const data = await getPlanets()
                localStorage.setItem('planets', JSON.stringify(data));
                console.log(data)
                setPlanets(data)
            }

            getData()
        }
    }, [])

    const handleAppPlanet = (planetData) => {
        let planetsData
        if (localStorage.getItem('planets') !== null) {
            planetsData = JSON.parse(localStorage.getItem('planets'))
            const id = getParameterByName('id');
            if (id !== null && id !== '') {
                planetsData = planetsData.filter(planet => planet.id !== id);
            }
        } else {
            planetsData = []
        }
        const data = [...planetsData, planetData];
        setPlanets(data)
        localStorage.setItem('planets', JSON.stringify(data))
        history.push("/planets");
    }

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    const getInitialPlanetsData = () => {
        const id = getParameterByName('id');
        if (id !== null && id !== '' && id !== 'undefined') {
            return planets.filter(planet => planet.id === id);
        } else {
            return columns.reduce((cols, columnName) => {
                cols[columnName] = "";
                return cols;
            }, {})
        }
    }

    const getColumnNames = () => {
        if (!planets.length) {
            return []
        }

        return Object.keys(planets[0])
    }

    return (
        <>
            <h2>{pageName} from Star Wars Universe</h2>
            <Form
                initialData={getInitialPlanetsData()}
                columns={getColumnNames()}
                onAddData={handleAppPlanet}
            />
        </>
    );
};

export default PlanetPage;
