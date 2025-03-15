import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CentralAlertProvider from './context/centralAlert/CentralAlertProvider';
import MainLayout from './layouts/mainLayout/MainLayout';
import Loader from './components/loader/Loader';
import AppGuard from './guards/AppGuard';
const AuthGuard = lazy(() => import('./guards/AuthGuard'));
const AddPersonal = lazy(() => import('./pages/addPersonal/AddPersonal'));
const AppLayout = lazy(() => import('./layouts/AppLayout/AppLayout'));
const GenerateIds = lazy(() => import('./pages/generateIds/GenerateIds'));
const Config = lazy(() => import('./pages/config/Config'));
const AuthLayout = lazy(() => import('./layouts/authLayout/AuthLayout'));
const Login = lazy(() => import('./pages/login/Login'));

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
            <Route path='/auth' element={<AuthGuard />}>
              <Route path='/auth' element={<AuthLayout />}>
                <Route index element={<Login />} />
              </Route>
            </Route>
          </Route>
          <Route path='*' element={<Navigate to='/' replace={true}/>} />
        </Routes>
      </CentralAlertProvider>
    </Suspense>
  );
}

export default App;