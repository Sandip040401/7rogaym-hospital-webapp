import { Link } from "react-router-dom";


export default function AdminDashboard(){
    return(
        <>
            <div className="flex justify-center h-screen items-center text-2xl">
                <Link to='/admin-dashboard' className="text-blue-500 hover:text-blue-800"> click here </Link> &nbsp; to go to the Admin Dashboard
            </div>
        </>
    )
}