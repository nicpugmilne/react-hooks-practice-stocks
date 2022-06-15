import React from "react";
import Stock from "./Stock";

function StockContainer({ stocks, onClick }) {
  const stockItems = stocks.map((stock) => {
    return <Stock key={stock.id} stock={stock} onClick={onClick} />;
  });
  return (
    <div>
      <h2>Stocks</h2>
      {stockItems}
    </div>
  );
}

export default StockContainer;
