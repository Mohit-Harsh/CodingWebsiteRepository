import { useState, useEffect } from 'react';
import React from 'react';
import {Routes,Route, createBrowserRouter} from 'react-router-dom';
import Home from './components/Home.jsx';
import Profile from './components/Profile.jsx';
import Practice from './components/Practice.jsx';
import LoginPage from './LoginPage.jsx';
import styles from './App.module.css';
import Navbar from './components/navbar/Navbar.jsx';
import ProblemPage from './components/problemlist/ProblemPage.jsx';
import Company from './components/companyproblems/Company.jsx';

function App() {

  const [auth,setAuth] = useState(false);
  const [email, setEmail] = useState("test2@gmail.com")
  const [password, setPassword] = useState("test2@123")

  if(auth)
  {    
    return(

      <div className="container-fluid" style={{padding : 0, margin : 0, width : '100%', height: 'fit-content', overflow:'hidden'}}>
            
        <div className="row">

          <div className="col-2" id={styles.col3}>

            <Navbar></Navbar>

          </div>

          <div className="col-10" style={{height:'100vh',overflowY:'scroll',overflowX:'hidden'}}>
            <Routes>
              <Route path='/'>
                <Route index element={<Home email={email}/>}/>
                <Route path='problem'>
                  <Route path='company/:company_name' element={<Company></Company>}/>
                  <Route path=':title' element={<ProblemPage></ProblemPage>}/>
                </Route>
              </Route>
              <Route path='profile' element={<Profile></Profile>} />
              <Route path='practice'>
                  <Route index element={<Practice></Practice>}/>
                  <Route path='company/:company_name' element={<Company></Company>}/>
              </Route>
              <Route path='logout' element={<Home email={email}></Home>}/>
              <Route path='delete' element={<Home email={email}></Home>}/>
            </Routes>
          </div>
        </div>
      </div>
    )
  }

  else{
    
    return(<LoginPage auth={auth} email={email} password={password} setAuth={setAuth} setEmail={setEmail} setPassword={setPassword}></LoginPage>);

  }
  
}


export default App;
