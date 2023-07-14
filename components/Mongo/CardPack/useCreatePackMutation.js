import { useMutation } from "react-query";
import { useMongo } from "../MongoUtils";
import { toast } from "react-toastify";
import { cardpackDraftsDefault } from "../documents/cardpacks";
import { alphaNumId } from "../../utils";
import { useRouter } from "next/router";
export default function useCreatePackMutation({ duplicateCardpackId }) {
    const { db, user, isAnon } = useMongo();
    const router = useRouter();
    return useMutation(async () => {
        if (isAnon) {
            toast.error(
                "You are not allowed to make cards! Please create an account."
            );
            throw Error(
                "You are not allowed to make cards! Please create an account."
            );
        }

        // check if user can create a pack
        const maxCards = 100;
        if (user.customData.cardPacks.length > maxCards) {
            toast.error(`Max Number of Drafts Reached : ${maxCards}`);
            throw Error(
                `"User Max Number of CardPackDrafts Reached : ${maxCards}`
            );
        }
        const cardpackId = alphaNumId();
        let result;
        if (duplicateCardpackId) {
            try {
                result = await db.collection("cardpacks").findOne({
                    _id: duplicateCardpackId,
                });
            } catch (e) {
                // throw and toast, user is not allowed to get cardpack
            }

            // no data
            if (!result) {
                toast.error("Could not find card pack!");
                throw Error(`Could not find card pack! ${duplicateCardpackId}`);
            }

            // create pack : add to cardpacks collection
            result._id = cardpackId;
            result.author = user.id;
            await db.collection("cardpackDrafts").insertOne(result);
        } else {
            // create pack : add to cardpacks collection
            await db.collection("cardpackDrafts").insertOne(
                cardpackDraftsDefault({
                    cardpackId,
                    userId: user.id,
                })
            );
        }

        // create pack : add cardpack id to user
        await db.collection("users").updateOne(
            { _id: user.id },
            {
                $push: {
                    cardPacks: cardpackId,
                },
            }
        );

        // if all succeeds redirect to that cardpack
        router.push(`/editor/${cardpackId}`);
    });
}
