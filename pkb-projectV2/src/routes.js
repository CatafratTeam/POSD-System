import {Routes, Route} from 'react-router-dom';
import HomePage from './Pagine/HomePage';
import UserArea from './Pagine/UserArea';
import NotFoundPage from './Pagine/NotFoundPage';
import AdminArea from './Pagine/AdminArea';

const RoutesPath = () =>{
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/UserArea" element={<UserArea/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
                <Route path="/AdminArea" element={<AdminArea/>}/>
            </Routes>
        </>
    )
}

export default RoutesPath;