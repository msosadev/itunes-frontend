import { DiscAlbum, Guitar, House, SearchIcon } from "lucide-react";
import NavigationItem from "./NavigationItem";

function MainNavigation() {
    return (
        <nav className="bg-gray-900 p-4 fixed bottom-0 inset-x-0 ">
            <ul className="flex items-center justify-center gap-6">
                <NavigationItem to="/" icon={House} />
                <NavigationItem to="/search" icon={SearchIcon} />
                <NavigationItem to="/artist" icon={Guitar} autoDissapear={true} />
                <NavigationItem to="/album" icon={DiscAlbum} autoDissapear={true} />
            </ul>
        </nav>
    )
}

export default MainNavigation;