import { Outlet } from "react-router";
import Header from "./header/Header";

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default Layout