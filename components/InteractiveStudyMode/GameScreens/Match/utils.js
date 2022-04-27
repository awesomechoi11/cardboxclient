import { atom, atomFamily, selector } from "recoil";
import { shuffleArray } from "../../../utils";

export const gameStateFamilyDefaults = {
    playing: false,
    currentRound: 1,
    time: null,
};
export const gameStateFamily = atomFamily({
    key: "match-rounds-game-state",
    default: (param) => gameStateFamilyDefaults[param],
});
export const cardFaceIdsState = atom({
    key: "cardFaceIdsState",
    default: [],
});
export const cardFaceFamily = atomFamily({
    key: "cardFaceFamily",
    default: {},
});
// returns all cards by iterating thru cardids and fetching them
// sets all cards by iterating thru newCards
// and finally setting cardsidsstate
export const cardFacesSelector = selector({
    key: "match-rounds-game-cardFacesSelector",
    get: ({ get, getCallback }) => {
        const cardFaceIds = get(cardFaceIdsState);
        const cardFaceSetter = getCallback(
            ({ snapshot, set }) =>
                async (faceId, newVal) => {
                    const currentCardFace = cardFaceFamily(faceId);
                    const currentCardFaceState = await snapshot
                        .getLoadable(currentCardFace)
                        .toPromise();
                    set(currentCardFace, {
                        ...currentCardFaceState,
                        ...newVal,
                    });
                }
        );
        return {
            cardFaces: cardFaceIds.map((cardId) => get(cardFaceFamily(cardId))),
            cardFaceSetter,
        };
    },
    set: ({ set, get }, newCards) => {
        const newCardFaceIds = newCards.map((cardFaceState) => {
            set(cardFaceFamily(cardFaceState.faceId), cardFaceState);
            return cardFaceState.faceId;
        });
        set(cardFaceIdsState, newCardFaceIds);
    },
});

export function randomizeCards(cards, count = 6) {
    const faces = shuffleArray(cards)
        .slice(0, count)
        .map((card) => {
            return [
                {
                    type: "term",
                    cardId: card.id,
                    faceId: card.term.id,
                    gameState: "default",
                    ...card.term,
                },
                {
                    type: "definition",
                    cardId: card.id,
                    faceId: card.definition.id,
                    gameState: "default",
                    ...card.definition,
                },
            ];
        })
        .flat();
    return shuffleArray(faces);
}
