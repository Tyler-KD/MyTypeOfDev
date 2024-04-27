import React from "react";
import Navbar from "./Navbar"

// Header component styles the header and links the Navbar component
const Header = () => {
    return (
        <header className="sm:px-6 lg:px-8 mx-auto max-w-[1500px]">
            <Navbar />
        </header>
    )
}

export default Header;