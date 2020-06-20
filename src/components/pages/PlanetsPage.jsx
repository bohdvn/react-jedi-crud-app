import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom'
import Table from "../common/Table";
import {getPlanets} from "../../services/swApiService";
import Button from "../common/Button";

const PlanetsPage = () => {
    const pageName = 'Planets';
    const [planets, setPlanets] = useState([]);
    const history = useHistory();


    useEffect(() => {
        // localStorage.removeItem('planets')
        if (localStorage.getItem('planets')!==null) {
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

    const handleDelete = (id) => {
        const filteredPlanets = planets.filter(planet => planet.id !== id);
        setPlanets(filteredPlanets)
    }

    const handleEdit = (id) => {
        history.push("/planet?id="+id);
    }

    const handleClick = () => {
        history.push("/planet");
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
            <Table
                data={planets}
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

export default PlanetsPage;
