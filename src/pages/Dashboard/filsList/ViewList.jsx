/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { ButtonGroup, Card, Dropdown } from 'react-bootstrap';
import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import axios from '../../../utils/connection';
const ViewList = () => {
    const history = useNavigate();
    const params = useParams();
    const dataId = params.id;
    const [listFilms, setListFilms] = useState([]);
    const [listStatus, setListStatus] = useState([]);

    useEffect(() => {
        const getFilms = () => {
            axios.post('/movie/getFilms', {
                id_lista_pelicula: dataId
            }).then(({ data }) => {
                const list = data.films.map(item => ({
                    ...item,
                    fecha_lanzamiento: formatDate(item.fecha_lanzamiento.replace("T", " ").replace("Z", " "))
                }))
                setListFilms(list);
            }).catch(console.error)
        }
        const getStatus = () => {
            axios.get("/parameter/1")
                .then(({ data }) => {
                    if (data.parameter) {
                        setListStatus(data.parameter.valoresParametros)
                    }
                });
        }
        getStatus();
        getFilms();

    }, [])

    const formatDate = (date) => {
        let d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = "0" + month;

        if (day.length < 2) day = "0" + day;

        return [year, month, day,].join("-");
    };

    const deletemovie = (item) => {
        Swal.fire({
            title: 'Are you sure you want to delete the movie?',
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
                axios.delete("/movie/" + item.id).then(({ data }) => {
                    if (data.movieId.success) {
                        const list = listFilms.filter(item2 => item2.id !== item.id);
                        setListFilms(list);
                        Swal.fire({
                            title: 'Removed.',
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

    const updateStatus = (item, status) => {
        axios.put("/movie/" + item.id, { ...item, view_ED_parametro: status }).then(({ data }) => {
            if (data.movieUpdated.success) {
                Swal.fire({
                    title: 'Updated.',
                    icon: 'success',
                    timer: 600,
                    showConfirmButton: false,
                }).then(() => {
                    const list = listFilms.map(item => {
                        if (item.id === data.movieUpdated.movieUpdated.id) {
                            return {
                                ...data.movieUpdated.movieUpdated,
                                fecha_lanzamiento: formatDate(data.movieUpdated.movieUpdated.fecha_lanzamiento.replace("T", " ").replace("Z", " "))
                            }
                        } else {
                            return item
                        }
                    })
                    setListFilms(list);
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.movieUpdated.message,
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
    return (
        <>
            <div className='row justify-content-end mb-2' style={{ marginLeft: '5%', marginRight: '5%' }}>
                <button
                    className="col-1 rounded-circle me-5 justify-content-center align-self-center btn-custom"
                    style={{ height: 50, width: 50, border: 'none' }}
                    onClick={() => { history('/searchMovies') }}
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
            </div>
            <div>
                {
                    listFilms.length > 0 ?
                        <div style={{ marginLeft: '5%', marginRight: '5%' }}>
                            <div className="row justify-content-start">
                                {
                                    listFilms.map((item) => (
                                        <Card
                                            key={item.id}
                                            style={{
                                                width: 548.571428571,
                                                textAlign: 'justify',
                                                padding: 0,
                                                border: 'none',
                                                borderRadius: '5%',
                                                backgroundColor: item.view_ED_parametro === 1 ? '#9fff9f' : item.view_ED_parametro === 2 ? '#9fc5ff' : '#ff9f9f'
                                            }}
                                            className="m-2"
                                        >
                                            <Dropdown as={ButtonGroup}>
                                                <Dropdown.Toggle style={{
                                                    position: 'absolute',
                                                    right: 5,
                                                    borderRadius: '50%',
                                                    backgroundColor: '#efefef6e',
                                                    top: 10,
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                }}>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {
                                                        listStatus.map(item2 =>
                                                            <Dropdown.Item
                                                                key={item2.id}
                                                                onClick={() => { updateStatus(item, item2.id) }}
                                                            >
                                                                {item2.valor_parametro}
                                                            </Dropdown.Item>)
                                                    }
                                                    <Dropdown.Item onClick={() => { deletemovie(item) }}>Remove</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            <img alt={item.nombre} width='100%' style={{ borderTopLeftRadius: '5%', borderTopRightRadius: '5%' }} src={`https://image.tmdb.org/t/p/original${item.path_imagen}`} />
                                            <Card.Body>
                                                <Card.Title>{`${item.nombre} - ${listStatus.find(item2 => item2.id === item.view_ED_parametro).valor_parametro}`}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">{item.fecha_lanzamiento}</Card.Subtitle>
                                                <Card.Text>
                                                    {item.sinopsis}
                                                </Card.Text>
                                            </Card.Body>

                                        </Card>
                                    ))
                                }
                            </div>
                        </div>
                        :
                        <div className="div4 align-middle" style={{ height: '80vh', padding: 0 }}>
                            registers not finded.
                        </div>
                }
            </div>


        </>
    )
}

export default ViewList