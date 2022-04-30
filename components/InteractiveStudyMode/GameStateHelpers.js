import { atom, selector } from "recoil";

export const gameSettingsState = atom({
    key: "gameSettingsState",
    default: {
        stage: "menu-screen",
    },
});
/**
{
    stage: "menu-screen" || "match-game-screen",
    ...
}
*/

export const gameSettingsSelector = selector({
    key: "gameSettingsSelector",
    get: ({ get }) => {
        return get(gameSettingsState);
    },
    set: ({ set, get }, { action, data }) => {
        const currentState = get(gameSettingsState);
        switch (action) {
            case "set": {
                set(gameSettingsState, { ...currentState, ...data });
                break;
            }
            // case "setSettings": {
            //     return {
            //         ...currentState,
            //         settings: { ...currentState.settings, ...data },
            //     };
            // }
        }
    },
});
