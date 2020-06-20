import React from 'react';
import Button from "./Button";

function Table({columns, data, tableDescriptor, onDelete, onEdit}) {

    if (!data.length) {
        return <h2>There is no data for {tableDescriptor} page</h2>
    }

    return (
        <table className="table table-dark">
            <thead>
            <tr>
                <th scope="col">{tableDescriptor}</th>
                {columns.map(columnTitle => (
                    <th key={columnTitle} scope="col">{columnTitle}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={item.id}>
                    <th scope="row">{++index}</th>
                    {columns.map(columnTitle => (
                        <td key={item[columnTitle] + columnTitle}>{item[columnTitle]}</td>
                    ))}
                    <td>
                        <Button
                            onClick={() => onEdit(item.id)}
                            classes="btn btn-primary"
                            label="Edit"
                        />
                    </td>
                    <td>
                        <Button
                            onClick={() => onDelete(item.id)}
                            classes="btn btn-danger"
                            label="Delete"
                        />
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default Table;
