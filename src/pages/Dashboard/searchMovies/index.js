/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect,  useState } from 'react'
import { Card, Modal } from 'react-bootstrap';
import axiosLocal from '../../../utils/connection'
import "../../../styles/listStyle.css"
import Swal from 'sweetalert2';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
const SearchMovies = () => {
    const [listMovies, setlistMovies] = useState([]);
    const api_key = "c2fdeb24edd254ed1f8d8a5997f683ea";
    const [page,setPage] =  useState(1);
    const [total_pages,setTotal_pages] =  useState(0);
    const [listFilms, setListFilms] = useState([]);
    const [show, setShow] = useState(false)
    const [movie, setMovie] = useState({});


    const getMovies = () => {
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&page=${page}`).then(({ data }) => {

            const list = data.results.map((item) => ({
                id_pelicula: item.id,
                nombre: item.original_title,
                path_imagen: item.backdrop_path,
                sinopsis: item.overview,
                fecha_lanzamiento: item.release_date,
            }))
            setlistMovies(list);
            setTotal_pages(data.total_pages);
        })
    }
    useEffect(() => {
        getMovies();
        const getList = () => {
            axiosLocal.get("/films/getFilms").then(({ data }) => {
                setListFilms(data.films)
            }).catch((e) => {
                console.log(e)
            });
        }
        getList();
    }, [page])

    const ModalSelectList = ({ show, setShow, listFilms, movie }) => {

        const hendelSelect = (id) => {
            const data = {
                id_lista_pelicula: id,
                id_pelicula: movie.id_pelicula,
                nombre: movie.nombre,
                path_imagen: movie.path_imagen,
                fecha_lanzamiento: movie.fecha_lanzamiento,
                sinopsis: movie.sinopsis,
                view_ED_parametro: 1
            }
            axiosLocal.post('/movie/', data)
                .then(({ data }) => {
                    if (data.movieCreated.success) {
                        setShow(!show)
                        Swal.fire({
                            title: 'registered.',
                            icon: 'success',
                            timer: 600,
                            showConfirmButton: false,
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: data.movieCreated.message,
                            timer: 600,
                            showConfirmButton: false,
                        })
                    }
                    console.log(data)
                })
                .catch((err) => {
                    console.log(err)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Server connection error.',
                        timer: 600,
                    })
                });
        }

        return (
            <Modal show={show} onHide={() => { setShow(!show) }}>
                <Modal.Header closeButton>
                    <h3 className="title fw-bold">Select movie list</h3>
                </Modal.Header>
                <Modal.Body>
                    <ul className='list-group'>
                        {
                            listFilms.map(item =>
                                <li
                                    className='list-group-item activeItemLis mt-2'
                                    onClick={() => { hendelSelect(item.id) }}
                                    key={item.id}
                                >
                                    {item.nombre}
                                </li>
                            )
                        }
                    </ul>
                </Modal.Body>
            </Modal>
        );
    }

    const hendelModal = (item) => {
        setMovie(item)
        setShow(!show)
    }

    return (
        <>
            <ModalSelectList listFilms={listFilms} setShow={setShow} show={show} movie={movie} />
            <div style={{ marginLeft: '5%', marginRight: '5%' }}>
                <div className="row d-flex justify-content-around align-items-center">
                    <GrFormPrevious size={25} color="#fff"
                        className='my-2 col-1  rounded-circle'
                        onClick={() => {
                            if (page>1) {
                                setPage(page-1)
                            }
                        }}
                        style={{
                            width: 50,
                            height: 50,
                            cursor: 'pointer',
                            backgroundColor: "#9fc5ff"
                        }} />
                    <span
                        className='col-1 rounded-circle text-center fs-5 fw-bold'
                        style={{
                            backgroundColor: "#9fc5ff",
                            width: 50,
                            height: 50,
                            paddingTop: 10,

                        }}>
                        {page}
                    </span>
                    <GrFormNext size={25}
                        className='my-2 col-1  rounded-circle'
                        onClick={() => {
                            if (page<total_pages) {
                                setPage(page+1)
                            }
                        }}
                        style={{
                            width: 50,
                            height: 50,
                            cursor: 'pointer',
                            backgroundColor: "#9fc5ff"
                        }} />
                </div>
                <div className="row justify-content-start">
                    {//https://image.tmdb.org/t/p/w220_and_h330_face/
                        listMovies.map((item) => (
                            <Card
                                key={item.id_pelicula}
                                style={{
                                    width: 548.571428571,
                                    textAlign: 'justify',
                                    cursor: 'pointer',
                                    // backgroundColor:'#FF5733', 
                                    padding: 0,
                                    border: 'none',
                                    borderRadius: '5%'
                                }}
                                className="m-2"
                                onClick={() => hendelModal(item)}
                            >
                                <img alt={item.nombre} width='100%' style={{ borderTopLeftRadius: '5%', borderTopRightRadius: '5%' }} src={`https://image.tmdb.org/t/p/original${item.path_imagen}`} />
                                <Card.Body>
                                    <Card.Title>{item.nombre}</Card.Title>
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
        </>
    )
}

export default SearchMovies