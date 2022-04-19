import { useMutation } from "react-query";
import { useMongo } from "../MongoUtils";

export default function useDeleteFileMutation(fileDoc) {
    const { db, user } = useMongo();
    return useMutation(async () => {
        // pull file from
        // files
        let files = db.collection("files");

        return Promise.allSettled([
            files.updateOne(
                {
                    userId: user.id,
                },
                {
                    $pull: { files: fileDoc },
                }
            ),
        ]);
    });
}
