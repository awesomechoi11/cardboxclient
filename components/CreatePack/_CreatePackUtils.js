import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890abcdef", 16);
import { arrayMove } from "@dnd-kit/sortable";
import { faker } from "@faker-js/faker";
import { ContentState } from "draft-js";
import copy from "fast-copy";
import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { useContext } from "react";
import { convertToRaw } from "draft-js";
import { convertFromRaw } from "draft-js";
import { shuffleArray } from "../utils";
import { generateEmptyCard } from "../../schemas/cardpacks/card";

export function useAtomFamilyWithContextId(useRecoilHook, atomFamily, context) {
    const id = useContext(context);
    return useRecoilHook(atomFamily(id));
}

export const createPackManualSaveTrigger = atom({
    key: "createPackManualSaveTrigger",
    default: 0,
});

export const createPackSaveState = atom({
    key: "createPackSaveState",
    default: {
        saving: false,
        lastUpdated: null,
    },
});
export const createPackSaveSelector = selector({
    key: "createPackSaveSelector",
    get: ({ get }) => get(createPackSaveState),
    set: ({ get, set }, newVal) => {
        const oldVal = get(createPackSaveState);
        set(createPackSaveState, {
            ...oldVal,
            ...newVal,
        });
    },
});

export const createPackAllDataSelector = selector({
    key: "createPackAllDataSelector",
    get: ({ get }) => {
        const cardIds = get(createPackCardIdsState);
        return cardIds.map((cardId) => {
            let cardData = copy(get(createPackAtomFamily(cardId)));
            cardData.definition.content = convertToRaw(
                cardData.definition.content
            );
            cardData.term.content = convertToRaw(cardData.term.content);
            return cardData;
        });
    },
    set: ({ get, set }, mongoCards) => {
        // set cardIds and createPackAtomFamily's through selector
        set(
            createPackCardIdsState,
            mongoCards.map((card) => card.id)
        );
        mongoCards.map((card) => {
            const cardData = copy(card);
            cardData.definition.content = convertFromRaw(
                cardData.definition.content
            );
            cardData.term.content = convertFromRaw(cardData.term.content);
            set(createPackSelectorFamily(card.id), {
                action: "set",
                data: cardData,
            });
        });
    },
});

export const createPackCardIdsState = atom({
    key: "createPackCardIdsState",
    default: [],
});
export const createPackAtomFamily = atomFamily({
    key: "createPackAtomFamily",
    default: (param) => generateEmptyCard(param),
});

export const createPackSelectorFamily = selectorFamily({
    key: "createPackSelectorFamily",
    get:
        (cardId) =>
        ({ get, getCallback }) =>
            get(createPackAtomFamily(cardId)),
    set:
        (cardId) =>
        ({ set, get }, { action, data }) => {
            const cardAtom = createPackAtomFamily(cardId);
            const card = get(cardAtom);
            let cardIds;
            // increment update request
            switch (action) {
                //
                // Item Changes
                //
                case "set":
                    set(cardAtom, data);
                    break;
                case "updateItemImage": {
                    let newCard = copy(card);
                    newCard[data.key].image = data.image;
                    set(cardAtom, newCard);
                    break;
                }
                case "updateItemEditorContent": {
                    let newCard = copy(card);
                    newCard[data.key].content = data.contentState;
                    set(cardAtom, newCard);
                    break;
                }
                case "swapCardTermDefinition":
                    set(cardAtom, {
                        ...card,
                        term: card.definition,
                        definition: card.term,
                    });
                    break;
                //
                // Array changes
                //
                case "setCardIds":
                    set(createPackCardIdsState, data);
                    break;

                case "add": {
                    // add at index , or with default info
                    // so like duplicating or watever
                    cardIds = get(createPackCardIdsState).slice();
                    let index = cardIds.length;
                    if (data?.index !== undefined) index = data.index;
                    cardIds.splice(index, 0, nanoid());
                    set(createPackCardIdsState, cardIds);
                    break;
                }
                case "remove":
                    cardIds = get(createPackCardIdsState).slice();
                    let index = cardIds.findIndex((item) => item === cardId);
                    cardIds.splice(index, 1);
                    set(createPackCardIdsState, cardIds);
                    break;
                case "reorder":
                    if (data.active && data.over && data.active !== data.over) {
                        cardIds = get(createPackCardIdsState).slice();
                        const oldIndex = cardIds.findIndex(
                            (item) => item === data.active
                        );
                        const newIndex = cardIds.findIndex(
                            (item) => item === data.over
                        );
                        set(
                            createPackCardIdsState,
                            arrayMove(cardIds, oldIndex, newIndex)
                        );
                    }
                    break;
                default:
                    console.log("createPackSelectorFamily DEFAULT: ", action);
            }
        },
});

export const createPackCardsControlSelector = selector({
    key: "createPackCardsControlSelector",
    get: ({ get }) => get(createPackCardIdsState),
    set: ({ get, set }, action) => {
        const cardIds = get(createPackCardIdsState);
        switch (action) {
            case "swapAllCardTermDefinition": {
                cardIds.map((cardId) =>
                    set(createPackSelectorFamily(cardId), {
                        action: "swapCardTermDefinition",
                    })
                );
                break;
            }
            case "shuffle": {
                set(createPackCardIdsState, shuffleArray(cardIds));
                break;
            }
            // case "orderAlphabetically": {
            // }
        }
    },
});
