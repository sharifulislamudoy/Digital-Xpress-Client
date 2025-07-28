import { NavLink } from 'react-router';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const NavLinks = ({ isMobile = false, isProductOpen, isDealsOpen, toggleProduct, toggleDeals }) => {
    const commonLinks = [
        { to: "/about", text: "About" },
        { to: "/contact", text: "Contact" },
        { to: "/deals/become-a-seller", text: "Become a Seller" }
    ];

    const productsLinks = [
        { to: "/products/mobile-phones", text: "Mobile Phones" },
        { to: "/products/laptops-computers", text: "Laptops & Computers" },
        { to: "/products/gadgets-accessories", text: "Gadgets & Accessories" },
        { to: "/products/home-appliances", text: "Home Appliances" }
    ];

    const dealsLinks = [
        { to: "/deals/hot-deals", text: "Hot Deals" },
        { to: "/deals/flash-sale", text: "Flash Sale" },
        { to: "/deals/bundle-offers", text: "Bundle Offers" },
        { to: "/deals/mobile-phones", text: "Mobile Phones" },
        { to: "/deals/laptops-computers", text: "Laptops & Computers" },
        { to: "/deals/gadgets-accessories", text: "Gadgets & Mobile Accessories" },
        { to: "/deals/home-appliances", text: "Home Appliances" }
    ];

    if (isMobile) {
        return (
            <>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <div className="flex items-center justify-between cursor-pointer" onClick={toggleProduct}>
                        <span>Products</span>
                        {isProductOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                    {isProductOpen && (
                        <ul className="pl-4 pt-2">
                            {productsLinks.map((link) => (
                                <li key={link.to}>
                                    <NavLink to={link.to}>{link.text}</NavLink>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
                <li>
                    <div className="flex items-center justify-between cursor-pointer" onClick={toggleDeals}>
                        <span>Deals</span>
                        {isDealsOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                    {isDealsOpen && (
                        <ul className="pl-4 pt-2">
                            {dealsLinks.map((link) => (
                                <li key={link.to}>
                                    <NavLink to={link.to}>{link.text}</NavLink>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
                {commonLinks.map((link) => (
                    <li key={link.to}>
                        <NavLink to={link.to}>{link.text}</NavLink>
                    </li>
                ))}
            </>
        );
    }

    return (
        <>
            <li>
                <NavLink to="/" className="hover:bg-gray-800 rounded">
                    Home
                </NavLink>
            </li>
            <li>
                <details>
                    <summary className="hover:bg-gray-800 rounded">Products</summary>
                    <ul className="p-2 w-60 bg-black">
                        {productsLinks.map((link) => (
                            <li key={link.to}>
                                <NavLink to={link.to}>{link.text}</NavLink>
                            </li>
                        ))}
                    </ul>
                </details>
            </li>
            <li>
                <details>
                    <summary className="hover:bg-gray-800 rounded">Deals</summary>
                    <ul className="p-2 w-60 bg-black text-white space-y-1">
                        {dealsLinks.map((link) => (
                            <li key={link.to}>
                                <NavLink to={link.to}>{link.text}</NavLink>
                            </li>
                        ))}
                    </ul>
                </details>
            </li>
            {commonLinks.map((link) => (
                <li key={link.to}>
                    <NavLink to={link.to} className="hover:bg-gray-800 rounded">
                        {link.text}
                    </NavLink>
                </li>
            ))}
        </>
    );
};

export default NavLinks;