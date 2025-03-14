import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/mainLayout/MainLayout';
import AppLayout from './layouts/AppLayout/AppLayout';
import CentralAlertProvider from './context/centralAlert/CentralAlertProvider';
import Loader from './components/loader/Loader';
import AppGuard from './guards/AppGuard';
const LoginGuard = lazy(() => import('./guards/LoginGuard'));
const AddPersonal = lazy(() => import('./pages/addPersonal/AddPersonal'));
const GenerateIds = lazy(() => import('./pages/generateIds/GenerateIds'));
const Auth = lazy(() => import('./pages/auth/Auth'));
const Config = lazy(() => import('./pages/config/Config'));

function App() {
  return (
    <Suspense fallback={<Loader sizeSpinner={30} message='Cargando...' />}>
      <CentralAlertProvider>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route path='/' element={<AppGuard />}>
              <Route path='/' element={<AppLayout />} >
                <Route index element={<GenerateIds />} />
                <Route path="/add-personal" element={<AddPersonal />} />
                <Route path='/config' element={<Config />} />
              </Route>
            </Route>
            <Route path='/login' element={<LoginGuard />}>
              <Route index element={<Auth />} />
            </Route>
          </Route>
          <Route path='*' element={<Navigate to='/' replace={true}/>} />
        </Routes>
      </CentralAlertProvider>
    </Suspense>
  );
}

export default App;