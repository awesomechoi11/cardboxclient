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
            <section className="desktop:pt-7 tablet:pt-5 pt-1 desktop:pb-10 pb-0  bg-white dark:bg-black">
                <div className="desktop:flex items-center desktop:w-4/6 w-5/6  mx-auto mb-9 justify-evenly">
                    <div className="desktop:w-1/3 desktop:space-y-3 space-y-4 desktop:mt-0 mt-6 text-left">
                        <p className="desktop:text-3xl text-2xl font-semibold leading-tight ">
                            Study <span className="text-pink-500">smarter</span>{" "}
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
                    <Image
                        src="/assets/img/placeholder.png"
                        alt="poopyfarthead"
                        width="666"
                        height="238"
                        className="desktop:mt-0 mt-6"
                    />
                </div>
                <section className="
                desktop:bg-none tablet:bg-none 
                before:bg-hero-pattern before:absolute before:inset-0 before:opacity-20 before:desktop:bg-none before:tablet:bg-none
                relative desktop:py-0 tablet:py-0 py-8">
                    <div className="desktop:flex items-center w-4/6 mx-auto justify-evenly isolate">
                        {!isMobile && (
                            <Image
                                src="/assets/img/flippybanner.png"
                                alt="diarreafarthead"
                                width="621"
                                height="375"
                            />
                        )}

                        <div className="desktop:w-1/3 w-full desktop:space-y-3 space-y-4 desktop:text-right text-center">
                            <p className="desktop:text-3xl text-2xl font-semibold leading-tight">
                                Unlock your{" "}
                                <span className="text-yellow-500">potential</span>
                            </p>
                            <p className="text-base">
                                Whatever your learning journey, flippy is here to
                                guide you. Dive into a world of knowledge, powered
                                by the simplicity of flashcards and the flexibility
                                of digital learning
                            </p>
                            <Button variant="yellow">Browse Packs</Button>
                        </div>
                    </div>
                </section>

            </section>

            <section className="desktop:flex justify-center desktop:py-10 py-8 bg-slate-50">
                <div className="desktop:w-1/3 desktop:space-y-3 space-y-5 text-center">
                    <p className="desktop:text-3xl text-2xl font-semibold leading-tight">
                        Learning <br></br>{" "}
                        <span className="text-cyan-500">Redefined!</span>
                    </p>
                    <Image
                        src="/assets/img/redefined.png"
                        alt="pooperfarthead"
                        width={409}
                        height={115}
                        className="mx-auto"
                    />
                    <p className="text-base">
                        Our intuitive and easy-to-use flashcard app is designed
                        to help you learn and retain information more
                        effectively. Whether you{"'"}re a student or a
                        professional, our personalized flashcard experience will
                        help you unlock your full potential.
                    </p>
                    <Button variant="cyan">Browse Packs</Button>
                </div>
            </section>
        </div>
    );
}


