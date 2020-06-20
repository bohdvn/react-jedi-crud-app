import React, {useEffect, useState} from 'react';
import Form from "../../common/Form";
import {getPeople} from "../../../services/swApiService";
import {useHistory} from "react-router-dom";

const columns = ['name', 'height', 'mass', 'gender', 'birth_year'];

const PersonPage = () => {
    const pageName = 'Person';
    const [people, setPeople] = useState([]);
    const history = useHistory();


    useEffect(() => {
        // localStorage.removeItem('people')
        if (localStorage.getItem('people') !== null) {
            setPeople(JSON.parse(localStorage.getItem('people')))
        } else {
            const getData = async () => {
                const data = await getPeople()
                localStorage.setItem('people', JSON.stringify(data));
                console.log(data)
                setPeople(data)
            }

            getData()
        }
    }, [])

    const handleAppPerson = (personData) => {
        let peopleData
        if (localStorage.getItem('people') !== null) {
            peopleData = JSON.parse(localStorage.getItem('people'))
            const id = getParameterByName('id');
            if (id !== null && id !== '') {
                peopleData = peopleData.filter(person => person.id !== id);
            }
        } else {
            peopleData = []
        }
        const data = [...peopleData, personData];
        setPeople(data)
        localStorage.setItem('people', JSON.stringify(data))
        history.push("/people");
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

    const getInitialPeopleData = () => {
        const id = getParameterByName('id');
        if (id !== null && id !== '' && id !== 'undefined') {
            return people.filter(person => person.id === id);
        } else {
            return columns.reduce((cols, columnName) => {
                cols[columnName] = "";
                return cols;
            }, {})
        }
    }

    const getColumnNames = () => {
        if (!people.length) {
            return []
        }

        return Object.keys(people[0])
    }

    return (
        <>
            <h2>{pageName} from Star Wars Universe</h2>
            <Form
                initialData={getInitialPeopleData()}
                columns={getColumnNames()}
                onAddData={handleAppPerson}
            />
        </>
    );
};

export default PersonPage;
