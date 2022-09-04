import React from 'react'
import "./ProfileScreen.css"
import Nav  from '../Nav'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { auth } from '../firebase'
import PlanScreen from './PlanScreen'

function ProfileScreen() {
    const user = useSelector(selectUser);
    return (
        <div className="profileScreen">
            <Nav/>
           <div className="profileScreen_body">
               <h1>Edit Profile</h1>
               <div className="profileScreen_info">
                   <img src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png" alt=""
                   />
                   <div className="profilescreen_details">
                       <h2>{user.email}</h2>
                       <div className="profilescreen_plans">
                           <h3>Plans</h3>
                           <PlanScreen/>
                           <button onClick={() => auth.signOut()} className="profileScreen_signOut">
                               Sign Out
                           </button>
                       </div>


                   </div>

               </div>
           </div>
        </div>
    )
}

export default ProfileScreen
