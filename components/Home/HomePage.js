import clsx from "clsx";
import Button from "@components/general/Button";
import Image from "next/image";

export default function HomePage() {
    return (
        <div>
            <section className="bg-white pt-12 pb-10">
                <div className="flex justify-evenly items-center mb-12 w-4/6 mx-auto">
                    <div className="text-left w-1/3 space-y-3">
                        <p className="text-3xl font-semibold">Study <span className="text-pink-500">smarter</span> <br></br> not harder</p>
                        <p>Whatever your learning journey, flippy is here to guide you. Dive into a world of knowledge, powered by the simplicity of flashcards and the flexibility of digital learning</p>
                        <Button variant="pink">
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
                        <p>Whatever your learning journey, flippy is here to guide you. Dive into a world of knowledge, powered by the simplicity of flashcards and the flexibility of digital learning</p>
                        <Button variant="yellow">
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
                    <p>Our intuitive and easy-to-use flashcard app is designed to help you learn and retain information more effectively. Whether you're a student or a professional, our personalized flashcard experience will help you unlock your full potential.</p>
                    <Button variant="cyan">
                        Browse Packs
                    </Button>
                </div>
            </section>

        </div>
    )
}