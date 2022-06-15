import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ stocks, onClick }) {
  const stocksItems = stocks.map((stock) => {
    return <Stock key={stock.id} stock={stock} onClick={onClick} />;
  });
  return (
    <div>
      <h2>My Portfolio</h2>
      {stocksItems}
    </div>
  );
}

export default PortfolioContainer;
