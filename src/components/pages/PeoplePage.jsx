import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom'
import Table from "../common/Table";
import {getPeople} from "../../services/swApiService";
import Button from "../common/Button";


const PeoplePage = () => {
    const pageName = 'People';
    const [people, setPeople] = useState([]);
    const history = useHistory();

    useEffect(() => {
        // localStorage.removeItem('people')
        if (localStorage.getItem('people')!==null) {
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

    const handleDelete = (id) => {
        const filteredPeople = people.filter(person => person.id !== id);
        setPeople(filteredPeople)
    }

    const handleEdit = (id) => {
        history.push("/person?id="+id);
        console.log(id)
    }

    const handleClick = () => {
        history.push("/person");
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
            <Table
                data={people}
                columns={getColumnNames()}
                tableDescriptor={pageName}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />
            <Button
                label="Create Person"
                classes="alert alert-primary"
                onClick={handleClick}
            />
        </>
    );
};

export default PeoplePage;
