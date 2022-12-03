import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import axios from '../../../utils/connection';

const User = () => {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [document, setDocument] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [id, setId] = useState('')

  useEffect(() => {
    const params = JSON.parse(localStorage.getItem('session'));
    setId(params.user.id)
    axios.get("/user/" + params.user.id).then(({ data }) => {
      setName(data.user.nombres)
      setLastName(data.user.apellidos)
      setDocument(data.user.documento)
      setEmail(data.user.email)
      setPhone(data.user.telefono)
    })
  }, [])

  const soloNumeros = (e) => {
    const key = e.charCode;
    if (!(key >= 48 && key <= 57)) {
      e.preventDefault();
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

  const updateData = () => {
    if (!validateData()) {
      return
    } else {
      const params = {
        nombres: name,
        apellidos: lastName,
        documento: document,
        telefono: phone,
        email,
        password,
      }
      axios.put("/user/" + id, params).then(({ data }) => {
        if (data.userUpdated.success) {
          delete data.userUpdated.userUpdated.password
          const user = data.userUpdated.userUpdated
          localStorage.setItem('session', JSON.stringify({user}));
          Swal.fire({
            title: 'Updated.',
            icon: 'success',
            timer: 600,
            showConfirmButton: false,
          })
        }
      }).catch((error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Server connection error.'
        })
      });
    }

  }


  return (
    <div className='container'>
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
      <div className='row justify-content-end my-3'>

        <Button onClick={updateData} className="col-3 me-3">To update</Button>
      </div>
    </div>
  )
}

export default User