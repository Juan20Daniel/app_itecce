import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CentralAlertProvider from './context/centralAlert/CentralAlertProvider';
import MainLayout from './layouts/mainLayout/MainLayout';
import Loader from './components/loader/Loader';

const AddPersonal = lazy(() => import('./pages/addPersonal/AddPersonal'));
const AppLayout = lazy(() => import('./layouts/AppLayout/AppLayout'));
const GenerateIds = lazy(() => import('./pages/generateIds/GenerateIds'));
const Config = lazy(() => import('./pages/config/Config'));

function App() {
  return (
    <Suspense fallback={<Loader sizeSpinner={30} message='Cargando...' />}>
      <CentralAlertProvider>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route path='/' element={<AppLayout />} >
              <Route index element={<GenerateIds />} />
              <Route path='add-personal' element={<AddPersonal />} />
              <Route path='config' element={<Config />} />
            </Route>
          </Route>
          <Route path='*' element={<Navigate to='/' replace={true}/>} />
        </Routes>
      </CentralAlertProvider>
    </Suspense>
  );
}

export default App;