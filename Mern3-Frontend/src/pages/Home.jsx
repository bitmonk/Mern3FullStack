import axios from "axios"
import Card from "../components/Card"
import Navbar from "../components/navbar"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Home() {
    const [blogs, setBlogs] = useState([])

    const fetchBlogs = async () => {
        const response = await axios.get("http://localhost:3000/blog");
        setBlogs(response.data.data)

    }
    useEffect(() => {
        fetchBlogs()
    }, [])
    return (
        <>
            <Navbar />
            <div className="flex flex-wrap">
                {
                    blogs.map((blog) => {
                        console.log(blog.image);

                        return (
                            <Card blog={ blog } />
                        )
                    })

                }

            </div>
        </>
    )
}

export default Home
