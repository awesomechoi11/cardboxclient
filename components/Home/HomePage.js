import clsx from "clsx";
import Button from "@components/general/Button";
import { useRouter } from "next/router";
import Image from "next/image";

export default function HomePage() {
    const router = useRouter();

    return (
        <div>
            <section className="bg-white pt-12 pb-10">
                <div className="flex justify-evenly items-center mb-12 w-4/6 mx-auto">
                    <div className="text-left w-1/3 space-y-3">
                        <p className="text-3xl font-semibold">Study <span className="text-pink-500">smarter</span> <br></br> not harder</p>
                        <p>Whatever your learning journey, flippy is here to guide you. Dive into a world of knowledge, powered by the simplicity of flashcards and the flexibility of digital learning</p>
                        <Button
                            variant="pink"
                            onClick={() => router.push("/browse")}
                        >
                            Browse Packs
                        </Button>
                    </div>
                    <Image
                        src="/assets/img/placeholder.png"
                        alt="poopyfarthead"
                        width="666"
                        height="238.5"
                    />
                </div>

                <div className="flex justify-evenly items-center w-4/6 mx-auto">
                    <Image
                        src="/assets/img/flippybanner.png"
                        alt="diarreafarthead"
                        width="621"
                        height="375"
                    />
                    <div className="text-right w-1/3 space-y-3">
                        <p className="text-3xl font-semibold">Unlock your <span className="text-yellow-500">potential</span></p>
                        <p>Our intuitive and easy-to-use flashcard app is designed to help you learn and retain information more effectively. Whether you're a student or a professional, our personalized flashcard experience will help you unlock your full potential.</p>
                        <Button
                            variant="yellow"
                            onClick={() => router.push("/browse")}
                        >
                            Browse Packs
                        </Button>
                    </div>
                </div>

            </section>

            <section className="bg-slate-50 flex justify-center py-12">
                <div className="text-center w-1/3 space-y-3">
                    <p className="text-3xl font-semibold">Learning <br></br> <span className="text-cyan-500">Redefined!</span></p>
                    <Image
                        src="/assets/img/redefined.png"
                        alt="pooperfarthead"
                        width={409}
                        height={115}
                    />
                    <p>Useful features that allow users to monitor their learning progress. These include tracking viewed flashcards, marking known ones, identifying challenging areas, and providing insights into study habits.</p>
                    <Button
                        variant="cyan"
                        onClick={() => router.push("/browse")}
                    >
                        Browse Packs
                    </Button>
                </div>
            </section>

            <footer className="flex justify-evenly items-top pt-10">
                <div className="w-1/4">
                    <p className="flex items-center text-2xl font-bold">
                        {cardsIcon} <span className="ml-5">flippy</span>
                    </p>
                    <p className="text-base font-semibold mt-6">
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


            </footer>

        </div>
    )
}


const cardsIcon = (
    <svg width="40.5" height="55.5" viewBox="0 0 27 37" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="path-1-inside-1_2134_8395" fill="white">
            <rect y="9" width="20" height="28" rx="3.96369" />
        </mask>
        <rect y="9" width="20" height="28" rx="3.96369" stroke="#124898" stroke-width="8.66854" mask="url(#path-1-inside-1_2134_8395)" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3343 4.33427V6.99454H7V3.9637C7 1.77461 8.77461 0 10.9637 0H23.0363C25.2254 0 27 1.77461 27 3.96369V24.0363C27 26.2254 25.2254 28 23.0363 28H21.08V23.6657H22.6657V4.33427H11.3343ZM19.16 23.6657H11.3343V9.16028H7V24.0363C7 26.2254 8.77461 28 10.9637 28H19.16V23.6657Z" fill="#124898" />
    </svg>

);

