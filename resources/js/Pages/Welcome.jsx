import Navbar from "@/Components/Navbar/Navbar";
import Layout from "@/Layouts/Layout";
import { Head, Link } from "@inertiajs/react";
import Home from "./Home/Home";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    return (
        <>
            <Head title="" />
            <Layout>
                <Home />
            </Layout>
        </>
    );
}
