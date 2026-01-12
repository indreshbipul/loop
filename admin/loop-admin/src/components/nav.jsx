import {Link, NavLink} from "react-router-dom";

function nav() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="px-6 py-6 border-b border-gray-200">
        <Link to="/">
            <h1 className="text-2xl font-bold text-gray-900">Loop Admin</h1>
        </Link>
      </div>
      <ul className="flex-1 px-6 py-4 space-y-4">
        <li>
          <Link
            to="/"
            className="block text-gray-700 font-semibold hover:text-indigo-600 transition">
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/create_product"            
            className="w-full text-left text-gray-700 font-semibold hover:text-indigo-600 transition">
            Create New Product
          </Link>
        </li>
        <li>
          <Link
            to="#productListSection"
            className="block text-gray-700 font-semibold hover:text-indigo-600 transition"
          >
            Edit Products
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default nav;
