import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./utils/AuthContext";

function Products() {

    const { isAuthenticated, jwtToken } = useAuth();

    const[products, setProducts] = useState(null);
    const[categories, setCategories] = useState(null);


    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    }

    useEffect(() => {
      
      if (isAuthenticated) {
        axios.get("http://localhost:8080/products",config)
        .then(function (response){
            setProducts(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });

        axios.get("http://localhost:8080/categories",config)
        .then(function (response){
            setCategories(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
      }
    },[isAuthenticated])


    const[name, setName] = useState("");
    const[price, setPrice] = useState("");
    const[qty, setQty] = useState("");
    const[categoryId,setCategoryId] = useState(null);
  
   
  
    function getProducts() {
      axios
        .get("http://localhost:8080/products",config)
        .then(function (response) {
          setProducts(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  
    
    
  
    function handleName(event) {
      setName(event.target.value);
    }
  
    function handlePrice(event) {
      setPrice(parseFloat(event.target.value));
    }
  
    function handleQuantity(event) {
      setQty(parseInt(event.target.value));
    }

    function handleCategory(event){
        setCategoryId(event.target.value);
    }
  
    function createProduct(event) {
      event.preventDefault();
  
      const data = {
        name: name,
        price: price,
        qty: qty,
        categoryId :categoryId
      };
  
      axios
        .post("http://localhost:8080/products", data,config)
        .then(function (response) {
          getProducts();
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    const[edit,setEdit] = useState(false);
    const[productId,setProductId] = useState(null);

    function updateProduct(event) {
      event.preventDefault();

      const data = {
        name: name,
        price: price,
        qty: qty,
        categoryId : categoryId
      }
      axios
      .put("http://localhost:8080/products/"+productId, data,config)
      .then(function (response) {
        getProducts();
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

   
    
    return(
        <div>
             <button type="button" onClick={getProducts}>
        Get Products
      </button>

      <br/><br/>
      {products &&
      products.map((row) => (
        <div key={row.id}>
          {row.name} - {row.price} - {row.qty} - {row.category?.name}
          <button type="button" className="btn btn-primary" onClick={() => {
            setEdit(true);
            setProductId(row.id)
            setName(row.name);
            setPrice(row.price);
            setQty(row.qty);
            setCategoryId(row.category?.id);
            }}>Edit</button>
          <br/><br/>
        </div>
      ))}

   
        {!edit &&
          <div>
          <h2>Create Product</h2>

          <form onSubmit={createProduct}>
            <div>
              <label>Name</label>
              <input type="text" onChange={handleName} required />
            </div>

            <br />

            <div>
              <label>Price</label>
              <input type="text" onChange={handlePrice} required />
            </div>

            <br />

            <div>
              <label>Quantity</label>
              <input type="text" onChange={handleQuantity} required />
            </div>

            <br />
            <br />

            <div>
                <label>Category</label>
                <select onChange={handleCategory} required>
                    <option value="">Select a category</option>

                    {categories && categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <br/><br/>
            <button type="submit">Create Product</button>
          </form>
        </div>}

        {edit &&
          <div>
            <h2>Update Product</h2>
            <form onSubmit={updateProduct}>
            <div>
              <label>Name</label>
              <input type="text" onChange={handleName} value={name}required />
            </div>

            <br />

            <div>
              <label>Price</label>
              <input type="text" onChange={handlePrice} value={price}required />
            </div>

            <br />

            <div>
              <label>Quantity</label>
              <input type="text" onChange={handleQuantity} value={qty}required />
            </div>

            <br />
            <br />

            <div>
                <label>Category</label>
                <select onChange={handleCategory} required>
                    <option value="">Select a category</option>

                    {categories && categories.map((category) => (
                        <option key={category.id} value={category.id} selected={categoryId=== category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <br/><br/>
            <button type="submit">Update Product</button>
          </form>
          </div>}
        </div>
    )
}

export default Products;