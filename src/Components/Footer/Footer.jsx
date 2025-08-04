import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Logo from "../Utils/Logo";
import Image from '../../assets/DigitalXpress3.png'

const Footer = () => {
    return (
        <footer className="bg-gray-950 text-gray-300 pt-16 pb-8 px-4 md:px-10 lg:px-24 ">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

                    {/* Company Info */}
                    <div className="space-y-5">
                        <Logo imageSrc={Image} />
                        <p className="leading-relaxed">
                            Your trusted partner for premium tech products in Bangladesh. We bring innovation to your doorstep.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                                <FaFacebook className="text-xl" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                                <FaTwitter className="text-xl" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                                <FaInstagram className="text-xl" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                                <FaLinkedin className="text-xl" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                                <FaYoutube className="text-xl" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-5">
                        <h4 className="text-lg font-semibold text-white">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="hover:text-orange-400 transition-colors">Home</a></li>
                            <li><a href="#" className="hover:text-orange-400 transition-colors">Products</a></li>
                            <li><a href="#" className="hover:text-orange-400 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-orange-400 transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-orange-400 transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-orange-400 transition-colors">FAQs</a></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div className="space-y-5">
                        <h4 className="text-lg font-semibold text-white">Categories</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="hover:text-orange-400 transition-colors">Smartphones</a></li>
                            <li><a href="#" className="hover:text-orange-400 transition-colors">Laptops</a></li>
                            <li><a href="#" className="hover:text-orange-400 transition-colors">Home Appliances</a></li>
                            <li><a href="#" className="hover:text-orange-400 transition-colors">Audio Devices</a></li>
                            <li><a href="#" className="hover:text-orange-400 transition-colors">Gaming</a></li>
                            <li><a href="#" className="hover:text-orange-400 transition-colors">Accessories</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-5">
                        <h4 className="text-lg font-semibold text-white">Contact Us</h4>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <FaMapMarkerAlt className="text-orange-400 mt-1 mr-3 flex-shrink-0" />
                                <p>123 Tech Tower, Gulshan Avenue, Dhaka 1212, Bangladesh</p>
                            </div>
                            <div className="flex items-center">
                                <FaPhoneAlt className="text-orange-400 mr-3" />
                                <a href="tel:+8801712345678" className="hover:text-orange-400 transition-colors">+880 1712 345 678</a>
                            </div>
                            <div className="flex items-center">
                                <FaEnvelope className="text-orange-400 mr-3" />
                                <a href="mailto:info@digitalxpress.com" className="hover:text-orange-400 transition-colors">info@digitalxpress.com</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="bg-gray-900 rounded-xl p-6 mb-12 border border-gray-700">
                    <div className="flex flex-col lg:flex-row justify-between items-center">
                        <div className="mb-4 lg:mb-0">
                            <h4 className="text-xl font-semibold text-white mb-2">Subscribe to Our Newsletter</h4>
                            <p className="text-gray-400">Get updates on special offers and new products</p>
                        </div>
                        <div className="flex w-full lg:w-auto">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="px-4 py-3 bg-gray-900 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500 w-full lg:w-64"
                            />
                            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-r-lg transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} Digital Xpress. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-500 hover:text-orange-400 text-sm transition-colors">Privacy Policy</a>
                        <a href="#" className="text-gray-500 hover:text-orange-400 text-sm transition-colors">Terms of Service</a>
                        <a href="#" className="text-gray-500 hover:text-orange-400 text-sm transition-colors">Shipping Policy</a>
                        <a href="#" className="text-gray-500 hover:text-orange-400 text-sm transition-colors">Returns & Refunds</a>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-8 flex justify-center">
                    <div className="flex space-x-4">
                        <img src="https://i.ibb.co/Qfvn4z6/payment-visa.png" alt="Visa" className="h-8" />
                        <img src="https://i.ibb.co/vwQv1BN/payment-mastercard.png" alt="Mastercard" className="h-8" />
                        <img src="https://i.ibb.co/w4k6Ws9/payment-paypal.png" alt="Paypal" className="h-8" />
                        <img src="https://i.ibb.co/J7Rdf9H/payment-bkash.png" alt="bKash" className="h-8" />
                        <img src="https://i.ibb.co/6YvP4P0/payment-nagad.png" alt="Nagad" className="h-8" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;