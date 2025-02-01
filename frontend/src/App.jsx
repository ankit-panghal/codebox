import { lazy } from 'react';
import {Routes,Route} from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './Components/PrivateRoute';
import { Suspense } from 'react';
import Loader from './Components/Loader';
import NotFoundPage from './Page/NotFoundPage';
import SharePage from './Page/SharePage';
import ExplorePage from './Page/ExplorePage';

const HomePage = lazy(() => import('./Page/HomePage'))
const SignupPage = lazy(() => import('./Page/SignupPage'));
const LoginPage = lazy(() => import('./Page/LoginPage'));
const DashboardPage = lazy(() => import('./Page/DashboardPage'));
const EditorPage = lazy(() => import('./Page/EditorPage'));

function App() {
  return (
    <>
         <Suspense fallback={<Loader loading={true}/>}>
        <Routes>
        <Route element = {<PrivateRoute/>}>
            <Route path='/' element={<HomePage/>} />
            <Route path='/signup' element={<SignupPage/>}/>
            <Route path='/login' element={<LoginPage />}/>
            <Route path='/dashboard' element={<DashboardPage/>}/>
            <Route path='/dashboard/editor' element={<EditorPage/>}/>
        </Route>
        <Route path='/arena/:id' element={<SharePage/>}/>
        <Route path='/explore' element={<ExplorePage/>}/>
        <Route path='/*' element={<NotFoundPage/>}/>
        </Routes>
        </Suspense>
        <Toaster  toastOptions={{
            duration:2000,
            style: {
              background: 'black',
              color: 'white',
            },
          }}/>
    </>
  );
}

export default App;
