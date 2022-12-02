import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Card, Modal } from 'react-bootstrap';
import MenuBar from '../../../components/Navbar'
import axiosLocal from '../../../utils/connection'
import "../../../styles/listStyle.css"
const SearchMovies = () => {
    const [listMovies, setlistMovies] = useState([]);
    const api_key = "c2fdeb24edd254ed1f8d8a5997f683ea";
    const page = useRef(1);
    const total_pages = useRef(0);
    const [listFilms, setListFilms] = useState([]);
    const [show, setShow] = useState(false)
    const [movie, setMovie] = useState({});


    const getMovies = () => {
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&page=${page.current}`).then(({ data }) => {

            const list = data.results.map((item) => ({
                id_pelicula: item.id,
                nombre: item.original_title,
                path_imagen: item.backdrop_path,
                sinopsis: item.overview,
                fecha_lanzamiento: item.release_date,
            }))
            setlistMovies(list);
            total_pages.current = data.total_pages;
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
    }, [])

    const ModalSelectList = ({ show, setShow, listFilms, movie }) => {
        return (
            <Modal show={show} onHide={() => { setShow(!show) }}>
                <Modal.Header closeButton>
                    <h3 className="title fw-bold">Select movie list</h3>
                </Modal.Header>
                <Modal.Body>
                    <ul className='list-group'>
                        {
                            listFilms.map(item =>
                            
                                <li className='list-group-item activeItemLis' key={item.id}>{item.nombre}</li>
                            
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
            <MenuBar />
            <ModalSelectList listFilms={listFilms} setShow={setShow} show={show} movie={movie} />
            <div style={{ marginLeft: '5%', marginRight: '5%' }}>
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