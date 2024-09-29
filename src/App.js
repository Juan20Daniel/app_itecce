import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Main from './layouts/main/Main';
import Home from './layouts/home/Home';
import GenerateIds from './pages/generateIds/GenerateIds';
import GenerateIdProvider from './context/generateId/GenerateIdProvider';
import CentralAlertProvider from './context/centralAlert/CentralAlertProvider';
import LoadImageProvider from './context/loadImages/LoadImageProvider';
import AddPersonalProvider from './context/addPersonal/AddPersonalProvider';
const AddPersonal = lazy(() => import('./pages/addPersonal/AddPersonal'));
const LoadImages = lazy(() => import('./pages/loadImages/LoadImages'));
const GenerateReport = lazy(() => import('./pages/generateReport/GenerateReport'));
const Login = lazy(() => import('./pages/login/Login'));
const NotFound = lazy(() => import('./pages/notFound/NotFound'));
const Config = lazy(() => import('./pages/config/Config'));

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<div><span>Cargando...</span></div>}>
        <CentralAlertProvider>
          <GenerateIdProvider>
            <LoadImageProvider>
              <AddPersonalProvider>
                <Routes>
                  <Route path='/' element={<Main />}>
                    <Route path='/' element={<Home />} >
                      <Route index element={<GenerateIds />} />
                      <Route path="/add-personal" element={<AddPersonal />} />
                      <Route path="/load-images" element={<LoadImages />} />
                      <Route path='/generate-report' element={<GenerateReport />} />
                      <Route path='/config' element={<Config />} />
                    </Route>
                    <Route path='/login' element={<Login />} />
                  </Route>
                  <Route path='*' element={<NotFound />} />
                </Routes>
              </AddPersonalProvider>
            </LoadImageProvider>
          </GenerateIdProvider>
        </CentralAlertProvider>
      </Suspense>
    </Provider>
  );
}

export default App;