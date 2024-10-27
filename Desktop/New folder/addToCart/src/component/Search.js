import React, { useEffect, useState } from 'react';
import './Search.css';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Search = ({ data, priceData, foodSearchText, condition }) => {
    const [text, setText] = useState("");
    const [t, setT] = useState(false);
    const [location, setLocation] = useState("Location not available");
    const cart = useSelector((store) => store.cart.items);
    const navigate = useNavigate();

    const handleSearch = () => {
        if (text.trim() === "") {
            toast.error("Please enter a search term!");
        } else {
            if (condition) {
                foodSearchText(text);
            } else {
                data(text);
                toast.success("Search successful!");
            }
        }
    };

    const handlePriceRangeChange = (p) => {
        priceData(p.target.value);
        toast.info(`Price range selected: ${p.target.value}`);
    };

    const viewCart = () => {
        navigate("/api/carts");
        toast.success("Viewing cart");
    };

    const login = () => {
        navigate("/api/login");
        toast.success("Redirecting to login");
    };

    useEffect(() => {
        const tokenData = localStorage.getItem("token");
        if (tokenData) {
            setT(true);
            toast.success("Logged in!");
        } else {
            setT(false);
        }

        // Get user's location
        const key = "7fdbbd27dd4147f5a44adacf17f15cb2"
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${key}`)
                        .then(response => response.json())
                        .then(data => {
                            if (data.results && data.results.length > 0) {
                                const state = data.results[0].components.state || "Location not found";
                                setLocation(state);
                                // toast.success(`Location found: ${state}`);
                            } else {
                                // setLocation("Location not found");
                                // toast.error("Location not found");
                            }
                        })
                        .catch(() => {
                            // setLocation("Error fetching location");
                            // toast.error("Error fetching location");
                        });
                },
                () => {
                    // setLocation("Location access denied");
                    // toast.error("Location access denied");
                }
            );
        } else {
            setLocation("Geolocation not supported");
            toast.error("Geolocation not supported");
        }
    }, []);

    const logout = () => {
        localStorage.clear();
        setT(false);
        toast.success("Logged out successfully!");
        navigate("/api/login");
    };

    const goToFood = () => {
        navigate("/api/food");
        toast.success("Navigating to Food");
    };

    const home = () => {
        navigate("/");
    };

    return (
        <div className="search-container">
            <ToastContainer position="top-right" autoClose={3000} />
            <div>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search..."
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                />
                &emsp;
                <button className="search-button" onClick={handleSearch}>
                    Search
                </button>
            </div>

            {condition && (
                <div className="location">
                    <p>{location}</p>
                </div>
            )}

            <div style={condition ? { display: "none" } : {}}>
                <select className="search-dropdown" onChange={handlePriceRangeChange}>
                    <option value="">Select Price Range</option>
                    <option value="0-50">$0 - $50</option>
                    <option value="51-100">$51 - $100</option>
                    <option value="101-200">$101 - $200</option>
                    <option value="201-999">$201 - $999</option>
                    <option value="1000+">$1000 and above</option>
                </select>
            </div>

            <div className="cart-icon">
                <span onClick={viewCart}>
                    <FaShoppingCart /> {cart.length}
                </span>
            </div>

            <div className="cart-icon" style={condition ? { display: "none" } : {}}>
                {!t ? (
                    <button className="login-btn" onClick={login}>Login</button>
                ) : (
                    <button className="login-btn" onClick={logout}>Logout</button>
                )}
            </div>

            {condition ? (
                <button className="food-button" onClick={home}>
                    Home
                </button>
            ) : (
                <button className="food-button" onClick={goToFood}>
                    Order Food
                </button>
            )}
        </div>
    );
};

export default Search;
