import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { AiFillEdit } from 'react-icons/ai'
import Swal from 'sweetalert2'
import axios from '../../../utils/connection'

const EditList = ({ setRegister,list={nombre:''} }) => {
    const [show, setShow] = useState(false)
    const [name, setName] = useState(list.nombre)
    const [loading, setLoading] = useState(false)
    const hendelShow = () => {
        setShow(!show);
    };

    const hendelEdit = () => {
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
        axios.put('/films/'+list.id, {
            nombre: name
        })
            .then(({ data }) => {
                setTimeout(() => {
                    if (data.movieUpdated.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Ok',
                            text: 'edited list.'
                        })
                        setShow(false)
                        setRegister(data.movieUpdated.filmsListUpdated)
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: data.movieUpdated.message
                        })
                    }
                    setLoading(false);
                }, 600)

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
            <AiFillEdit
                color="#837650"
                className='mt-1 me-3 rounded-circle'
                onClick={hendelShow}
                style={{
                    width: 50,
                    height: 50,
                    cursor: 'pointer',
                    backgroundColor: "#a8a392"
                }} />
            <Modal show={show} onHide={hendelShow}>
                <Modal.Header closeButton>
                    <h3 className="title fw-bold">Edit List</h3>
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
                    <Button variant='warning' style={{ borderRadius: 50 }} onClick={hendelEdit} disabled={loading}>
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditList
