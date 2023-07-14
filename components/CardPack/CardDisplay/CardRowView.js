import { ActiveOnViewportEnter } from "@components/general/ActiveOnViewportEnter";
import CardHorizontal from "../general/CardHorizontal";
import CardDisplayCardWrapper from "./CardDisplay.CardWrapper";
import { useContext } from "react";
import { CardDisplayContext } from "./_CardDisplayUtils";
import clsx from "clsx";

export default function CardRowView() {
    const data = useContext(CardDisplayContext);
    const { _id: id, cards } = data;
    console.log(data);
    return (
        <div className={clsx("card-grid flex justify-center")}>
            <div className="flex flex-col gap-3">
                {cards.map((data, index) => (
                    <ActiveOnViewportEnter key={index} index={index}>
                        <CardDisplayCardWrapper index={index}>
                            <CardHorizontal index={index} />
                        </CardDisplayCardWrapper>
                    </ActiveOnViewportEnter>
                ))}
            </div>
        </div>
    );
}
