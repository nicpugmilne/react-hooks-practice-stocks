import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState("Alphabetically");
  const [filterBy, setFilterBy] = useState("Tech");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((r) => r.json())
      .then((data) => setStocks(data));
  }, []);

  function handleStockClick(stockClicked) {
    const stockInPortfolio = portfolio.find(
      (stock) => stock.id === stockClicked.id
    );
    if (!stockInPortfolio) {
      addToPortfolio(stockClicked);
    } else {
      removeFromPortfolio(stockClicked);
    }
  }

  function addToPortfolio(stockToAdd) {
    setPortfolio([stockToAdd, ...portfolio]);
  }

  function removeFromPortfolio(stockToRemove) {
    console.log(stockToRemove);
    const updatedPortfolio = portfolio.filter(
      (stock) => stock.id !== stockToRemove.id
    );
    setPortfolio(updatedPortfolio);
  }

  const sortedStocks = [...stocks].sort((stock1, stock2) => {
    if (sortBy === "Alphabetically") {
      return stock1.name.localeCompare(stock2.name);
    } else {
      return stock1.price - stock2.price;
    }
  });

  const filteredStocks = sortedStocks.filter(
    (stock) => stock.type === filterBy
  );

  return (
    <div>
      <SearchBar
        sortBy={sortBy}
        onChangeSort={setSortBy}
        filterBy={filterBy}
        onChangeFilter={setFilterBy}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredStocks} onClick={handleStockClick} />
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={portfolio} onClick={handleStockClick} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
