import { Link } from 'react-router';

const Logo = ({ imageSrc, className }) => {
  return (
    <Link to={'/'} className={`flex items-center ${className}`}>
      <img src={imageSrc} className='h-10 w-auto' alt="Logo" />
      <span className='text-white text-xl -ml-2'>igital <i className='text-orange-500'>Xpress</i></span>
    </Link>
  );
};

export default Logo;