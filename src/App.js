import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Main from './layouts/main/Main';
import Home from './layouts/home/Home';
import GenerateIds from './pages/generateIds/GenerateIds';
import AddPersonal from "./pages/addPersonal/AddPersonal";
import LoadImages from "./pages/loadImages/LoadImages";

const Login = lazy(() => import('./pages/login/Login'));
const NotFound = lazy(() => import('./pages/notFound/NotFound'));

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<div><span>Cargando...</span></div>}>
        <Routes>
          <Route path='/' element={<Main />}>
            <Route path='/' element={<Home />} >
              <Route index element={<GenerateIds />} />
              <Route path="/add-personal" element={<AddPersonal />} />
              <Route path="/load-images" element={<LoadImages />} />
            </Route>
            <Route path='/login' element={<Login />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </Provider>
  );
}

export default App;