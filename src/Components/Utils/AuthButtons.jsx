import { NavLink } from 'react-router';

const AuthButtons = () => {
  return (
    <div className="flex items-center space-x-4">
      <NavLink to="/login" className="btn btn-ghost text-orange-500">
        Login
      </NavLink>
      <NavLink to="/register" className="btn bg-orange-500 text-white hover:bg-orange-600">
        Create Account
      </NavLink>
    </div>
  );
};

export default AuthButtons;