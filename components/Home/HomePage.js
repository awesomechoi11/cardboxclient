import clsx from "clsx";
import Button from "@components/general/Button";
import { useRouter } from "next/router";
import Image from "next/image";
import { useIsMobile } from "@components/mediaQueryHooks";

export default function HomePage() {
    const router = useRouter();
    const isMobile = useIsMobile();

    return (
        <div>
            {/* Just for note purposes, the custom media queries are based on min-width, so the given px, as long as it's bigger than it, will classify as desktop, tablet, mobile  */}
            <section className="desktop:pt-7 tablet:pt-5 pt-1 desktop:pb-10 pb-0  bg-white dark:bg-black overflow-x-hidden">
                <div className="desktop:flex items-center desktop:w-4/6 w-5/6  mx-auto mb-9 justify-between">
                    <div className="desktop:w-1/3 desktop:space-y-3 space-y-4 desktop:mt-0 mt-6 text-left">
                        <p className="desktop:text-3xl text-[36px] font-semibold leading-tight ">
                            Study <span className="text-pink-500">smarter</span>,{" "}
                            <br></br> not harder
                        </p>
                        <p className="text-base">
                            Whatever your learning journey, flippy is here to
                            guide you. Dive into a world of knowledge, powered
                            by the simplicity of flashcards and the flexibility
                            of digital learning
                        </p>
                        <Button
                            variant="pink"
                            onClick={() => router.push("/browse")}
                        >
                            Browse Packs
                        </Button>
                    </div>
                    <div className="flex justify-evenly relative space-x-4 desktop:translate-x-10 ">
                        <Image
                            src="/assets/img/geography.png"
                            alt="poopyfarthead"
                            width="267"
                            height="318"
                            className="desktop:mt-0 mt-6"
                        />
                        <Image
                            src="/assets/img/history.png"
                            alt="poopyfarthead"
                            width="267"
                            height="318"
                            className="desktop:mt-0 mt-6"
                        />
                        <Image
                            src="/assets/img/sphinxTwo.png"
                            alt="poopyfarthead"
                            width="267"
                            height="318"
                            className="desktop:mt-0 mt-6"
                        />
                    </div>

                </div>
                <section className="
                desktop:bg-none tablet:bg-none 
                before:bg-[url('/assets/img/flippybanner.png')] before:absolute before:inset-0 before:opacity-20 before:desktop:bg-none before:tablet:bg-none
                relative desktop:py-0 tablet:py-0 py-8">
                    <div className="desktop:flex items-center desktop:w-4/6 mx-auto justify-between isolate">
                        {!isMobile && (
                            <Image
                                src="/assets/img/flippybanner.png"
                                alt="diarreafarthead"
                                width="621"
                                height="375"
                                className="tablet:flex tablet:mx-auto tablet:my-5"
                            />
                        )}

                        <div className="desktop:w-1/3 desktop:text-right desktop:space-y-3 tablet:space-y-5 tablet:mb-5 w-full  space-y-4  text-center">
                            <p className="desktop:text-3xl text-3xl font-semibold leading-tight">
                                Unlock your{" "}
                                <span className="text-yellow-500">potential</span>
                            </p>
                            <p className="text-base">
                                Our intuitive and easy-to-use flashcard app is designed
                                to help you learn and retain information more
                                effectively. Whether you{"'"}re a student or a
                                professional, our personalized flashcard experience will
                                help you unlock your full potential.
                            </p>
                            <Button variant="yellow">Browse Packs</Button>
                        </div>
                    </div>
                </section>

            </section>

            <section className="desktop:flex justify-center desktop:py-10 py-8 bg-slate-50">
                <div className="desktop:w-1/3 desktop:space-y-3 space-y-5 text-center">
                    <p className="desktop:text-3xl text-2xl font-semibold leading-tight">
                        Learning, <br></br>{" "}
                        <span className="text-cyan-500">Redefined!</span>
                    </p>
                    <div className="
                    flex 
                    desktop:flex-row desktop:justify-evenly 
                    tablet:flex-row  tablet:justify-evenly
                    flex-col items-center space-y-4 space-x-3">
                        <Image
                            src="/assets/img/bulb.png"
                            alt="pooperfarthead"
                            width={150}
                            height={135}
                        />
                        <Image
                            src="/assets/img/thumbs.png"
                            alt="pooperfarthead"
                            width={150}
                            height={135}
                        />
                        <Image
                            src="/assets/img/peeple.png"
                            alt="pooperfarthead"
                            width={150}
                            height={135}
                        />
                    </div>

                    <p className="text-base">
                        Useful features that allow users to monitor their learning progress. These include tracking viewed flashcards, marking known ones, identifying challenging areas, and providing insights into study habits.

                    </p>
                    <Button variant="cyan">Browse Packs</Button>
                </div>
            </section>
        </div>
    );
}
