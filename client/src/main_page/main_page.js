import {useQuery} from '@tanstack/react-query'
import { Outlet } from 'react-router';

import { fetchUser } from '../fetchData';
import Sidebar from './sidebar';

const Main = () => {
    const { isLoading, isError, data } = useQuery(['userInfo'], fetchUser)

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        window.location.href = '/login'
    }

    if(data) {
        !data.auth && (window.location.href = '/login')
        return ( 
            <>
                <dir>
                    Bienvenido a UDGchat.com, {data.user.username} - {data.user.email}
                </dir>
                <img src={data.user.photo} alt=""></img>
                <Sidebar />

                <Outlet />
            </>
        );
    }
}
 
export default Main;