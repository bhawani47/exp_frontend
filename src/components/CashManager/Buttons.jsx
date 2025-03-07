import { useState } from "react";

const Buttons = ({ handleModel }) => {
  return (
    <section className="fixed bottom-0 w-full sm:w-2/3 md:w-1/2 flex justify-center gap-4 p-4 bg-base-100 border-t border-gray-200">
      <button className="btn bg-green-500 flex-1 max-w-xs" onClick={()=>handleModel('income')}>Cash In</button>
      <button className="btn bg-red-500 flex-1 max-w-xs" onClick={()=>handleModel('expense')}>Cash Out</button>
    </section>
  );
};
export default Buttons;
