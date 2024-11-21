import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import MainLayout from './layouts/mainLayout/MainLayout';
import AppLayout from './layouts/AppLayout/AppLayout';
import CentralAlertProvider from './context/centralAlert/CentralAlertProvider';
import Loader from './components/loader/Loader';
const AddPersonal = lazy(() => import('./pages/addPersonal/AddPersonal'));
const GenerateIds = lazy(() => import('./pages/generateIds/GenerateIds'));
const Login = lazy(() => import('./pages/login/Login'));
const Config = lazy(() => import('./pages/config/Config'));

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<Loader sizeSpinner={30} message='Cargando...' />}>
        <CentralAlertProvider>
          <Routes>
            <Route path='/' element={<MainLayout />}>
              <Route path='/' element={<AppLayout />} >
                <Route index element={<GenerateIds />} />
                <Route path="/add-personal" element={<AddPersonal />} />
                <Route path='/config' element={<Config />} />
              </Route>
              <Route path='/login' element={<Login />} />
            </Route>
            <Route path='*' element={<Navigate to='/' replace={true}/>} />
          </Routes>
        </CentralAlertProvider>
      </Suspense>
    </Provider>
  );
}

export default App;