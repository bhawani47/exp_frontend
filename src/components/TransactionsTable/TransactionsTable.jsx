import { useContext, useState } from "react";
import { DataContext } from "../../contexts/DataContext";
import EditData from "../CashManager/EditData";
import EditButton from "../CashManager/EditButton";

const TransactionsTable = () => {
  const { data, deleteItem, editItem } = useContext(DataContext);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // Create a sorted copy of data without mutating the original array
  const transactionsData = [...data].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
      const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      return `${formattedDate} ${formattedTime}`;
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Invalid date";
    }
  };

  // Trigger the floating confirmation modal
  const handleDeleteClick = (id) => {
    setConfirmDeleteId(id);
  };

  // When confirmed, delete the item and close the modal
  const confirmDeletion = async () => {
    if (confirmDeleteId) {
      await deleteItem(confirmDeleteId);
      setConfirmDeleteId(null);
    }
  };

  // Cancel deletion and close the modal
  const cancelDeletion = () => {
    setConfirmDeleteId(null);
  };

  return (
    <section className="p-4 sm:p-8 relative">
      <div className="overflow-x-auto max-h-[70vh] overflow-y-auto">
        <table className="table table-compact sm:table-normal w-full">
          <thead className="sticky top-0 bg-base-100">
            <tr>
              <th className="text-xs sm:text-sm">Date</th>
              <th className="text-xs sm:text-sm">Income</th>
              <th className="text-xs sm:text-sm">Expense</th>
              <th className="text-xs sm:text-sm w-20">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactionsData.length > 0 ? (
              transactionsData.map((transaction) => (
                <tr key={transaction._id}>
                  <td className="text-xs sm:text-sm">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="text-xs sm:text-sm text-success">
                    {transaction.type === "income"
                      ? `₹${Number(transaction.amount).toFixed(2)}`
                      : "-"}
                  </td>
                  <td className="text-xs sm:text-sm text-error">
                    {transaction.type === "expense"
                      ? `₹${Number(transaction.amount).toFixed(2)}`
                      : "-"}
                  </td>
                  {/* Pass the delete function as a prop */}
                  <EditButton
                    transaction={transaction}
                    onDelete={handleDeleteClick}
                  />
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Floating confirmation modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg z-50 w-80">
            <h3 className="text-lg font-semibold mb-4 text-center text-white">
              Confirm Deletion
            </h3>
            <p className="text-sm mb-6 text-center text-white">
              Are you sure you want to delete this transaction?
            </p>
            <div className="flex justify-around">
              <button
                onClick={confirmDeletion}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Yes
              </button>
              <button
                onClick={cancelDeletion}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TransactionsTable;
