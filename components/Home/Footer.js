
export default function Footer() {
    return (
        <div className="
        desktop:flex desktop:justify-evenly desktop:flex-row 
        flex flex-col-reverse  items-top mb-5">
            <div className="desktop:w-1/4 desktop:mx-0 w-5/6 mx-auto">
                <p className="flex items-center text-xl font-bold">
                    {cardsIcon} <span className="ml-3">flippy</span>
                </p>
                <p className="text-base font-semibold mt-4">
                    Flippy is a dynamic online flashcard platform designed to transform your learning experience by making it more engaging, efficient, and personalized. Leveraging advanced search features, customizable flashcard sets, and progress tracking, our service supports a broad range of subjects, helping learners of all levels master new topics at their own pace and in their preferred learning style.
                </p>
            </div>

            <section className="
                desktop:flex desktop:justify-evenly desktop:w-2/6 desktop:h-20
                flex leading-loose pb-5 
                ">
                <div className="flex tablet:mx-auto tablet:justify-evenly tablet:w-[800px] flex-wrap">
                    <ul className="flex flex-col  justify-self-start desktop:h-11">
                        <li className="font-bold">About us</li>
                        <li>Our Story</li>
                        <li>Press</li>
                        <li>Careers</li>
                        <li><a href="https://discord.gg/xGYGEPtC">Dis my cord</a></li>
                    </ul>
                    <ul className="flex flex-col desktop:justify-evenly justify-self-start">
                        <li className="font-bold">Browse by Subject</li>
                        <li>Physics</li>
                        <li>History</li>
                        <li>Mathematics</li>
                        <li>Language</li>
                        <li>Geography</li>
                    </ul>
                    <ul className="flex flex-col desktop:justify-evenly justify-self-start">
                        <li className="font-bold">Help & Support</li>
                        <li>FAQ</li>
                        <li>Contact Us</li>
                        <li>Tutorials</li>
                        <li>Terms of Service</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
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