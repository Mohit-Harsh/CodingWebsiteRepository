import hnslogo from './icons8-stack-correctly-96.png';
import styles from './Navbar.module.css';
import { NavLink , Link } from 'react-router-dom'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

const Navbar = ({clickbrand}) =>
{

    return (

        <>

        
        <div className="container-fluid" id={styles.con1}>
            <img src={hnslogo} alt="" className={styles.img}/>
            <span id={styles.brand} onClick={clickbrand}>Hack&Stack</span>
        </div>

        <nav id={styles.con2}>

            <h5 style={{fontSize:'0.8vw',color:'rgba(0, 0, 0, 0.45)', marginLeft:'2.5vw', fontWeight:'700', marginBottom:'1vw'}}>Navigation</h5>
            
            <NavLink to='/' id={styles.tabs} style={({ isActive }) => ({color: isActive ? 'rgba(255, 94, 94, 0.75)' : 'rgba(0, 0, 0, 0.75)',background: isActive ? 'rgb(246, 246, 246)' : 'transparent',
            borderRight: isActive ? '2px solid rgba(255, 94, 94, 0.75)': 'none', display:'flex', alignItems:'center', justifyContent:'start'})}>
                <HomeRoundedIcon sx={{width:'1.5vw', marginRight:'0.7vw'}}></HomeRoundedIcon>
                <h3 id={styles.h3}>Home</h3>
            </NavLink>
        

            <NavLink  to='/profile' id={styles.tabs} style={({ isActive }) => ({color: isActive ? 'rgba(255, 94, 94, 0.75)' : 'rgba(0, 0, 0, 0.75)',background: isActive ? 'rgb(246, 246, 246)' : 'transparent',
            borderRight: isActive ? '2px solid rgba(255, 94, 94, 0.75)': 'none'})}>
                <AccountCircleRoundedIcon sx={{width:'1.5vw', marginRight:'0.7vw'}}></AccountCircleRoundedIcon>
                <h3 id={styles.h3}>Profile</h3>
            </NavLink>
        
        
            <NavLink to='/practice' id={styles.tabs} style={({ isActive }) => ({color: isActive ? 'rgba(255, 94, 94, 0.75)' : 'rgba(0, 0, 0, 0.75)',background: isActive ? 'rgb(246, 246, 246)' : 'transparent',
            borderRight: isActive ? '2px solid rgba(255, 94, 94, 0.75)': 'none'})}>
                <TerminalRoundedIcon sx={{width:'1.5vw', marginRight:'0.7vw'}}></TerminalRoundedIcon>
                <h3 id={styles.h3}>Practice</h3>
            </NavLink>

            <h5 style={{fontSize:'0.8vw',color:'rgba(0, 0, 0, 0.45)', marginLeft:'2.5vw', fontWeight:'700', marginBottom:'1vw', marginTop:'1vw'}}>Authentication</h5>

            <NavLink to='/logout' id={styles.tabs} style={({ isActive }) => ({color: isActive ? 'rgba(255, 94, 94, 0.75)' : 'rgba(0, 0, 0, 0.75)',background: isActive ? 'rgb(246, 246, 246)' : 'transparent',
            borderRight: isActive ? '2px solid rgba(255, 94, 94, 0.75)': 'none', display:'flex', alignItems:'center', justifyContent:'start'})}>
                <LoginRoundedIcon sx={{width:'1.5vw', marginRight:'0.7vw'}}></LoginRoundedIcon>
                <h3 id={styles.h3}>LogIn</h3>
            </NavLink>
        

            <NavLink  to='/delete' id={styles.tabs} style={({ isActive }) => ({color: isActive ? 'rgba(255, 94, 94, 0.75)' : 'rgba(0, 0, 0, 0.75)',background: isActive ? 'rgb(246, 246, 246)' : 'transparent',
            borderRight: isActive ? '2px solid rgba(255, 94, 94, 0.75)': 'none'})}>
                <PersonAddAltRoundedIcon sx={{width:'1.5vw', marginRight:'0.7vw'}}></PersonAddAltRoundedIcon>
                <h3 id={styles.h3}>SignUp</h3>
            </NavLink>

            <h5 style={{fontSize:'0.8vw',color:'rgba(0, 0, 0, 0.45)', marginLeft:'2.5vw', fontWeight:'700', marginBottom:'1vw', marginTop:'1vw'}}>Support</h5>

            <NavLink to='/about' id={styles.tabs} style={({ isActive }) => ({color: isActive ? 'rgba(255, 94, 94, 0.75)' : 'rgba(0, 0, 0, 0.75)',background: isActive ? 'rgb(246, 246, 246)' : 'transparent',
            borderRight: isActive ? '2px solid rgba(255, 94, 94, 0.75)': 'none', display:'flex', alignItems:'center', justifyContent:'start'})}>
                <HelpRoundedIcon sx={{width:'1.5vw', marginRight:'0.7vw'}}></HelpRoundedIcon>
                <h3 id={styles.h3}>Help</h3>
            </NavLink>
        

            <NavLink  to='/contact' id={styles.tabs} style={({ isActive }) => ({color: isActive ? 'rgba(255, 94, 94, 0.75)' : 'rgba(0, 0, 0, 0.75)',background: isActive ? 'rgb(246, 246, 246)' : 'transparent',
            borderRight: isActive ? '2px solid rgba(255, 94, 94, 0.75)': 'none'})}>
                <InfoRoundedIcon sx={{width:'1.5vw', marginRight:'0.7vw'}}></InfoRoundedIcon>
                <h3 id={styles.h3}>Contact us</h3>
            </NavLink>
            
        </nav>

        </>

    )
}

export default Navbar;