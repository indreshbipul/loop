import productServices from "../services/productServices";
import { useState } from "react";

function addProduct() {
    const [product, setProduct] = useState({
        productName: "",
        description: "",
        category: "",
        price: 0,
        quantity: 0,
        image: ""
    });
    const handleAddProduct = () => {
        productServices.addProduct(product)
            .then((response) => {
                alert("Product added successfully!");
                console.log("Product added successfully:", response);
                // Optionally, reset the form or redirect
                // setProduct({`
                //     productName: "",
                //     description: "",
                //     category: "",
                //     price: 0,
                //     quantity: 0,
                //     image: ""
                // });
            })
            .catch((error) => {
                console.error("Error adding product:", error);
            });
        }
  return (
    <div>
      <div className="bg-gray-50 font-sans min-h-screen p-8">
        <main className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-semibold mb-6 text-gray-900">
            Add New Product
          </h1>
          <form 
            onSubmit={(e) =>{
                    e.preventDefault();
                    handleAddProduct()
                }}
          
            id="addProductForm" className="space-y-6" >
            <div>
              <label
                className="block text-gray-700 font-medium mb-2">
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                required
                placeholder="Enter product name"
                onChange ={(e) => setProduct({...product, productName: e.target.value})}
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>

            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                placeholder="Enter product description"
                required
                onChange={(e) => setProduct({...product, description: e.target.value})}
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none"
              ></textarea>
            </div>

            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                required
                onChange={(e) => setProduct({...product, category: e.target.value})}
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              >
                <option value="" disabled selected>
                  Select a category
                </option>
                <option value="electronics">T-Shirt</option>
                <option value="clothing">Jeans</option>
                <option value="home">Cargo</option>
                <option value="books">Hoodies</option>
                {/* <!-- Add more categories as needed --> */}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                >
                  Price (₹)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  min="0"
                  step="0.01"
                  required
                  placeholder="0.00"
                    onChange={(e) => setProduct({...product, price: e.target.value})}
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="0"
                  required
                  placeholder="0"
                  onChange={(e) => setProduct({...product, quantity: e.target.value})}
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>
            </div>

            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
              >
                Product Image
              </label>
              <input
                type="text"
                id="image"
                name="image"
                accept="image/*"
                required
                className="w-full text-gray-700 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="Enter image URL "
                onChange={(e) => setProduct({...product, image: e.target.value})}
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition"
              >
                Add Product
              </button>
            </div>
          </form>

          {/* <!-- Placeholder: JS logic for form validation, submit handling, image preview --> */}
        </main>
      </div>
    </div>
  );
}

export default addProduct;
