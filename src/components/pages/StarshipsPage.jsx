import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom'
import Table from "../common/Table";
import {getStarships} from "../../services/swApiService";
import Button from "../common/Button";

const StarshipsPage = () => {
    const pageName = 'Starships';
    const [starships, setStarships] = useState([]);
    const history = useHistory();


    useEffect(() => {
        // localStorage.removeItem('starships')
        if (localStorage.getItem('starships')!==null) {
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

    const handleDelete = (id) => {
        const filteredStarships = starships.filter(starship => starship.id !== id);
        setStarships(filteredStarships)
    }

    const handleEdit = (id) => {
        history.push("/starship?id="+id);
    }

    const handleClick = () => {
        history.push("/starship");
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
            <Table
                data={starships}
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

export default StarshipsPage;
