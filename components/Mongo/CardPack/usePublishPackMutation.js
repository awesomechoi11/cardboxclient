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

        const entries = CardpackSharedFields.map((field) => [
            field,
            currentDraft[field],
        ]);
        const updateDoc = Object.fromEntries(entries);

        try {
            await cardpackSchema.validate(updateDoc);
        } catch (err) {
            toast.error(err.message);
            throw err;
        }

        await db.collection("cardpackDrafts").updateOne(
            {
                _id: currentDraft._id,
                author: user.id,
            },
            {
                $set: {
                    lastPublished: new Date(),
                    published: true,
                },
            }
        );

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
                throw err;
            });
    });
}
