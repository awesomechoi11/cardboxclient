import { AnimatePresence } from "framer-motion";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useDidUpdate } from "rooks";
import useSound from "use-sound";
import Card from "./Card";
import { useCardSwiperControls } from "./_CardSwiperUtils";

export default function CardStack() {
    const [play] = useSound("/cardflip.m4a");
    const { currentCard, cardDefaultSide } = useCardSwiperControls();
    useDidUpdate(() => {
        play();
    }, [currentCard, cardDefaultSide]);
    const [placeholders, setPlaceholders] = useState([
        {
            backgroundColor: "#E7CDB5",
            key: nanoid(),
        },
        {
            backgroundColor: "#E4BF9C",
            key: nanoid(),
        },
        // {
        //     backgroundColor: "#EFD9C4",
        //     key: nanoid(),
        // },
        // {
        //     backgroundColor: "#E0C3AB",
        //     key: nanoid(),
        // },
    ]);
    function shiftPlaceholder() {
        let copy = JSON.parse(JSON.stringify(placeholders));
        let old = copy.pop();
        old.key = nanoid();
        copy.unshift(old);
        setPlaceholders(copy);
    }

    useDidUpdate(() => {
        shiftPlaceholder();
    }, [currentCard]);

    return (
        <div className="stack">
            <AnimatePresence>
                {placeholders.map(({ backgroundColor, key }, arrIndex, arr) => {
                    // on top if last card
                    const onTop = arr.length - 1 === arrIndex;
                    if (onTop) {
                        return (
                            <Card
                                active
                                key={key}
                                backgroundColor={backgroundColor}
                                index={arrIndex}
                                play={play}
                            />
                        );
                    }

                    return (
                        <Card
                            key={key}
                            backgroundColor={backgroundColor}
                            index={arrIndex}
                        />
                    );
                })}
            </AnimatePresence>
        </div>
    );
}
