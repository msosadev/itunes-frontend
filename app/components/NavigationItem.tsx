import { NavLink } from "react-router";

export default function NavigationItem({
    to,
    autoDissapear = false,
    icon: Icon
}: {
    to: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    autoDissapear?: boolean;
}) {
    return (
        <NavLink
            to={to}
            className={`text-white hover:text-gray-300 [.active]:bg-gradient-to-r from-primary to-secondary ${autoDissapear ? "hidden [.active]:block" : "block" }  p-0.5 rounded-full`}
        >
            <div className="bg-gray-900 rounded-full p-3">
                <Icon />
            </div>
        </NavLink>
    );
}