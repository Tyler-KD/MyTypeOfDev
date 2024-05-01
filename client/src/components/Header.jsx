import Navbar from "./Navbar";

// Header component styles the header and links the Navbar component
const Header = () => {
    return (
        <header className="flex-grow mx-auto max-w-[1600px]">

            <Navbar />
        </header>
    )
}

export default Header;