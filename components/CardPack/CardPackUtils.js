import { atomFamily } from "recoil";

export const cardIndexState = atomFamily({
    key: "cardIndexState",
    default: 0,
});
export const cardsMapState = atomFamily({
    key: "cardsMapState",
    default: [],
});
// true : back, false : front
export const cardDefaultSideState = atomFamily({
    key: "cardDefaultSideState",
    default: false,
});
