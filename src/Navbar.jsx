import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="p-4 flex gap-2 justify-center">
            <NavBtn to="/add" className="rounded-l-4xl rounded-r-lg ">
                Add Progress
            </NavBtn>
            <NavBtn to="/view" className="rounded-l-lg rounded-r-4xl">
                View Progress
            </NavBtn>
        </nav>
    );
}

export default Navbar;

function NavBtn({ to = "/", children,className }) {
    return (
        <NavLink to={to}
            className={({ isActive }) => (`p-2 px-4 border border-black ${isActive ? "bg-black text-white" : "bg-white "} ${className}`)}
        >
            {children}
        </NavLink>
    )
}