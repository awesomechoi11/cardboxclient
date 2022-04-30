import { Button } from "react-bootstrap";
import { Flippable } from "../../general/Flippable";
import Link from "next/link";

export default function MatchPreview({ play }) {
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
    return (
        <div id="match-preview">
            <div className="card-grid">
                {cards.map((card, index) => (
                    <Flippable
                        front={<div className="title-1">{card.front}</div>}
                        key={index}
                        hasWatermark
                        onFlip={play}
                        active={false}
                    />
                ))}
            </div>
            <Flippable
                className="cta-card"
                back={
                    <>
                        <div className="jumbo-1">Match</div>
                        <div className="description-1">
                            Match related cards to clear. Clear them all to win!
                        </div>
                        <Link href="/browse">
                            <a target="_blank">
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                >
                                    Play Match Mode
                                </Button>
                            </a>
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
            />
        </div>
    );
}
