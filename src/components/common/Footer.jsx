import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="text-sm text-white">
                        © {new Date().getFullYear()} Qars Spin. All rights reserved.
                    </div>
                    <div className="text-sm text-gray-500">
                        Developed by{" "}
                        <a
                            href="https://smartvillage.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:text-primary-700"
                        >
                            Smart Village
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer