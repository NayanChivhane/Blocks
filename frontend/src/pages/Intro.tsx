import { Link } from "react-router-dom"
import { Appbar } from "../components/Appbar"


export const Intro=()=>{
    return <div>
        <Appbar/>
        <div className="h-screen flex flex-col justify-center">
            <div className="flex justify-center font-bold text-lg">

            Welcome to my blogging website. Here you can read bes blogs in the world.
           
            </div>
            <div className="flex justify-center mt-4">

            <Link to={"/signup"}><button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up</button>
            </Link>
            </div>
        </div>
    </div>
}