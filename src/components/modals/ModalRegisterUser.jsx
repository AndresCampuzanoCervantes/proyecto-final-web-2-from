import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import axios from '../../utils/connection'
import Swal from 'sweetalert2'
import PropTypes from 'prop-types'

const ModalRegisterUser = ({ showModal, hendleModal }) => {
    const [name, setName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [document, setDocument] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const cancelar = () => {
        setName('')
        setLastName('')
        setEmail('')
        setPassword('')
        setPhone('')
        setConfirmPassword('')
        setDocument('')
        hendleModal()
    }

    const createUser = async () => {
        const params = {
            nombres: name,
            apellidos: lastName,
            documento: document,
            telefono: phone,
            email,
            password,
        }
        const result = await axios.post('/user', params).catch(e => {
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

        const data = result.data
        if (data.success) {
            Swal.fire({
                icon: 'success',
                title: 'Registered',
                text: 'The user has successfully registered.'
            })
            cancelar()
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.message
            })
        }
    }


    const validateData = () => {
        if (name.trim().length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'First name is required.'
            })
            return false;
        }
        if (lastName.trim().length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Last name is required.'
            })
            return false;
        }
        if (document.trim().length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Document is required.'
            })
            return false;
        }
        if (email.trim().length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Email is required.'
            })
            return false;
        }
        if (password.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password is required.'
            })
            return false;
        }
        if (confirmPassword.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You must confirm the password.'
            })
            return false;
        }
        if (confirmPassword !== password) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'The passwords do not match.'
            })
            return false;
        }

        return true;
    }


    const registerUser = async () => {
        setLoading(true)
        if (!validateData()) {
            setLoading(false)
            return
        }
        await createUser()
        setLoading(false)
    }


    const soloNumeros = (e) => {
        const key = e.charCode;
        if (!(key >= 48 && key <= 57)) {
            e.preventDefault();
        }
    }

    return (
        <Modal show={showModal} onHide={cancelar}>
            <Modal.Header closeButton>
                <h3 className="title fw-bold">User register</h3>
            </Modal.Header>
            <Modal.Body>
                <label htmlFor="name" className='col-12 fw-bold'>First name:</label>
                <input id="name"
                    className='form-control mb-2'
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name} />
                <label htmlFor="lastName" className='col-12 fw-bold'>Last name:</label>
                <input id="lastName"
                    className='form-control mb-2'
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName} />
                <label htmlFor="document" className='col-12 fw-bold'>Document:</label>
                <input id="document"
                    className='form-control mb-2'
                    type="text"
                    onKeyPress={(e) => { soloNumeros(e) }}
                    maxLength="10"
                    onChange={(e) => setDocument(e.target.value)}
                    value={document} />
                <label htmlFor="phone" className='col-12 fw-bold'>Phone:</label>
                <input id="phone"
                    className='form-control mb-2'
                    type="text"
                    maxLength="10"
                    onKeyPress={(e) => { soloNumeros(e) }}
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone} />
                <label htmlFor="email" className='col-12 fw-bold'>Email:</label>
                <input id="email"
                    className='form-control mb-2'
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} />
                <label htmlFor="password" className='col-12 fw-bold'>Password:</label>
                <input id="password"
                    className='form-control mb-2'
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password} />
                <label htmlFor="Confirm Password" className='col-12 fw-bold'>Confirm Password:</label>
                <input id="Confirm Password"
                    className='form-control mb-2'
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={registerUser} id="btnRegistrar" disabled={loading}>To register</Button>
                <Button onClick={cancelar} className="btn-danger" id="btnCancelar" disabled={loading}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}

ModalRegisterUser.propTypes = {
    showModal: PropTypes.bool.isRequired,
    hendleModal: PropTypes.func.isRequired
}

ModalRegisterUser.defaultProps = {
    showModal: false
}

export default ModalRegisterUser