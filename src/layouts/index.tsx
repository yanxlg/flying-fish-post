import React from "react";
import BasicLayout from "./BasicLayout";

export default function(props: any) {
    const pathname = props.location.pathname;
    console.log(pathname);
    if (pathname === "/login" || pathname === "/404" || pathname === "/500") {
        return props.children;
    }
    console.log(props);
    return <BasicLayout {...props} />;
}
