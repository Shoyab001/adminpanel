import './styles.css'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormFeedback,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { Loginapi } from '../../../_services/auth.service'
import { toast } from 'react-toastify'
import Validation from './validation'
import { useDispatch } from 'react-redux'

const Login = () => {
  const dispatch = useDispatch()
  const [InputsValue, setInputsValue] = useState({})
  const [ErrorObject, setErrorObject] = useState({
    mobile_number: '',
    password: '',
  })

  const history = useNavigate()

  useEffect(() => {
    if (sessionStorage.getItem('user-info')) {
      // setTimeout(() => {
      //   history('/')
      // }, 500)
    }
  }, [])
  const onChangeInputs = (e) => {
    setErrorObject({})
    setInputsValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const [IsLoading, setIsLoding] = useState(false)

  const handleLogin = (e) => {
    setErrorObject({})
    // setIsLoding(true)
    e.preventDefault()
    Validation(InputsValue, setErrorObject)
    if (ErrorObject.mobile_number || ErrorObject.password) {
      return
    }
    Loginapi(InputsValue).then((response) => {
      // setIsLoding(false)
      console.log(response, 'response')
      if (response?.success) {
        toast.success('login success')
        let data = response?.data
        let users = response?.data
        sessionStorage.setItem('role', users?._id)
        sessionStorage.setItem('token_key', data?.token)
        sessionStorage.setItem('users', JSON.stringify(users))
        // dispatch({ type: 'login-success' })
        // // console.log(result)
        navigate('/dashboard')
      } else {
        setErrorObject((prev) => ({ ...prev, password: 'Invalid mobile_number or password.' }))
      }
    })
  }

  const navigate = useNavigate()
  function changePassword() {
    navigate('/changePassword')
  }

  // console.log(InputsValue.mobile_number)
  // console.log(InputsValue.password)
  return (
    <div className=" max-vh-100 min-vh-100 d-flex flex-row align-items-center background">
      <CContainer>
        <div
          className="justify-content-center"
          style={{
            width: 'fit-content',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <CCardGroup>
            <CCard className="">
              <CCardBody className="text-center">
                <div className="d-flex flex-column ms-5 mx-5">
                  <div className="text-center">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                      style={{ width: '185px' }}
                      alt="logo"
                    />
                    <h4 className="mt-1 mb-5 pb-1">Raddy</h4>
                  </div>

                  <p>Please login to your account</p>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      name="mobile_number"
                      placeholder="mobile_number"
                      autoComplete="mobile_number"
                      invalid={ErrorObject?.mobile_number ? true : false}
                      onChange={(e) => {
                        onChangeInputs(e)
                        setErrorObject('')
                      }}
                    />
                    <CFormFeedback invalid> {ErrorObject?.mobile_number}</CFormFeedback>
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      name="password"
                      placeholder="password"
                      autoComplete="current-password"
                      invalid={setErrorObject?.password}
                      onChange={(e) => {
                        onChangeInputs(e)
                        setErrorObject('')
                      }}
                    />
                    <CFormFeedback invalid> {ErrorObject?.password}</CFormFeedback>
                  </CInputGroup>

                  <div className="text-center pt-1 mb-5 pb-1">
                    <CButton
                      className="mb-5 w-100 gradient-custom-2"
                      onClick={(e) => {
                        handleLogin(e)
                      }}
                    >
                      {' '}
                      Sign in
                    </CButton>
                    <a className="text-muted" onClick={changePassword}>
                      Forgot password?
                    </a>
                  </div>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </div>
      </CContainer>
    </div>
  )
}

export default Login
