import logo from './logo.svg';
import './App.css';
import Login from './views/Login/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home/home';
import MyCourse from './components/MyCourse/myCourse';
import Overview from './components/Overview/overview';
import Test from './components/ModuleTest/test';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/myCourse' element={<MyCourse/>}/>
        <Route path='/overview' element={<Overview/>}/>
        <Route path='/test' element={<Test/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
