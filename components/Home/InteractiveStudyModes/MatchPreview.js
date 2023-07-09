import Link from "next/link";
import { useState } from "react";
import Button from "@components/general/Button";
import { Flippable } from "../../general/Flippable";

export default function MatchPreview({ play }) {
    return <Client play={play} />;
}

function Client({ play }) {
    const cards = [
        {
            front: "Use tongs",
            back: "",
        },
        {
            front: "If a lab experiment is not completed, you should...",
            back: "",
        },
        {
            front: "Away from all people",
            back: "",
        },

        {
            front: "You are heating a piece of glass and now want to pick it up. You should...",
            back: "",
        },
        {
            front: "Discuss the issue with your instructor",
            back: "",
        },
        {
            front: "You are heating a substance in a test tube. Always point the open end of the tube",
            back: "",
        },
    ];
    const [selected, setselected] = useState(null);
    return (
        <div id="match-preview">
            <div className="card-grid">
                {cards.map((card, index) => (
                    <Flippable
                        className={selected === index && "selected"}
                        front={<div className="title-1">{card.front}</div>}
                        key={index}
                        hasWatermark
                        active={false}
                        onClick={() => {
                            if (selected === index) {
                                setselected(null);
                            } else {
                                play();
                                setselected(index);
                            }
                        }}
                    />
                ))}
            </div>
            <Flippable
                className="cta-card"
                back={
                    <>
                        <div className="jumbo-1">Match</div>
                        <div className=" mt-2 mx-0 text-blue-400 break-words">
                            Match related cards to clear. Clear them all to win!
                        </div>
                        <Link href="/browse" target="_blank">
                            <Button
                                size="sm"
                                variant="secondary"
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                Play Match Mode
                            </Button>
                        </Link>
                    </>
                }
                front={
                    <>
                        <div className="jumbo-1">Flip Me!</div>
                    </>
                }
                hasWatermark
                onFlip={play}
                onClick={() => {
                    window?.umami?.("Click - Home - MatchPreview - Card");
                }}
            />
        </div>
    );
}
