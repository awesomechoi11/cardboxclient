import clsx from "clsx";
import { useContext } from "react";
import useSound from "use-sound";
import CardVertical from "../general/CardVertical";
import { CardDisplayContext } from "./_CardDisplayUtils";

export default function CardGrid() {
  const data = useContext(CardDisplayContext);
  const { _id: id, cards } = data;
  const [play] = useSound("/cardflip.m4a");

  return (
    <div className={clsx("card-grid flex justify-center")}>
      <div className="flex gap-3 justify-start flex-wrap">
        {cards.map((card, index) => (
          <CardVertical key={index} data={card} play={play} />
        ))}
      </div>
    </div>
  );
}
