import { Button } from "react-bootstrap";
import { useContext } from "react";
import { CardPackDataContext } from "../../pages/card-pack-editor/[cardPackId]";
import usePublishPackMutation from "../Mongo/CardPack/usePublishPackMutation";

export default function CreatePackPublish() {
    const dbdata = useContext(CardPackDataContext);

    const mutation = usePublishPackMutation({
        cardPackId: dbdata._id,
    });

    return <Button onClick={mutation.mutate}>Publish</Button>;
}
