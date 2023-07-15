import fastEqual from "fast-deep-equal";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useDebounce } from "rooks";
import { CardPackDataContext } from "../../pages/editor/[cardPackId]";
import { useMongo } from "../Mongo/MongoUtils";
import {
    createPackAllDataSelector,
    createPackManualSaveTrigger,
    createPackSaveSelector,
} from "./_CreatePackUtils";

export default function CreatePackCardsAutosave() {
    //listen to data changes
    const setSaveState = useSetRecoilState(createPackSaveSelector);
    const [allData, setAllData] = useRecoilState(createPackAllDataSelector);
    const { data: dbdata } = useContext(CardPackDataContext);
    const mutation = useMutation(
        ([localdb, updateDoc, options]) => {
            localdb.collection("cardpackDrafts").updateOne(
                {
                    _id: dbdata._id,
                },
                updateDoc,
                options
            );
        },
        {
            onSuccess: () => {
                setSaveState({ saving: false, lastUpdated: new Date() });
            },
            onMutate: () => {
                setSaveState({ saving: true });
            },
            onError: () => {
                setSaveState({ saving: false });
            },
        }
    );

    const mutateCb = useCallback(mutation.mutate, []);
    const mutateDebounced = useDebounce(mutateCb, 500);
    const { db } = useMongo();

    const prevData = useRef(allData);
    const [recoiledPopulated, setRecoiledPopulated] = useState(false);
    useEffect(() => {
        if (recoiledPopulated) return;

        // need client and server card data
        if (!allData || !dbdata?.cards) return;

        if (
            fastEqual(
                dbdata.cards.map((card) => card.id),
                allData.map((card) => card.id)
            )
        ) {
            prevData.current = allData;
            setRecoiledPopulated(true);
        }
    }, [allData, dbdata, recoiledPopulated]);

    useEffect(() => {
        setAllData(dbdata.cards);
    }, [dbdata]);

    useEffect(() => {
        if (!recoiledPopulated) return;

        if (db && !fastEqual(allData, prevData.current)) {
            prevData.current = allData;
            mutateDebounced([
                db,
                {
                    $set: { cards: allData },
                    $currentDate: { lastModified: true },
                },
            ]);
        }
    }, [allData, dbdata, db, mutateDebounced, recoiledPopulated]);

    const triggerCount = useRecoilValue(createPackManualSaveTrigger);
    useEffect(() => {
        if (!recoiledPopulated) return;

        if (triggerCount && db) {
            // prevData.current = allData;
            mutateDebounced([
                db,
                {
                    $set: { cards: allData },
                    $currentDate: { lastModified: true },
                },
            ]);
        }
    }, [triggerCount]);

    return null;
}
