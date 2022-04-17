import { useMutation } from "react-query";
import { useMongo } from "../MongoUtils";

export function useCardpackFunctions_incrementStats() {
    const { user } = useMongo();
    return useMutation(({ action, cardPackId }) =>
        user.functions.callFunction("cardpackFunctions_incrementStats", {
            action,
            cardPackId,
        })
    );
}
