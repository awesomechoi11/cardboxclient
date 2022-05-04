import clsx from "clsx";
import { useState } from "react";
import { Flippable } from "../general/Flippable";
import Link from "next/link";
import Image from "next/image";
import Button from "@components/general/Button";

export function CreateYourOwnPacks({ play }) {
    return (
        <div id="create-your-own-packs">
            <div className="background" />
            <Flippable
                hasWatermark
                front={
                    <>
                        <Image
                            src="https://ucarecdn.com/cd15bed7-a920-48b5-a6d0-fa72b7de99f7/-/scale_crop/400x400/smart/"
                            alt="zenitsu face"
                            layout="fixed"
                            width="200rem"
                            height="200rem"
                        />
                        Name this character
                    </>
                }
                back="Zenitsu Agatsumad"
                onFlip={play}
                className="card1"
                onClick={() => {
                    window?.umami?.(
                        "Click - Home - CreateYourOwnPacks - Cards"
                    );
                }}
            />
            <Flippable
                hasWatermark
                front={
                    <>
                        One of the ancient world wonders, the “Hanging Gardens,”
                        was found in which city?
                    </>
                }
                back={
                    <>
                        <Image
                            src="https://ucarecdn.com/e9c1edee-0693-43b2-b173-e0cfd95f8063/-/scale_crop/400x400/smart"
                            alt="babylon"
                            layout="fixed"
                            width="200rem"
                            height="200rem"
                        />
                        <div className="subtitle-2">Babylon</div>
                    </>
                }
                onFlip={play}
                className="card2"
            />
            <Flippable
                hasWatermark
                front={
                    <>
                        <Image
                            src="https://ucarecdn.com/0c586228-d7d8-4fc2-bd02-1d07cf086b57/-/scale_crop/400x400/smart/"
                            alt="burette"
                            layout="fixed"
                            width="200rem"
                            height="200rem"
                        />
                        {`A long tube of glass, usually marked in 0.1 mL units,
                        that's equipped with a stopcock and used for the
                        controlled addition of a liquid to a receiving flask.`}
                    </>
                }
                back={
                    <>
                        <div className="subtitle-2"> What is a burret?</div>
                    </>
                }
                onFlip={play}
                className="card3"
            />
            <div className="cta">
                <div className="jumbo-1">Create Your Own Packs</div>
                <div className="description-1">
                    Create & Share Your Card Packs with just your friends or
                    everybody!
                </div>
                <Link href="/card-pack-editor">
                    <a target="_blank">
                        <Button>Create Pack</Button>
                    </a>
                </Link>
            </div>
        </div>
    );
}
