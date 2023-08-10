import { Form, Accordion } from 'react-bootstrap';
import LogOut from '../../assets/images/utilityDashboard/logout.svg'
import { useEffect, useState } from 'react';

const Dashboard = () => {

    console.log("Dashboard page")
    let initialArray = [
        {
            databaseName: 'Schinder',
            tables: [
                {
                    tableName: 'User',
                    columns: ['id', 'First Name', 'Last Name', 'Age', 'Gender']
                },
                {
                    tableName: 'Company',
                    columns: ['id', 'Company Name', 'City', 'userId']
                }
            ]
        },
        {
            databaseName: 'Pepsico',
            tables: [
                {
                    tableName: 'User',
                    columns: ['id', 'First Name', 'Last Name', 'DOB', 'Gender']
                },
                {
                    tableName: 'Company',
                    columns: ['id', 'Company Name', 'Address', 'userId']
                }
            ]
        },
        {
            databaseName: 'Seasia',
            tables: [
                {
                    tableName: 'User',
                    columns: ['id', 'First Name', 'Last Name', 'DOB', 'Age']
                },
                {
                    tableName: 'Company',
                    columns: ['id', 'Company Name', 'Country', 'City', 'userId']
                }
            ]
        }
    ]

    const [selectedDatabase, setSelectedDatabase] = useState()

    const handleSelectDatabase = (event: any) => {
        setSelectedDatabase(event.target.value)
    }

    console.log(selectedDatabase, "database")

    return (
        <>
            {/* utility dashboard starts */}
            <section className="utilityDashboard">
                <div className="container-fluid px-0">

                    {/* top utility heading starts */}
                    <div className='topHeading p-4 d-flex justify-content-between align-items-center'>
                        <h1 className='mb-0'>Utility Portal Dashboard</h1>
                        <div>
                            <img src={LogOut} alt="logout" />
                            <span className='text-white ps-2 fs-6'>Logout</span>
                        </div>
                    </div>
                    {/* top utility heading ends */}

                    <div className='utilityDashboardWrapper px-4'>

                        {/* database dropdown starts */}
                        <div className='databaseDropdown my-4'>
                            <Form.Select aria-label="Default select example" onChange={(e) => handleSelectDatabase(e)} value={selectedDatabase}>
                                <option>Select Datatbase</option>
                                {initialArray.map((elem, index) => {
                                    console.log(elem, "Element")
                                    return <option key={index} value={index}>{elem.databaseName}</option>
                                })}
                                {/* <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option> */}
                            </Form.Select>
                        </div>
                        {/* database dropdown ends */}

                        {/* note section starts */}
                        <div className='noteWrapper fst-italic'>
                            <h6>Note:</h6>
                            <ol className='ps-4'>
                                <li>
                                    Complete empty structure: when nothing selected
                                </li>
                                <li>
                                    All columns obfuscated: when a table is selected
                                </li>
                                <li>
                                    Column not obfuscated: when a column is manually deselected
                                </li>
                            </ol>
                        </div>
                        {/* note section ends */}

                        {/* dataTable Accordion section starts */}
                        <div className='dataTable_Accordion '>
                            <p>To copy the data please select respective table</p>

                            <Accordion defaultActiveKey="0">
                                {initialArray.map((elem, index) => {
                                    return <Accordion.Item key={index} eventKey={index.toString()}>
                                        <Accordion.Header>
                                            <div className='d-flex align-items-center '>
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input mt-0 me-2"
                                                    id="exampleCheck1"
                                                />
                                                Information Scheme_1
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div className='accordianTable_column'>
                                                <div className='d-flex align-items-center '>
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input mt-0 me-2"
                                                        id="exampleCheck1"
                                                    />
                                                    <h6 className='fs-6 mb-0'>Information Scheme_1</h6>
                                                </div>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                })}

                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>
                                        <div className='d-flex align-items-center '>
                                            <input
                                                type="checkbox"
                                                className="form-check-input mt-0 me-2"
                                                id="exampleCheck1"
                                            />
                                            Information Scheme_1
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div className='accordianTable_column'>
                                            <div className='d-flex align-items-center '>
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input mt-0 me-2"
                                                    id="exampleCheck1"
                                                />
                                                <h6 className='fs-6 mb-0'>Information Scheme_1</h6>
                                            </div>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                        {/* dataTable Accordion section ends */}

                        {/* submit button */}
                        <div className='submitBtn mt-4 pt-3 text-end'>
                            <button className="btn btn-deepgreen px-5">
                                Submit
                            </button>
                        </div>

                    </div>

                </div>
            </section>
            {/* utility dashboard ends */}

        </>
    )
}

export default Dashboard