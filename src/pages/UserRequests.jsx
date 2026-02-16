import { useEffect } from "react"
import { useRequestContext } from "../context/RequestContext"
import MainLayout from "../components/layout/MainLayout"
import RequestsHeader from "../components/requests/RequestsHeader"
import RequestFilter from "../components/requests/RequestFilter"
import RequestsList from "../components/requests/RequestsList"
import { useAuth } from "../context/AuthContext"


const UserRequests = () => {
    const { fetchUserRequests, requests } = useRequestContext()
    const { user } = useAuth()
    useEffect(() => {
        fetchUserRequests(user.userName)
    }, [fetchUserRequests, user])

    return (
        <MainLayout>
            <RequestsHeader requests={requests} description="Manage and track your clients requests." />
            <div className="max-w-7xl mx-auto px-6 py-4">
                <RequestFilter isUser={true} />
                <RequestsList isUser={true}/>
            </div>
        </MainLayout>
    )
}

export default UserRequests