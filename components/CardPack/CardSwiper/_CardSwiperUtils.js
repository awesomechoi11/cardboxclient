import React, { useContext, useMemo } from "react";
import { useRecoilState } from "recoil";
import {
    cardDefaultSideState,
    cardIndexState,
    cardsMapState,
} from "../CardPackUtils";
export const CardSwiperContext = React.createContext();
CardSwiperContext.displayName = "CardSwiperContext";

export function useCardSwiperControls() {
    const data = useContext(CardSwiperContext);
    const { _id: id, cards } = data;
    const [cardIndex, setCardIndex] = useRecoilState(
        cardIndexState("CardSwiper" + id)
    );
    const [cardsMap, setCardsMap] = useRecoilState(
        cardsMapState("CardSwiper" + id)
    );
    const [cardDefaultSide, setCardDefaultSide] = useRecoilState(
        cardDefaultSideState("CardSwiper" + id)
    );
    const currentCard = useMemo(
        () => cards[cardsMap.at(cardIndex % cardsMap.length)],
        [cards, cardIndex, cardsMap]
    );
    const increment = (val = 1) => {
        setCardIndex(cardIndex + val);
    };
    const decrement = (val = 1) => {
        setCardIndex(cardIndex - val);
    };
    const shuffle = () => {
        let copy = JSON.parse(JSON.stringify(cardsMap));
        /* Randomize array in-place using Durstenfeld shuffle algorithm */
        for (var i = copy.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = copy[i];
            copy[i] = copy[j];
            copy[j] = temp;
        }
        setCardIndex(0);
        setCardsMap(copy);
    };
    const flipDefaultSide = () => {
        setCardDefaultSide(!cardDefaultSide);
    };
    return {
        increment,
        decrement,
        shuffle,
        currentCard,
        setCardsMap,
        cardsMap,
        cardIndex,
        cardDefaultSide,
        flipDefaultSide,
        relativeIndex: cardsMap.at(cardIndex % cardsMap.length),
    };
}
