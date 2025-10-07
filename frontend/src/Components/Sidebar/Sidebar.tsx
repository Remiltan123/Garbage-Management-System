import { NavLink } from 'react-router-dom'
import './Sidebar.css'
import awarenessImage from '../../assets/images/awareness_of_waste_recycling.png'

export function Sidebar() {
    return (
        <div className="sidebar">
            <div className='sidebar-img'>
                <img src={awarenessImage} alt="awarenessImage" />
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to="wastage-classifier" className={({ isActive }) => isActive ? "active-link" : ""}>
                            Wastage Classifier
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="home" className={({ isActive }) => isActive ? "active-link" : ""}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="profile" className={({ isActive }) => isActive ? "active-link" : ""}>
                            Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="settings" className={({ isActive }) => isActive ? "active-link" : ""}>
                            Settings
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
