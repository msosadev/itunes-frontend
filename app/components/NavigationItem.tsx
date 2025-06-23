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
            className={`text-white hover:text-gray-300 magic-gradient after:opacity-0 [.active]:after:opacity-100 ${autoDissapear ? "hidden [.active]:block pointer-events-none" : "block" }  p-0.5 rounded-full`}
        >
            <div className="bg-gray-900 rounded-full p-3 relative z-[1]">
                <Icon />
            </div>
        </NavLink>
    );
}