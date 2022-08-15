import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import "./Nav.css"

export default function Nav() {
    const [show, setShow] = useState(false);
    const [searchValue, setsearchValue] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        window.addEventListener("scroll",()=>{
            if(window.scrollY>50){
                setShow(true);
            }else{
                setShow(false);
            }
        })
        return () => {
            window.removeEventListener("scroll",()=>{});
        };
    }, []);

    const handleChange = (e)=>{
        setsearchValue(e.target.value);
        navigate(`/search?q=${e.target.value}`);
        if (!e.target.value){
            navigate('/');
        }
    }
    return (
        <nav className={`nav ${show && "nav__black"}`}>
            <img
                alt='logo'
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png'
                className='nav__logo'
                onClick={() => { window.location.reload() }}
            />
            <input value={searchValue} onChange={handleChange} className='nav__input' type="text" placeholder='Search'/>
            
            <img
                alt="User Avatar"
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2cRsPLcD-SLllXtA8_xF4IFymoRqcOdLP3w&usqp=CAU'
                className='nav__avatar'
            />
        </nav>
    )
}
