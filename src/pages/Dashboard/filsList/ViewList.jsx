/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router';
import MenuBar from '../../../components/Navbar'
import axios from '../../../utils/connection';

const ViewList = () => {
    const history = useNavigate();
    const params = useParams();
    const dataId = params.id;
    const [listFilms, setListFilms] = useState([]);
    useEffect(() => {
        const getFilms = () => {
            axios.post('/movie/getFilms', {
                id_lista_pelicula: dataId
            }).then(({data})=>{
                setListFilms(data.films);
            }).catch(console.error)
        }
        getFilms();
    }, [])
    return (
        <>
            <MenuBar />
            <div className='row justify-content-end'>
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
                <div>
                {
                    listFilms.length>0?<></>:
                    <div className="div4 align-middle" style={{height:'80vh',padding:0}}>
                        registers not finded.
                    </div>
                }
                </div>
                
            </div>
        </>
    )
}

export default ViewList