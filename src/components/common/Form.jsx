import React, {useState, useEffect} from 'react';

import Input from "./Input";
import Button from "./Button";

const Form = ({columns, initialData, onAddData}) => {

    const [personData, setPersonData] = useState(initialData);
    const [inputError, setError] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        for (let key in personData) {
            if (personData[key].trim() === '') {
                setError(true)
                break;
            }
            setError(false)
        }
    }, [personData])

    const handleClick = (event) => {
        event.preventDefault();
        setIsSubmitted(true)
        if (!inputError) {
            onAddData(personData)
            setIsSubmitted(false)
        }
    }

    const handleChange = (event) => {
        const { currentTarget: input } = event;
        const data = { ...personData };
        data[input.name] = input.value;
        setPersonData(data)
    }

    if (!Object.keys(initialData).length) {
        return null;
    }

    const columnsForDisplay = columns.filter((columnName) => columnName !== 'id')

    return (
        <form>
            {columnsForDisplay.map(columnName => {
                return (
                    <div key={columnName}>
                        <Input
                            name={columnName}
                            label={columnName}
                            value={personData[columnName]}
                            type="input"
                            onChange={handleChange}
                        />
                        {inputError && (isSubmitted && !personData[columnName].trim()) &&
                        <div className="alert alert-danger" role="alert">
                            Field should not be empty
                        </div>
                        }
                    </div>
                )
            })}
            <Button
                label="Save"
                classes="alert alert-danger"
                onClick={handleClick}
                disabled={inputError}
            />
        </form>
    );
};

export default Form;
