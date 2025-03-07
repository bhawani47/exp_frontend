import React, { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
export const StatCard = ({ title, amount = 0, textColor }) => (
  <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="card-body p-2 sm:p-4 text-center">
      <h3 className="font-semibold text-gray-700 text-xs sm:text-base">
        {title}
      </h3>
      <div
        className={`mt-1 sm:mt-2 text-lg sm:text-2xl ${textColor} font-medium`}
      >
        ₹{(amount || 0).toFixed(2)}
      </div>
    </div>
  </div>
);

const Statistics = () => {
  const contextValue = useContext(DataContext);
  const totalValues = contextValue?.totalValues || {
    balance: 0,
    income: 0,
    expense: 0,
  };
  return (
    <section className="p-2 sm:p-8 divide-x divide-gray-200">
      <div className="grid grid-cols-3 gap-2 sm:gap-8">
        <StatCard
          title="Balance"
          amount={totalValues.balance}
          textColor="text-primary"
        />
        <StatCard
          title="Income"
          amount={totalValues.income}
          textColor="text-success"
        />
        <StatCard
          title="Expenses"
          amount={totalValues.expense}
          textColor="text-error"
        />
      </div>
    </section>
  );
};

export default Statistics;
