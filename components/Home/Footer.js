
export default function Footer() {
    return (
        <div className="flex justify-evenly items-top mb-5">
                <div className="w-1/4">
                    <p className="flex items-center text-xl font-bold">
                    {cardsIcon} <span className="ml-3">flippy</span>
                    </p>
                    <p className="text-base font-semibold mt-4">
                        Flippy is a dynamic online flashcard platform designed to transform your learning experience by making it more engaging, efficient, and personalized. Leveraging advanced search features, customizable flashcard sets, and progress tracking, our service supports a broad range of subjects, helping learners of all levels master new topics at their own pace and in their preferred learning style.
                    </p>
                </div>

                <section className="flex justify-evenly w-2/6 h-20">
                    <ul className="flex flex-col justify-between h-11">
                        <li className="font-bold">About us</li>
                        <li>Our Story</li>
                        <li>Press</li>
                        <li>Careers</li>
                        <li>Dis my cord</li>
                    </ul>
                    <ul className="flex flex-col justify-between">
                        <li className="font-bold">Browse by Subject</li>
                        <li>Physics</li>
                        <li>History</li>
                        <li>Mathematics</li>
                        <li>Language</li>
                        <li>Geography</li>
                    </ul>
                    <ul className="flex flex-col justify-between">
                        <li className="font-bold">Help & Support</li>
                        <li>FAQ</li>
                        <li>Contact Us</li>
                        <li>Tutorials</li>
                        <li>Terms of Service</li>
                        <li>Privacy Policy</li>
                    </ul>
                </section>
        </div>
    )
 }


const cardsIcon = (
    <svg
        width="27"
        height="37"
        viewBox="0 0 27 37"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <mask id="path-1-inside-1_2134_8395" fill="white">
            <rect y="9" width="20" height="28" rx="3.96369" />
        </mask>
        <rect
            y="9"
            width="20"
            height="28"
            rx="3.96369"
            stroke="#124898"
            strokeWidth="8.66854"
            mask="url(#path-1-inside-1_2134_8395)"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.3343 4.33427V6.99454H7V3.9637C7 1.77461 8.77461 0 10.9637 0H23.0363C25.2254 0 27 1.77461 27 3.96369V24.0363C27 26.2254 25.2254 28 23.0363 28H21.08V23.6657H22.6657V4.33427H11.3343ZM19.16 23.6657H11.3343V9.16028H7V24.0363C7 26.2254 8.77461 28 10.9637 28H19.16V23.6657Z"
            fill="#124898"
        />
    </svg>
);