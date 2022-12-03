import React from 'react'
import { Nav, Offcanvas, Navbar, Container } from 'react-bootstrap'
import PropTypes from 'prop-types'
import '../styles/navBar.css'
import { useNavigate } from 'react-router'

const MenuBar = ({ nameMenu }) => {
    const [showMenu, setShowMenu] = React.useState(false)
    const history = useNavigate();

    const exitSession = () => {
        const params = JSON.parse(localStorage.getItem('session'));
        if (params) {
            localStorage.setItem('session', null);
            history('/login')
        }
    }

    const listMenu = [
        {
            nameMenu: "Home",
            url: 'home'
        },
        {
            nameMenu: "Personal Lists",
            url: 'listFilms'
        },
        {
            nameMenu: "Search Movies",
            url: 'searchMovies'
        },
        {
            nameMenu: "User Information",
            url: 'user'
        },
        {
            nameMenu: "Exit",
            url: 'exit',
            onPress: exitSession,
        }
    ]

    return (
        <>
            <Navbar style={{backgroundColor:'#9fc5ff'}} expand={false} className="mb-3">
                <Container fluid>
                    <Navbar.Offcanvas
                        className="Navbar-Offcanvas"
                        placement="start"
                        show={showMenu}
                        onHide={() => setShowMenu(false)}
                    
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title className="fw-bolder" >
                                Menú
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav variant="pills">
                                {
                                    listMenu.map((item, index) => (
                                        <button
                                            key={index}
                                            style={{ marginTop: 5 }}
                                            className="text-center btn btn-outline-primary"
                                            onClick={() => {
                                                setShowMenu(!showMenu);
                                                item.onPress?item.onPress():history(`/${item.url}`)
                                            }}
                                        >
                                            {item.nameMenu}
                                        </button>
                                    ))
                                }

                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                    <Navbar.Toggle className="p-0" onClick={() => setShowMenu(!showMenu)} />
                    <Navbar.Brand className="navBar fw-bold">{nameMenu}</Navbar.Brand>
                </Container>

            </Navbar>
        </>
    )
}

MenuBar.propTypes = {
    nameMenu: PropTypes.string.isRequired
}

MenuBar.defaultProps = {
    nameMenu: "CRUD MOVIESPLUS"
}

export default MenuBar