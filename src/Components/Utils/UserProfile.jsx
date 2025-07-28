import { NavLink } from 'react-router';

const UserProfile = ({ user }) => {
    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full border-2 border-orange-500">
                    <img
                        alt="Profile"
                        src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                    />
                </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                    <NavLink to="/profile" className="justify-between">
                        Profile
                        <span className="badge">New</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/settings">Settings</NavLink>
                </li>
                <li>
                    <NavLink to="/logout">Logout</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default UserProfile;