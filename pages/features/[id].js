// pages/cards/[id].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import data from "../../src/components/data/features.json";
import DeviceLog from "../../src/components/features/DeviceLog";
import Hosts from "../../src/components/features/Hosts";
import RunAll from "../../src/components/features/RunAll";

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
          <h1>{card && card.title}</h1>
          {card.name}
          {card.name === "RunAll" && <RunAll data={card} />}
          {card.name === "Hosts" && <Hosts data={card} />}
          {card.name === "DeviceLog" && <DeviceLog data={card} />}
          {/* Render the appropriate card component based on card name */}
          {/* {card.name === 'Runall' && <RunAll data={card} />}
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
