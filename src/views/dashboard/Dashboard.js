import React, { useMemo, useState, useEffect } from 'react'
import styles from '../../Styles/modules/dashboard.module.scss'

import {
  CFormSelect,
  CButton,
  CCard,
  CCardBody,
  CFormInput,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'

import WidgetsDropdown from '../widgets/WidgetsDropdown'
import {
  getTypeDropdown,
  declareresult,
  list,
  getmastertablelist,
} from 'src/_services/profile.service'
import { Form } from 'react-router-dom'

const Dashboard = () => {
  const [ErrorObject, setErrorObject] = useState({})
  const [TableLists, setTableLists] = useState([])
  const [SessionLists, setSessionLists] = useState([])
  const [InputsValue, setInputsValue] = useState({})

  const [FilterData, setFilterData] = useState({
    role: '648ab62a2a9cdc3b38da1f9c',
  })
  const [resultlist, setresultlist] = useState([])
  const [depositresult, setDepositResult] = useState([])

  useEffect(() => {
    declareresult().then((response) => {
      console.log(response, 'response')
      if (response?.success) {
        setresultlist(response?.data?.records)
      }
    })
  }, [])

  useEffect(() => {
    getmastertablelist({
      length: 100,
      filter: {
        type: '648ab62a2a9cdc3b38da1f9c',
      },
    }).then((response) => {
      if (response?.success) {
        setTableLists(response?.data?.records)
      }
    })
  }, [])

  useEffect(() => {
    getmastertablelist({
      length: 100,
      filter: {
        type: '648809675115c82490f5cdf6',
      },
    }).then((response) => {
      if (response?.success) {
        setSessionLists(response?.data?.records)
      }
    })
  }, [])

  const onChangeFilter = (e) => {
    setFilterData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const onChangeInputs = (e) => {
    setInputsValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErrorObject({})
  }

  const cards = [
    {
      value: {
        amount: '0',
      },
    },
  ]

  const table = [
    {
      user: {
        name: 'Yiorgos Avraamu',
        number: '01572 00000',
        new: true,
        registered: 'date',
      },

      country: { name: 'USA' },

      credit: { name: '10000 INR' },

      amount: { name: '5000 INR' },
    },
  ]

  return (
    <>
      <WidgetsDropdown />

      <CCard>
        <CCardBody>
          <div style={{ borderBottom: '3px solid #3c4b64', padding: '10px', fontWeight: 'bold' }}>
            Declare Result
          </div>
        </CCardBody>
        <CCard style={{ margin: '10px' }}>
          <div style={{ padding: '20px' }}>
            <CRow>
              <CCol>
                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#3c4b64' }}>Date</p>
                <CFormInput type="date" aria-describedby="exampleFormControlInputHelpInline" />
              </CCol>
              <CCol>
                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#3c4b64' }}>
                  Market Name
                </p>
                <CFormSelect
                  aria-label="Default select example"
                  name="Session"
                  invalid={ErrorObject?.game}
                  onChange={onChangeInputs}
                >
                  <option>Choose role</option>
                  {TableLists &&
                    TableLists?.map((items, index) => {
                      return (
                        <>
                          <option value={items._id} key={index}>
                            {items.name}
                          </option>
                        </>
                      )
                    })}{' '}
                </CFormSelect>
              </CCol>
              <CCol>
                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#3c4b64' }}>Session</p>
                <CFormSelect
                  aria-label="Default select example"
                  name="game"
                  invalid={ErrorObject?.game}
                  onChange={onChangeInputs}
                >
                  <option>Choose Session</option>
                  {SessionLists &&
                    SessionLists?.map((items, index) => {
                      return (
                        <>
                          <option value={items._id} key={index}>
                            {items.name}
                          </option>
                        </>
                      )
                    })}{' '}
                </CFormSelect>
              </CCol>
              <CCol>
                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#3c4b64' }}>Pana</p>
                <CFormInput type="number" placeholder="5" />
              </CCol>
              <CCol>
                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#3c4b64' }}>Digit</p>
                <CFormInput type="number" placeholder="0000...." />
              </CCol>
            </CRow>
          </div>
          <br />
        </CCard>
      </CCard>
      <br />
      <CCard>
        <CCardBody>
          <div style={{ borderBottom: '3px solid #3c4b64', padding: '10px', fontWeight: 'bold' }}>
            <CFormInput
              type="date"
              aria-describedby="exampleFormControlInputHelpInline"
              style={{ width: '15%' }}
            />
          </div>
        </CCardBody>
        <CCard style={{ margin: '10px' }}>
          <CRow>
            <CCol xs>
              <CCardBody>
                <CTable align="middle" className="mb-0 border" hover responsive bordered>
                  <CTableHead color="dark">
                    <CTableRow>
                      <CTableHeaderCell className="text-center">
                        <CIcon icon={cilPeople} />
                      </CTableHeaderCell>
                      <CTableHeaderCell>Market Name</CTableHeaderCell>
                      <CTableHeaderCell>Result Date</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">Open Pana</CTableHeaderCell>
                      <CTableHeaderCell>Close Pana</CTableHeaderCell>
                      <CTableHeaderCell>Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {resultlist?.map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index}>
                        <CTableDataCell className="text-center">
                          <p>{index}</p>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>{item.market_name.name}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div className="small text-medium-emphasis">{item.result_date}</div>
                        </CTableDataCell>
                        <CTableDataCell></CTableDataCell>
                        <CTableDataCell className="text-center"></CTableDataCell>
                        <CTableDataCell></CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCol>
          </CRow>
        </CCard>
      </CCard>

      {/* <CCard className="mb-4">
        <CCardBody>
          <div style={{ borderBottom: '3px solid #3c4b64', padding: '10px', fontWeight: 'bold' }}>
            MARKIT BIT DETAILS
          </div>
        </CCardBody>
        <CCard style={{ margin: '10px' }}>
          <div style={{ padding: '20px' }}>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#3c4b64' }}> Game Name</p>
            <CFormSelect
              aria-label="Default select example"
              options={[
                'Open this select menu',
                { label: 'One', value: '1' },
                { label: 'Two', value: '2' },
                { label: 'Three', value: '3', disabled: true },
              ]}
            />
            <br />
            <div className={styles.addNumber}>
              <input type="text" placeholder="0" style={{ width: '3%' }}></input>
              <p style={{ fontSize: '15px', fontWeight: 'bold', color: '#3c4b64' }}>
                Market Amount{' '}
              </p>
            </div>
          </div>
        </CCard>
      </CCard> */}

      {/* <CCard className="">
        <CCardBody>
          <div style={{ borderBottom: '3px solid #3c4b64', padding: '10px', fontWeight: 'bold' }}>
            TOTAL BIDS ON SINGLE ANK OF DATE 16-JUNE-2023
          </div>
        </CCardBody>
        <CCard style={{ margin: '10px' }}>
          <div style={{ padding: '20px' }}>
            <CRow>
              <CCol>
                <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#3c4b64' }}> Game Name</p>
                <CFormSelect
                  aria-label="Default select example"
                  options={[
                    'Open this select menu',
                    { label: 'One', value: '1' },
                    { label: 'Two', value: '2' },
                    { label: 'Three', value: '3', disabled: true },
                  ]}
                />
              </CCol>
              <CCol>
                <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#3c4b64' }}> Session</p>
                <CFormSelect
                  aria-label="Default select example"
                  options={[
                    'Open this select menu',
                    { label: 'One', value: '1' },
                    { label: 'Two', value: '2' },
                    { label: 'Three', value: '3', disabled: true },
                  ]}
                />
              </CCol>
              <CCol>
                <CButton color="primary" style={{ width: 'inherit', marginTop: '45px' }}>
                  Get Detail
                </CButton>
              </CCol>
            </CRow>
          </div>
        </CCard>
      </CCard> */}

      <CRow style={{ padding: '20px' }}>
        {cards.map((item, index) => (
          <>
            {/* <CCol style={{ margin: '20px' }} xs={3}>
              <CCard>
                <CCardBody className="text-center" style={{ color: '#3c4b64' }}>
                  <h5 style={{ fontSize: '17px', fontWeight: 'bold' }}>Total Bids</h5>
                  <h5 style={{ fontSize: '40px' }}>{item.value.amount}</h5>
                  <p>Total Bid Amount</p>
                  <a style={{ backgroundColor: '#3c4b64', display: 'block', color: 'white' }}>
                    Ank 0
                  </a>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol style={{ margin: '20px' }} xs={3}>
              <CCard>
                <CCardBody className="text-center" style={{ color: '#3c4b64' }}>
                  <h5 style={{ fontSize: '17px', fontWeight: 'bold' }}>Total Bids</h5>
                  <h5 style={{ fontSize: '40px' }}>{item.value.amount}</h5>
                  <p>Total Bid Amount</p>
                  <a style={{ backgroundColor: '#3c4b64', display: 'block', color: 'white' }}>
                    Ank 0
                  </a>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol style={{ margin: '20px' }} xs={3}>
              <CCard>
                <CCardBody className="text-center" style={{ color: '#3c4b64' }}>
                  <h5 style={{ fontSize: '17px', fontWeight: 'bold' }}>Total Bids</h5>
                  <h5 style={{ fontSize: '40px' }}>{item.value.amount}</h5>
                  <p>Total Bid Amount</p>
                  <a style={{ backgroundColor: '#3c4b64', display: 'block', color: 'white' }}>
                    Ank 0
                  </a>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol style={{ margin: '20px' }} xs={3}>
              <CCard>
                <CCardBody className="text-center" style={{ color: '#3c4b64' }}>
                  <h5 style={{ fontSize: '17px', fontWeight: 'bold' }}>Total Bids</h5>
                  <h5 style={{ fontSize: '40px' }}>{item.value.amount}</h5>
                  <p>Total Bid Amount</p>
                  <a style={{ backgroundColor: '#3c4b64', display: 'block', color: 'white' }}>
                    Ank 0
                  </a>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol style={{ margin: '20px' }} xs={3}>
              <CCard>
                <CCardBody className="text-center" style={{ color: '#3c4b64' }}>
                  <h5 style={{ fontSize: '17px', fontWeight: 'bold' }}>Total Bids</h5>
                  <h5 style={{ fontSize: '40px' }}>{item.value.amount}</h5>
                  <p>Total Bid Amount</p>
                  <a style={{ backgroundColor: '#3c4b64', display: 'block', color: 'white' }}>
                    Ank 0
                  </a>
                </CCardBody>
              </CCard>
            </CCol> */}
            <CCol style={{ margin: '20px' }} lg={3} xs={12}>
              <CCard>
                <CCardBody className="text-center" style={{ color: '#3c4b64' }}>
                  <h5 style={{ fontSize: '17px', fontWeight: 'bold' }}>Total Bids</h5>
                  <h5 style={{ fontSize: '40px' }}>{item.value.amount}</h5>
                  <p>Total Bid Amount</p>
                  <a style={{ backgroundColor: '#3c4b64', display: 'block', color: 'white' }}>
                    Ank 0
                  </a>
                </CCardBody>
              </CCard>
            </CCol>
          </>
        ))}
      </CRow>

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Deposit Point</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive bordered>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>User</CTableHeaderCell>

                    <CTableHeaderCell>Amount</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Created at</CTableHeaderCell>
                    <CTableHeaderCell> Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {table.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <p>1</p>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.user.name}</div>
                        <div className="small text-medium-emphasis">{item.user.number}</div>
                      </CTableDataCell>

                      <CTableDataCell>{item.amount.name}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.credit.name}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color="light">Complated</CButton>
                        <CButton style={{ marginLeft: '10px' }} color="light">
                          Cancel
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
