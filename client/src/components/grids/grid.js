import React, { useState } from 'react';
import { Table, Button, InputGroup, FormControl } from 'react-bootstrap';

import { Row, Col } from 'react-bootstrap';

import parse from 'html-react-parser';

const Grid = (props) => {
    const {
        data,
        fields,
        striped = false,
        enableSearch = false,
        enableEdit = false,
        enableDelete = false,
        enableIndex = true } = props;

    const [ searchedData, setSearchedData ] = useState(null);

 

    const doSearch = async (e) => {
        const val = e.target.value;
        let searchedList = (props.data.filter(o =>
            Object.keys(o).some(k => o[k].toString().toLowerCase().includes(val.toString().toLowerCase()))));
            searchedList.length > 0 ? setSearchedData(searchedList) : setSearchedData(null);
        
    }

    const editRow = async (data) => {
        props.editData(data);
        //setDatas(props.data);
    }

    const tableBody = (bodyData) =>    { return bodyData && bodyData.map((dr, i) => {
        return <tr>
            <td>{i + 1}</td>
            {fields.map(field => {
                if (field.name === 'image')
                    return <img width="45px" height="45px" className="rounded-circle p-1 shadow-sm"
                        src={dr[field.name]} />
                else
                    return <td>{parse(dr[field.name])}</td>
            })}
            {enableEdit && <td>
                <Button
                    onClick={() => {
                        editRow(dr)
                    }}
                    className="p-1 button muted-button"
                >
                    Edit
      </Button></td>}

            {enableDelete &&
                <td> <Button className="mx-1 p-1"
                    onClick={props.deleteData} id={dr._id}
                >Delete</Button></td>}

        </tr>
    }) || 'No records!'}


    return (
        <>
            {enableSearch &&
                <Row className="p-2">
                    <Col lg="4" md="4" sm="12" md={{ span: 8, offset: 8 }}>
                        <input
                            className="form-control"
                            type="text"
                            name="searchText"
                            placeholder="Search..."
                            onChange={doSearch}
                        />
                    </Col>
                </Row>
            }
            <Table size={props.size} striped={striped}>
                {fields &&
                    <thead className="thead-dark">
                        <tr>
                            {enableIndex &&
                                <th style={{ width: '5%' }}>#</th>
                            }
                            {fields.map((field, i) => {
                                return <th style={{ width: field.width }}>{field.title}</th>
                            })}

                            {enableEdit &&
                                <th style={{ width: '5%' }}>Edit</th>
                            }
                            {enableDelete &&
                                <th style={{ width: '5%' }}>Delete</th>
                            }
                        </tr>
                    </thead>
                
                }

                {searchedData && tableBody(searchedData) || tableBody(props.data)}

             
            </Table>

        </>
    );
}

export default Grid;