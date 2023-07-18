import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import NotFound from './pages/notFound/NotFound';
import LoadExcel from './pages/loadExcel/LoadExcel';
import Register from './pages/register/Register';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Layout from './layout/Layout';
import ItecceIds from './pages/itecceIds/ItecceIds';
import HomeIds from './pages/itecceIds/homeIds/HomeIds';
import GenerateIds from './pages/itecceIds/generateIds/GenerateIds';
function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<Home namePage="Inicio" />} />
        <Route path='/page' element={<Layout />}>
          <Route path='load-excel' element={<LoadExcel namePage="Cargar lista de alumnos" />} />
          <Route path='register-individual' element={<Register namePage="Registro individual" />} />
          <Route path='/page' element={<ItecceIds namePage="Itecce credenciales" /> } >
            <Route index element={<HomeIds />} />
            <Route path='generate-ids' element={<GenerateIds namePage="idsGenerator" />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFound namePage="Not found" />} />
      </Routes>
    </Provider>
  );
}

export default App;