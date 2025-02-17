import { FaFacebookSquare, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <div className="bg-black p-6 text-white">
            <div className="container mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                        <h1 className="norican text-3xl md:text-5xl">Bike Store</h1>
                        <p className="md:text-2xl">A Largest Bike Store in BD</p>
                    </div>
                    <div>
                        <p className="uppercase mb-5 font-bold">Services</p>
                        <ul className="space-y-3">
                            <li>
                                <a href="#">Prebook a Bike</a>
                            </li>
                            <li>
                                <a href="#">Buy a Bike</a>
                            </li>
                            <li>
                                <a href="#">Sell your Bike</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className="uppercase mb-5 font-bold">Company</p>
                        <ul className="space-y-3">
                            <li>
                                <a href="#">Contact us</a>
                            </li>
                            <li>
                                <a href="#">About us</a>
                            </li>
                            <li>
                                <a href="#">Feedback</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className="uppercase mb-5 font-bold">Contact Us</p>
                        <ul className="space-y-3">
                            <li>
                                <a href="#">+880 1722 779803</a>
                            </li>
                            <li>
                                <a href="#">11appon11@gmail.com</a>
                            </li>
                            <li>
                                <a href="#">Bike Store, Dinajpur Sadar</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container mx-auto">
                <div className="flex items-center justify-between flex-col sm:flex-row mt-8 pt-4 border-t border-white gap-4">
                    <p>© 2025 Your Bike Store. All rights reserved.</p>
                    <div className="flex items-center gap-3">
                        <a href="#">
                            <FaFacebookSquare />
                        </a>
                        <a href="#">
                            <FaLinkedin />
                        </a>
                        <a href="#">
                            <FaXTwitter />
                        </a>
                        <a href="#">
                            <FaInstagram />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
