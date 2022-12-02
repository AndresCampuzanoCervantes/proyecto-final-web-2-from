import { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import MenuBar from '../../../components/Navbar';
import "../../../styles/filslist.css"
import axios from '../../../utils/connection';
import EditList from './EditList';
import RegisterList from './RegisterList';

const FilsList = () => {
    const history = useNavigate();
    const [newRegister, setNewRegister] = useState({});
    const [editRegister, setEditRegister] = useState({});
    const [listFilms, setListFilms] = useState([]);
    useEffect(() => {
        if (Object.keys(newRegister).length > 0) {
            const list = [...listFilms, newRegister];
            setListFilms(list)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newRegister]);

    useEffect(() => {
        if (Object.keys(editRegister).length > 0) {
            const list = listFilms.map((item) => {
                if (item.id === editRegister.id) {
                    return editRegister
                } else {
                    return item;
                }
            });
            setListFilms(list)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editRegister]);

    useEffect(() => {
        const getList = () => {
            axios.get("/films/getFilms").then(({ data }) => {
                setListFilms(data.films)
            }).catch((e) => {
                console.log(e)
            });
        }
        getList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteList = (item) => {
        Swal.fire({
            title: 'Are you sure you want to delete the list?',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
            showCancelButton: true,
            cancelButtonColor: 'rgb(95 96 96)',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Ok',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
            icon: 'warning',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete("/films/" + item.id).then(({ data }) => {
                    if (data.movieId.success) {
                        const list = listFilms.filter(item2 => item2.id !== item.id);
                        setListFilms(list);
                        Swal.fire({
                            title: 'removed.',
                            icon: 'success',
                            timer: 600,
                            showConfirmButton: false,
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Server connection error.',
                            timer: 600,
                        })
                    }

                }).catch((error) => {
                    console.error(error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Server connection error.'
                    })
                })
            }
        })
    }

    const select =(id)=>{
        history(`/listFilms/${id}`)
    }

    return (
        <>
            <MenuBar />
            <div className='row justify-content-end'>
                <RegisterList setNewRegister={setNewRegister} />
            </div>
            <div className='container'>
                {
                    listFilms.map((item) =>
                        <Card
                            key={item.id}
                            className="my-2 card-custom"
                        >
                            <div className='row justify-content-end'>
                                <EditList setRegister={setEditRegister} list={item} />
                                <AiFillDelete
                                    color="#835050"
                                    className='mt-1 me-3 rounded-circle'
                                    onClick={() => { deleteList(item) }}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        cursor: 'pointer',
                                        backgroundColor: "#a17878a2"
                                    }} />
                            </div>
                            <Card.Body style={{
                                cursor: 'pointer'
                            }} onClick={()=>{select(item.id)}}>
                                <Card.Title> {item.nombre} </Card.Title>
                            </Card.Body>
                        </Card>
                    )
                }

            </div>
        </>
    )
}

export default FilsList;
