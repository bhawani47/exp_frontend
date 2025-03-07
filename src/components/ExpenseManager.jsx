import AddData from "./CashManager/AddData";
import Buttons from "./CashManager/Buttons";
import Navigation from "./Navigation/Navigation";
import Statistics from "./Statistics/Statistics";
import TransactionsTable from "./TransactionsTable/TransactionsTable";
import { useState } from "react";

const ExpenseManager = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modelType, setModelType] = useState("");
  const handleModel = (type) => {
    setIsOpen(true);
    setModelType(type);
  };
  const onClose = () => {
    console.log("close");
    setIsOpen(false);
    setModelType("");
  };
  return (
    <>
      <Statistics />
      <TransactionsTable />
      <Buttons handleModel={handleModel} />
      {isOpen && (
        <AddData onClose={onClose} isOpen={isOpen} modelType={modelType} />
      )}
    </>
  );
};

export default ExpenseManager;
