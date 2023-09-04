import React from "react";
import data from "../components/data/features.json";
import Card from "../components/ui/Card";

const HomePage = () => {
  return (
    <div>
      <h1>Cards</h1>
      <div className='row'>
        {data.map((card) => (
          <div key={card.id} className='col-md-6'>
            <Card
              id={card.id}
              title={card.title}
              // description={card.description}
              icon={card.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
