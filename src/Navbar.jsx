import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="p-4 flex gap-4 justify-center">
            <NavBtn to="/add" >
                Add Progress
            </NavBtn>
            <NavBtn to="/view" >
                View All Progress
            </NavBtn>
        </nav>
    );
}

export default Navbar;

function NavBtn({ to = "/", children,className="" }) {
    return (
        <NavLink to={to}
            className={({ isActive }) => (` pb-1 font-semibold ${isActive ? "border-b-2 text-blue-600 border-blue-600 " : "bg-white text-gray-700 "} ${className}`)}
        >
            {children}
        </NavLink>
    )
}