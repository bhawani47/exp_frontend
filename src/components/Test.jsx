const ExpenseManager = () => {
    return (
      <>
        <div className="w-full mx-auto shadow-2xl overflow-hidden border-2 border-gray-200 h-full sm:w-2/3 md:w-1/2 bg-base-100">
          <nav className="w-full h-16 p-1 px-10 flex justify-between items-center bg-primary text-primary-content">
            <h1 className="sm:text-2xl text-xl font-bold tracking-wide">
              Expense Manager
            </h1>
            <div className="sm:w-1/3 w-3/5 flex gap-4 justify-end items-center">
              {/* Theme Switcher */}
              <label className="swap swap-rotate">
                <input
                  type="checkbox"
                  className="theme-controller"
                  value="dark"
                />
                <svg
                  className="swap-on fill-current w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>
                <svg
                  className="swap-off fill-current w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </label>
  
              <div className="hidden sm:flex gap-4">
                <button className="btn btn-primary">Login</button>
                <button className="btn btn-secondary">Sign Up</button>
              </div>
  
              {/* Mobile menu */}
              <div className="sm:hidden">
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a className="text-base-content">Login</a>
                    </li>
                    <li>
                      <a className="text-base-content">Sign Up</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
          <section className="p-8 divide-x divide-gray-200">
            <div className="grid grid-cols-3 gap-8">
              <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="card-body text-center">
                  <h3 className="font-semibold text-gray-700">Balance</h3>
                  <div className="mt-2 text-2xl text-primary font-medium">
                    $0.00
                  </div>
                </div>
              </div>
              <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="card-body text-center">
                  <h3 className="font-semibold text-gray-700">Income</h3>
                  <div className="mt-2 text-2xl text-success font-medium">
                    $0.00
                  </div>
                </div>
              </div>
              <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="card-body text-center">
                  <h3 className="font-semibold text-gray-700">Expenses</h3>
                  <div className="mt-2 text-2xl text-error font-medium">
                    $0.00
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  };
  export default ExpenseManager;
  