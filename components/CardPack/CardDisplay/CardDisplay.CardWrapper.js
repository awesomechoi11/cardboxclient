import { motion } from "framer-motion";
import { useCardDisplayCardState } from "./_CardDisplayUtils";

export default function CardWrapper({ index, play, children }) {
  const { cardSide, cardData, flipCard } = useCardDisplayCardState(index);
  let frontData = cardData?.term;
  let backData = cardData?.definition;
  const [active, setActive] = useState(false);
  const flip = cardSide;

  return children;
}
