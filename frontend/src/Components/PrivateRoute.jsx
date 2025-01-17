import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import isAuth from '../utils/isAuth';
import Loader from './Loader';
import { useSelector,useDispatch } from 'react-redux';
import {manageAuth} from '../redux/authSlice'
const PrivateRoute = () => {
    const isAuthenticated = useSelector(state => state.auth)
    
    const [loading,setLoading] = useState(true);
    
    const location = useLocation()
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        async function checkAuth(){
            const auth = await isAuth();
            auth ?  dispatch(manageAuth(true)) : dispatch(manageAuth(false))
            setLoading(false);
        }
        checkAuth()
    },[])
    
    
    
    if(loading) return <Loader loading={loading}/>
    const publicRoutes = ['/','/signup','/login'];
     const isOnPubRoute =  publicRoutes.some(route => location.pathname === route);
     if(isOnPubRoute && isAuthenticated) return <Navigate to={'/dashboard'}/>

    return <Outlet/>
}

export default PrivateRoute