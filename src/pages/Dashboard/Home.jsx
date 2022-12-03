import React from 'react'
import arrow_home from '../../assets/photo/arrow_home.png'
import "../../styles/home.css"
const Home = () => {
    return (
        <>
            <img id="arrow_home" src={arrow_home} alt="" />
            <div className="div1">
                <div className="div2">Welcome to the Home</div>
                <div className="div3">
                    <img src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 0, 0, 0.55%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e" alt="" width={150} />
                </div>
                <div className="div4">To start touch the icon located in the upper-left corner, then choose one of the options</div>
            </div>
        </>
    )
}

export default Home
