import clsx from "clsx";
import { useContext, useState } from "react";
import useSound from "use-sound";
import CardVertical from "../general/CardVertical";
import { CardDisplayContext } from "./_CardDisplayUtils";
import { motion } from "framer-motion";
import { ActiveOnViewportEnter } from "@components/general/ActiveOnViewportEnter";
import CardDisplayCardWrapper from "./CardDisplay.CardWrapper";

export default function CardGridView() {
    const data = useContext(CardDisplayContext);
    const { _id: id, cards } = data;
    const [play] = useSound("/cardflip.m4a");

    return (
        <div className={clsx("card-grid flex justify-center")}>
            <div className="flex flex-wrap justify-start gap-3">
                {cards.map((data, index) => (
                    <ActiveOnViewportEnter key={index}>
                        <CardDisplayCardWrapper index={index}>
                            <CardVertical index={index} play={play} />
                        </CardDisplayCardWrapper>
                    </ActiveOnViewportEnter>
                ))}
            </div>
        </div>
    );
}
