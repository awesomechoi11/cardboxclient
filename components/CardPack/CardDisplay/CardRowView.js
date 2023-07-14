import CardHorizontal from "../general/CardHorizontal";

export default function CardRowView() {
  const data = useContext(CardDisplayContext);
  const { _id: id, cards } = data;

  return (
    <div className={clsx("card-grid flex justify-center")}>
      <div className="flex gap-3 justify-start flex-wrap">
        {cards.map((card, index) => (
          <CardHorizontal key={index} index={index} data={card} />
        ))}
      </div>
    </div>
  );
}
