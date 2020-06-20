import React, {useEffect, useState} from 'react';
import Form from "../../common/Form";
import {getStarships} from "../../../services/swApiService";
import {useHistory} from "react-router-dom";

const columns = ['name', 'model', 'manufacturer', 'passengers', 'length'];

const StarshipPage = () => {
    const pageName = 'Starship';
    const [starships, setStarships] = useState([]);
    const history = useHistory();


    useEffect(() => {
        // localStorage.removeItem('starships')
        if (localStorage.getItem('starships') !== null) {
            setStarships(JSON.parse(localStorage.getItem('starships')))
        } else {
            const getData = async () => {
                const data = await getStarships()
                localStorage.setItem('starships', JSON.stringify(data));
                console.log(data)
                setStarships(data)
            }

            getData()
        }
    }, [])

    const handleAppStarship = (starshipData) => {
        let starshipsData
        if (localStorage.getItem('starships') !== null) {
            starshipsData = JSON.parse(localStorage.getItem('starships'))
            const id = getParameterByName('id');
            if (id !== null && id !== '') {
                starshipsData = starshipsData.filter(starship => starship.id !== id);
            }
        } else {
            starshipsData = []
        }
        const data = [...starshipsData, starshipData];
        setStarships(data)
        localStorage.setItem('starships', JSON.stringify(data))
        history.push("/starships");
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

    const getInitialStarshipsData = () => {
        const id = getParameterByName('id');
        if (id !== null && id !== '' && id !== 'undefined') {
            return starships.filter(starship => starship.id === id);
        } else {
            return columns.reduce((cols, columnName) => {
                cols[columnName] = "";
                return cols;
            }, {})
        }
    }

    const getColumnNames = () => {
        if (!starships.length) {
            return []
        }

        return Object.keys(starships[0])
    }

    return (
        <>
            <h2>{pageName} from Star Wars Universe</h2>
            <Form
                initialData={getInitialStarshipsData()}
                columns={getColumnNames()}
                onAddData={handleAppStarship}
            />
        </>
    );
};

export default StarshipPage;
