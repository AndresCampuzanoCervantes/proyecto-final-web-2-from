import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { AiOutlinePlus } from 'react-icons/ai'
import Swal from 'sweetalert2'
import axios from '../../../utils/connection'

const RegisterList = ({ setNewRegister }) => {
    const [show, setShow] = useState(false)
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const hendelShow = () => {
        setShow(!show);
    };

    const hendelRegister = () => {
        if (!name) {
            if (name.trim().length === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Name is required.'
                })
                return false;
            }
        }
        setLoading(true)
        const params = JSON.parse(localStorage.getItem('session'));
        const id_usuario = params.user.id
        axios.post('/films', {
            nombre: name,
            id_usuario
        })
            .then(({data}) => { 
                setTimeout(()=>{
                    if (data.movieCreated.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Ok',
                            text: 'registered list.'
                        })
                        setName('')
                        setShow(false)
                        setNewRegister({
                            nombre: name,
                            id_usuario,
                            estado: 1
                        })
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: data.movieCreated.message
                        })
                    }
                    setLoading(false);
                },600)
                
            })
            .catch((e) => { 
                setLoading(false);
                console.error(e)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Server connection error.'
                })
            });
    }

    return (
        <>
            <button
                className="col-1 rounded-circle justify-content-center align-self-center btn-custom"
                style={{ height: 50, width: 50, border: 'none' }}
                onClick={hendelShow}
            >
                <AiOutlinePlus
                    size={40}
                    color="#fff"
                    style={
                        {
                            cursor: 'pointer',
                            alignItems: 'center',
                            alignSelf: 'center',
                            marginLeft: '-6px'
                        }
                    }
                />
            </button>
            <Modal show={show} onHide={hendelShow}>
                <Modal.Header closeButton>
                    <h3 className="title fw-bold">Create List</h3>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="name" className='col-12 fw-bold'>name:</label>
                    <input id="name"
                        className='form-control mb-2'
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name} />
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ borderRadius: 50 }} onClick={hendelRegister} disabled={loading}>
                        register
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default RegisterList
