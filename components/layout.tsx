import ResponsiveAppBar from "./responsiveAppBar";
import React from "react";

interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({children} : LayoutProps) {
    return (
        <>
            <ResponsiveAppBar />
            {children}
        </>
    )
}