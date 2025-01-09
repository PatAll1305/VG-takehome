import React from "react"

export default function ContactMe() {
    return (
        <div className="flex flex-wrap justify-evenly gap-10 items-center align-center space-y-6 bg-gray-100 p-6 rounded-lg shadow-md max-w-xs w-96">
            <h2 className="text-2xl font-semibold text-gray-700">Contact Me</h2>
            <a
                href="https://www.linkedin.com/in/patrick-allen-540938246/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
                <img src="/linkedin.svg" alt="LinkedIn" className="w-6 h-6" />
                My LinkedIn
            </a>
            <a
                href="https://github.com/PatAll1305"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition"
            >
                <img src="/github.svg" alt="GitHub" className="w-6 h-6" />
                My GitHub
            </a>
            <a
                href="mailto:patrickallen1305@gmail.com"
                className="flex items-center gap-3 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
            >
                <img src="/email.svg" alt="Email" className="w-6 h-6" />
                Email Me
            </a>
        </div>
    )
}