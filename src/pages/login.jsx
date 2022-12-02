/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import '../styles/login.css'
import 'animate.css'
import ModalRegisterUser from '../components/modals/ModalRegisterUser';
import axios from '../utils/connection';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoadin] = useState(false)
  const history = useNavigate();


  useEffect(() => {
    const startLogin = () => {
      const params = JSON.parse(localStorage.getItem('session'));
      if (params) {
        history('/home')
      }
    }
    startLogin();
  }, [])


  const consultarUsuario = async () => {
    try {

      if (email.trim().length === 0) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email is required to enter the system.'
        })
        return
      }

      if (password.trim().length === 0) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'The password is required to enter the system.'
        })
        return
      }

      const data = {
        email,
        password
      }

      const res = await axios.post('/user/signin',
        data
      ).catch(e => {
        console.error(e)
        if (Object.keys(e.response.data).length !== 0) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: e.response.data.message
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Server connection error contact administrator.'
          })
        }
      })
      if (res) {
        const data = res.data;
        if (data.user.success) {
          localStorage.setItem('session', JSON.stringify(data.user));
          history('/home')
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: res.data.user.message
          })
        }
      }
      //return res;
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadin(true);
    await consultarUsuario()
    setLoadin(false);
    //  history('/home')
  }

  const handleEmail = async (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = async (e) => {
    setPassword(e.target.value)
  }

  const hendleRegisterUser = () => {
    setShowModal(!showModal)
  }

  return (
    <>
      <ModalRegisterUser
        showModal={showModal}
        hendleModal={hendleRegisterUser} />
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6 animate__animated animate__fadeIn animate__faster animate__delay-1s">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid" alt="logo"></img>
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 animate__animated animate__fadeInDown animate__faster animate__delay-1s from-div rounded-3">
              <form onSubmit={handleSubmit} >
                <div className='text-center my-4 fs-1 fw-bolder' style={{ paddingRight: "100px" }}>
                  CRUD MOVIESPLUS
                </div>
                <div className="form-outline mb-4 ">
                  <label className="form-label fw-bold mt-3" htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmail}
                    className="form-control" />
                </div>
                <div className="form-outline mb-4 ">
                  <label className="form-label fw-bold" htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control form-control-lg"
                    value={password}
                    onChange={handlePassword}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-lg btn-block col-12" id='initSession' disabled={loading}>Log In</button>

                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                </div>

                <div className="d-flex justify-content-around align-items-center mb-4">
                  <button type="button" className="btn btn-outline-success btn-lg btn-block col-12" onClick={hendleRegisterUser} disabled={loading}>Create new account</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login