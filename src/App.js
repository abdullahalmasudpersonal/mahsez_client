
import { Outlet, Route, Routes } from 'react-router-dom';
import Navber from './Pages/Masud/Navber';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min';
import Home from './Pages/Home/Home';
import Attar from './Pages/Islamic/Attar/Attar';
import Islamic from './Pages/Islamic/Islamic';
import Footer from './Pages/Shared/Footer/Footer';
import Header from './Pages/Shared/Header/Header';
import MHeaderCatagore from './Pages/Shared/Header/MHeaderCatagore/MHeaderCatagore';
import Munira from './Pages/Masud/Munira';
import Sanfwan from './Pages/Masud/Sanfwan';
import Masud from './Masud';
import Mahmud from './Pages/Masud/Mahmud';
import Hoomes from './Pages/Masud/Hoomes';

function App() {
  return (
    <div>
     {/*  <Navber />
      <Routes>
        <Route path='/' element={<Hoomes/>} />
        <Route path='/munira' element={<Munira/>} />
        <Route path='/munira-safwan' element={<Sanfwan/>} /> */}
       {/*  <Route path='/munira' element={<Munira />}>
           <Route index element={<Munira/>} /> 
          <Route path='safwan' element={<Sanfwan/>} />
        </Route> */}
       {/*  <Route path='/masud' element={<Masud/>} />
        <Route path='/mahmud' element={<Mahmud/>} /> */}

  {/*     </Routes> */}
     {/*   <MHeaderCatagore/>  */}
       <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/islamic' element={<Islamic />}>
          <Route path='attar' element={<Attar/>} />
        </Route>

      </Routes>
      <Footer /> 
    </div>
  );
}

export default App;
