import React, { useContext, useState } from "react";
import { atomFamily, useRecoilState, useRecoilValue } from "recoil";
import { useDidUpdate } from "rooks";
import { cardDefaultSideState, cardsMapState } from "../CardPackUtils";

export const CardDisplayContext = React.createContext();
CardDisplayContext.displayName = "CardDisplayContext";

export const cardDisplayModeState = atomFamily({
    key: "cardDisplayModeState",
    default: "grid", // grid, row
});
export const cardDisplayResetState = atomFamily({
    key: "cardDisplayResetState",
    default: true, // grid, row
});

const AtomFamilyKeyPrefix = "CardDisplay";

export function useCardDisplayCardState(index) {
    const data = useContext(CardDisplayContext);
    const { _id: id, cards } = data;

    const cardDefaultSide = useRecoilValue( cardDefaultSideState(AtomFamilyKeyPrefix + id)); // prettier-ignore
    const cardsMap = useRecoilValue(cardsMapState(AtomFamilyKeyPrefix + id)); // prettier-ignore
    const cardDisplayReset = useRecoilValue( cardDisplayResetState(AtomFamilyKeyPrefix + id)); // prettier-ignore
    const [cardSide, setCardSide] = useState(false);

    useDidUpdate(() => {
        setCardSide(cardDefaultSide);
    }, [cardDefaultSide, cardDisplayReset]);
    return {
        cardSide,
        flipCard: () => {
            setCardSide(!cardSide);
        },
        cardData: cards[cardsMap[index]],
    };
}

export function useCardDisplayControls() {
    const data = useContext(CardDisplayContext);
    const { _id: id, cards } = data;

    const [cardDefaultSide, setCardDefaultSide] = useRecoilState( cardDefaultSideState(AtomFamilyKeyPrefix + id) ); // prettier-ignore
    const [cardsMap, setCardsMap] = useRecoilState( cardsMapState(AtomFamilyKeyPrefix + id) ); // prettier-ignore
    const [cardDisplayMode, setCardDisplayMode] = useRecoilState( cardDisplayModeState(AtomFamilyKeyPrefix + id) ); // prettier-ignore
    const [cardDisplayReset, setCardDisplayReset] = useRecoilState( cardDisplayResetState(AtomFamilyKeyPrefix + id) ); // prettier-ignore

    const shuffle = () => {
        let copy = JSON.parse(JSON.stringify(cardsMap));
        /* Randomize array in-place using Durstenfeld shuffle algorithm */
        for (var i = copy.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = copy[i];
            copy[i] = copy[j];
            copy[j] = temp;
        }
        setCardsMap(copy);
    };
    const flipDefaultSide = () => {
        setCardDefaultSide(!cardDefaultSide);
    };
    const resetCards = () => {
        setCardDisplayReset(!cardDisplayReset);
    };
    return {
        shuffle,
        flipDefaultSide,
        cardDisplayMode,
        setCardDisplayMode,
        resetCards,
    };
}
