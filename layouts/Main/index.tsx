import { NextPage } from "next"
import React from "react"
import Footer from "./Footer"
import Header from "./Header"

interface MainLayoutProp {
    children: React.ReactNode
}
const MainLayout: NextPage<MainLayoutProp> = ({ children }) => {

    return (
        <div className="LAYOUT-MAIN">
            <Header />

            {children}

            <Footer />

        </div>
    )
}

export default MainLayout