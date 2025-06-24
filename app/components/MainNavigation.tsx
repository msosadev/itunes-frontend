import { DiscAlbum, Guitar, House, SearchIcon } from "lucide-react";
import NavigationItem from "./NavigationItem";

function MainNavigation() {
    return (
        <nav className="bg-gray-800 border-t border-gray-700 md:border-t-0 md:border-r h-full">
            <ul className="flex items-center justify-center gap-6 md:justify-start md:gap-8 md:flex-col md:items-start md:sticky md:top-0 p-4">
                <NavigationItem to="/" icon={House} />
                <NavigationItem to="/search" icon={SearchIcon} />
                <NavigationItem to="/artist" icon={Guitar} autoDissapear={true} />
                <NavigationItem to="/album" icon={DiscAlbum} autoDissapear={true} />
            </ul>
        </nav>
    )
}

export default MainNavigation;