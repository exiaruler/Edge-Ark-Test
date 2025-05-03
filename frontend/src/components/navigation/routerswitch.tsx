import { Route, Routes } from 'react-router';
import { pageRoutes } from './page';
// React router page routes
export default function RouterSwitch(){
    const pages=pageRoutes
    return (
        <Routes>
        {
            pages.map((route)=>(
                <Route element={<route.page/>} path={route.path} index={route.index}/>
            ))       
        }
        </Routes>
    )
}