import { useMutation } from "react-query";
import { useMongo } from "../MongoUtils";

export default function useDeletePackMutation({ cardPackId }) {
    const { db, user } = useMongo();
    return useMutation(async () => {
        // delete from
        // cardpacks collection
        let cardpacks = db.collection("cardpacks");
        // cardpackDrafts collection
        let cardpackDrafts = db.collection("cardpackDrafts");
        // user cardpacks array
        let users = db.collection("users");
        // then redirect to browse page

        return Promise.allSettled([
            cardpacks.deleteOne({
                _id: cardPackId,
            }),
            cardpackDrafts.deleteOne({
                _id: cardPackId,
            }),
            users.updateOne(
                {
                    _id: user.id,
                },
                {
                    $pull: { cardpacks: cardPackId },
                }
            ),
        ]);
    });
}
