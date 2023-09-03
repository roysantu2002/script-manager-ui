// pages/cards/[id].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import data from "../../src/components/data/features.json";

const CardDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  // State to hold card data
  const [card, setCard] = useState(null);
  useEffect(() => {
    // Fetch the card data based on the id
    const selectedCard = data.find((item) => item.id === parseInt(id));
    setCard(selectedCard);
  }, [id]);

  return (
    <div style={{ marginTop: "100px" }}>
      {card ? (
        <>
          <h1>Card Details</h1>
          {card.title}
          {/* Render the appropriate card component based on card name */}
          {/* {card.name === 'CardType1' && <CardComponent1 data={card} />}
          {card.name === 'CardType2' && <CardComponent2 data={card} />} */}
          {/* Add cases for other card types */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CardDetailPage;
