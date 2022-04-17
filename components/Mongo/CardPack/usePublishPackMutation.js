import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useMongo } from "../MongoUtils";
import {
    CardpackSharedFields,
    CardpacksOnlyFields,
} from "../documents/cardpacks";
import { cardpackSchema } from "../../../schemas/cardpacks/publishedCardpack";

export default function usePublishPackMutation({ cardPackId }) {
    const { db, user } = useMongo();

    return useMutation(async () => {
        // get "cardpackDrafts" item
        // validate then update corresponding "cardpacks" item

        let currentDraft = await db.collection("cardpackDrafts").findOne({
            _id: cardPackId,
            author: user.id,
        });

        // this shudnt be possible
        if (!currentDraft) throw Error(`Cannot find Card Pack`);
        console.log("current draft", currentDraft);

        const entries = CardpackSharedFields.map((field) => [
            field,
            currentDraft[field],
        ]);
        const updateDoc = Object.fromEntries(entries);

        // const atLeastTwoCards =
        //     currentDraft?.cards && currentDraft?.cards.length > 1;
        // const cardsHaveTermAndDefinition = currentDraft?.cards?.every(
        //     (card) =>
        //         card?.term?.content &&
        //         convertFromRaw(card?.term?.content).hasText() &&
        //         card?.definition?.content &&
        //         convertFromRaw(card?.definition?.content).hasText()
        // );
        // const hasTitle = currentDraft?.title?.length > 3;
        // const hasTags = currentDraft?.tags?.length > 0;
        // const hasVisibility = !!currentDraft?.visibility;

        try {
            await cardpackSchema.validate(updateDoc);
        } catch (err) {
            return toast.error(err.message);
        }
        return db
            .collection("cardpacks")
            .updateOne(
                {
                    _id: currentDraft._id,
                    author: user.id,
                },
                { $setOnInsert: CardpacksOnlyFields, $set: updateDoc },
                { upsert: true }
            )
            .then(() => {
                toast.success(
                    "Hooray!! Your Card Pack has been successfully published!"
                );
            })
            .catch((err) => {
                toast.error(
                    "Oops! Something went wrong. Your Card Pack has not updated or published."
                );
            });
    });
}
