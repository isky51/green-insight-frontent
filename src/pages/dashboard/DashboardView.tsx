import { Accordion, Row, Col, Modal, Button } from "react-bootstrap";
import DashboardController from './DashboardController'
import TitleComponent from "../../component/tittle";
import Select from 'react-select';

/**
 * 
 * @returns Dashboard view page
 */
const DashboardView = () => {

  // Importing all states and functions from dashboard controller
  const {
    showSubmitModal,
    databaseState,
    activeKey,
    allTableWithColumn,
    updateModal,
    setUpdateModal,
    setNewDatabase,
    newDatabase,
    setActiveKey,
    databaseModalSubmit,
    handleSelectDatabase,
    handleSelectTable,
    handleCheckColumn,
    handleCheckTable,
    submitSelectedColumn,
    showErrorMessage,
    setShowErrorMessage,
    handleCloseDatabaseModal,
    isLoadingTableList,
    isLoadingColumnList
  } = DashboardController()

  return (
    <>
      {/* Obfuscation dashboard starts */}
      <TitleComponent title={"Obfuscation"} />

      <div className="bg-white" data-testid="dashboard">
        <Row>
          <Col lg="10" className="mx-auto">
            <div className='obfuscationDashboardWrapper bg-white px-md-4 px-0'>

              {/* database dropdown starts*/}
              <div className='databaseDropdown my-4' data-testid="select_database">
                <Select
                  placeholder="Select Database"
                  options={databaseState.map((elem) => {
                    return { label: elem?.name, value: elem?.id.toString() }
                  })}
                  className="custom-select"
                  onChange={handleSelectDatabase}
                  styles={{
                    option: (base, { isSelected }) => {
                      return {
                        ...base,
                        backgroundColor: isSelected ? "#215154" : "white",
                        color: isSelected ? "white"  : "black",
                      };
                    }
                  }}
                />
              </div>


              {/* database dropdown ends */}

              {/* note section starts */}
              <div className='noteWrapper fst-italic'>
                <h6>Note:</h6>
                <ol className='ps-4'>
                  <li>
                    Complete empty structure: when nothing is selected
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
              {!isLoadingTableList ? allTableWithColumn?.length > 0 && <>
                {/* dataTable Accordion section starts */}

                <div className='dataTable_Accordion '>
                  <p>To copy the data please select respective table</p>
                  <Accordion activeKey={activeKey.toString()}>
                    {allTableWithColumn?.map((elem: { tableName: string, t_id: any, tableChecked: boolean, columns: any }) => {
                      return <Accordion.Item key={elem?.t_id} eventKey={elem?.t_id.toString()}>
                        <Accordion.Header onClick={() => handleSelectTable(elem?.t_id.toString())}>
                          <div className='d-flex align-items-center font-18'>
                            <input
                              type="checkbox"
                              className="form-check-input mt-0 me-2"
                              checked={elem?.tableChecked || false}
                              onChange={(e) => {
                                setActiveKey(elem?.t_id)
                                handleCheckTable(elem.t_id, elem.tableChecked)
                              }}
                            />
                            {elem?.tableName}
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          {!isLoadingColumnList ? elem?.columns?.length &&

                            <div className='accordianTable_column'>
                              {elem?.columns?.map((column: any, ind: number) => {

                                return <div className='d-flex align-items-center' key={ind}>
                                  <input
                                    type="checkbox"
                                    className="form-check-input mt-0 me-2"
                                    checked={column?.checked || false}
                                    onChange={() => handleCheckColumn(elem.t_id, column?.coloum_name, column?.checked)}
                                  />
                                  <h6 className='fs-6 mb-0'>{column?.coloum_name}</h6>
                                </div>
                              })}

                            </div>
                            : (
                              <div className="d-flex justify-content-center align-items-center ">
                                <div className="spinner-border" role="status">
                                  <span className="visually-hidden">Loading...</span>
                                </div>
                              </div>

                            )
                          }
                        </Accordion.Body>
                      </Accordion.Item>
                    })}

                  </Accordion>
                </div>
                {/* dataTable Accordion section ends */}

                {/* submit button */}
                <div className='submitBtn my-4 pt-3 text-end'>
                  <button type="button" className="btn btn-deepgreen px-5" onClick={submitSelectedColumn}>
                    Submit
                  </button>
                </div>
              </>

                : (
                  <div className="d-flex justify-content-center align-items-center mt-5 pt-4">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>

                )}
              {/* obfuscate database modal */}
              <div className="valid-otp-wrap">
                <Modal className="modalObfuscate" show={showSubmitModal} onHide={() => handleCloseDatabaseModal()}
                >
                  <Modal.Header closeButton className="border-modal-login pb-4">
                  </Modal.Header>
                  <Modal.Body className="py-0 px-lg-4 px-md-2 px-0 mx-lg-4 mx-2">
                    <h3 className="authentication-txt font-22 text-center">
                      To obfuscate the selection
                      enter the database name below
                    </h3>
                    {" "}
                    <div className='d-flex align-items-center'>
                      <input
                        name="database"
                        className="form-control font-16"
                        placeholder="Enter new database name"
                        type="text"
                        value={newDatabase}
                        onChange={(e) => {
                          setShowErrorMessage(false)
                          setNewDatabase(e.target.value)
                        }
                        }
                      />
                      <button type="button" className='ps-md-3 ps-1 obfuscate-btn font-16'>_obfuscated</button>
                    </div>
                    {showErrorMessage && (
                      <h6 className="error-code text-danger ps-0 pt-2">
                        Please enter the database name
                      </h6>
                    )}

                    <div className="border-bottom-modal mb-md-5 mb-4">
                      <Button
                        type="submit"
                        className="btn btn-deepgreen"
                        onClick={() => databaseModalSubmit()}
                      >
                        Submit
                      </Button>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>

              {/*database creation modal*/}
              <div className="valid-otp-wrap">
                <Modal
                  className="modalObfuscate"
                  show={updateModal}
                  onHide={() => setUpdateModal(false)}
                >
                  <Modal.Header closeButton className="border-modal-login"></Modal.Header>
                  <Modal.Body
                    className="px-lg-4 px-2 m-4 mt-0">
                    <div className="text-center databaseCreation-txt">
                      <h3 className='mb-0 font-24'>The database creation is under process. It will reflect in some time.</h3>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      {/* Obfuscation dashboard ends */}

    </>
  )
}

export default DashboardView