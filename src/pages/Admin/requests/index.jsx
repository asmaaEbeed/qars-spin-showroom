import React, { useEffect } from 'react'
import MainLayout from '../../../components/layout/MainLayout'
import RequestsHeader from '../../../components/requests/RequestsHeader'
import RequestFilter from '../../../components/requests/RequestFilter'
import RequestsList from '../../../components/requests/RequestsList'
import { useRequestContext } from '../../../context/RequestContext'

const Requests = () => {
    const { fetchRequests, requests } = useRequestContext()
    useEffect(() => {
        fetchRequests()
    }, [fetchRequests])

    return (
        <MainLayout>
            <RequestsHeader requests={requests} description="Manage and track your clients requests." />
            <div className="max-w-7xl mx-auto px-6 py-4">


                <RequestFilter />
                <RequestsList />
            </div>
        </MainLayout>
    )
}

export default Requests