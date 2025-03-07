import { useState } from "react";
import EditData from "./EditData";

const EditButton = ({ transaction, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(null);

  const handleModel = (id) => {
    setIsOpen(true);
    setId(id);
  };

  const onClose = () => {
    setIsOpen(false);
    setId(null);
  };

  return (
    <>
      <td className="flex gap-1 sm:gap-2">
        <button
          onClick={() => handleModel(transaction._id)}
          className="btn btn-ghost btn-xs sm:btn-sm"
          aria-label="Edit transaction"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
        <button
          onClick={() => onDelete(transaction._id)}
          className="btn btn-ghost btn-xs sm:btn-sm text-error"
          aria-label="Delete transaction"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m4-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
        {isOpen && <EditData id={id} onClose={onClose} isOpen={isOpen} />}
      </td>
    </>
  );
};

export default EditButton;
