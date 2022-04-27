import { useIsomorphicLayoutEffect } from "framer-motion";
import { useContext, useEffect } from "react";
import { useRecoilState } from "recoil";
import { CardPackContext } from "../../../../pages/card-pack/[cardPackId]/[modePath]";
import { alphaNumId } from "../../../utils";
import { cardFacesSelector, gameStateFamily, randomizeCards } from "./utils";

export default function GameLogicFragment({ setGameSettings, gameSettings }) {
    const [{ cardFaces, cardFaceSetter }, setCardFaces] =
        useRecoilState(cardFacesSelector);
    const [currentRound, setCurrentRound] = useRecoilState(
        gameStateFamily("currentRound")
    );

    const [playing, setPlaying] = useRecoilState(gameStateFamily("playing"));
    const [time, setTime] = useRecoilState(gameStateFamily("time"));
    const { data } = useContext(CardPackContext);
    useIsomorphicLayoutEffect(() => {
        if (!cardFaces?.length) setCardFaces(randomizeCards(data.cards));
    }, []);

    useEffect(() => {
        const roundCleared =
            cardFaces.length &&
            cardFaces.every((face) => face.gameState === "cleared");

        if (roundCleared) {
            // if game finished // goto/show post game screen
            if (currentRound >= gameSettings.category.value) {
                console.log(time, currentRound);
                setGameSettings({
                    action: "set",
                    data: {
                        stage: "post-game-screen",
                        time,
                        gameId: alphaNumId(),
                    },
                });
                return;
            }

            // stop playing and timer
            // increase current round
            // reshuffle cards
            setCurrentRound(currentRound + 1);
            setPlaying(false);
            setCardFaces(randomizeCards(data.cards));

            return;
        }

        const selectedFaces = cardFaces.filter(
            (cardFace) => cardFace.gameState === "selected"
        );
        if (selectedFaces.length > 2) {
            selectedFaces.forEach((face) =>
                cardFaceSetter(face.faceId, { gameState: "default" })
            );
        } else if (selectedFaces.length === 2) {
            let firstSelection = selectedFaces[0];
            let secondSelection = selectedFaces[1];
            if (firstSelection.cardId === secondSelection.cardId) {
                console.log("match!");
                cardFaceSetter(firstSelection.faceId, { gameState: "correct" });
                cardFaceSetter(secondSelection.faceId, {
                    gameState: "correct",
                });
            } else {
                console.log("wrong!");
                cardFaceSetter(firstSelection.faceId, { gameState: "wrong" });
                cardFaceSetter(secondSelection.faceId, { gameState: "wrong" });
            }
        }

        // selectedFaces.every(card)
        // console.log(selectedFaces);
    }, [cardFaces]);
    return null;
}
