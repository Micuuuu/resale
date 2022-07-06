import {Routes, Route} from 'react-router-dom'
import { useParams } from "react-router-dom";

import ProfileInfo from '../../components/profile-page-info/profile-page-info';

const Profile = () => {
    const { id } = useParams();


    return (
        <Routes>
        <Route index element = {<ProfileInfo id = {id} page = {"dressing"}/>} />
        <Route path = {`profile/${id}/sold`} element = {<ProfileInfo id = {id} page = {"sold-items"}/>}/>

        </Routes>
    )

}


export default Profile