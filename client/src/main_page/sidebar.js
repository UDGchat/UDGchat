import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';

import { fetchUser } from '../fetchData';

const Sidebar = () => {
    const { data } = useQuery(['userInfo'], fetchUser, {staleTime: 60*60*1000})

    return ( 
        <>
            <NavLink to="1/0">Sidebar</NavLink>
        </>
    );
}
 
export default Sidebar;