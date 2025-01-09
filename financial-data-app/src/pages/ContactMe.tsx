import React from "react";

export default function ContactMe() {
    return (
        <div className="flex flex-col justify-center items-center bg-gray-100 p-6 rounded-lg shadow-md max-w-md w-full mx-auto space-y-6">
            <h2 className="text-2xl font-semibold text-gray-700">Contact Me</h2>

            {/* LinkedIn */}
            <a
                href="https://www.linkedin.com/in/patrick-allen-540938246/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit my LinkedIn profile"
                className="flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
                <img src="/linkedin.svg" alt="LinkedIn Icon" className="w-6 h-6" />
                LinkedIn
            </a>

            {/* GitHub */}
            <a
                href="https://github.com/PatAll1305"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit my GitHub profile"
                className="flex items-center gap-3 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition"
            >
                <img src="/github.svg" alt="GitHub Icon" className="w-6 h-6" />
                GitHub
            </a>

            {/* Email */}
            <a
                href="mailto:patrickallen1305@gmail.com"
                aria-label="Send me an email"
                className="flex items-center gap-3 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
            >
                <img src="/email.svg" alt="Email Icon" className="w-6 h-6" />
                Email
            </a>
        </div>
    );
}
