import { Link } from "react-router";

function MainNavigation() {
    return (
        <nav className="bg-gray-800 p-4 fixed bottom-0 inset-x-0 ">
            <ul className="flex items-center justify-center gap-6">
                <li>
                    <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                </li>
                <li>
                    <Link to="/search" className="text-white hover:text-gray-300">Search</Link>
                </li>
            </ul>
        </nav>
    )
}

export default MainNavigation;