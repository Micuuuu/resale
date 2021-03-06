import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector";
import { useState } from "react";
import { selectCurrentUser } from "../../store/user/user.selector";
import ProductCard from "../../components/product-card/product-card.component";
import "./categories-preview.styles.scss";

const CategoriesPreview = () => {
  const [selectedValue, setSelectedValue] = useState("All");
  const [searchedValue, setSarchedValue] = useState("");
  const categoriesMap = useSelector(selectCategoriesMap);
  const currentUser = useSelector(selectCurrentUser);
  const [sort, setSort] = useState("1")
  const [gender, setGender] = useState("")

  const handleChange = (event) => {
    const { value } = event.target;

    setSort(value.toLowerCase());
  };
  const handleGenderChange = (event) => {
    const { value } = event.target;

    setGender(value.toLowerCase());
  };

  const renderSelectedValue = () => {
    switch (selectedValue) {
      case "All":
        return (
          <div className="shop-value-all">
            {[...categoriesMap["accessories"], ...categoriesMap["clothes"], ...categoriesMap["sneakers"]]
              .sort((a,b) => {
                if(sort === "1")
                 return  (a.createdAt.seconds <  b.createdAt.seconds) ? 1 : -1
                else if(sort === "3") return  (b.price - a.price ) 
                else if(sort === "2") return  (a.price -  b.price) 
              } )
              .filter((product) =>{
               
                if(gender === "men") {
                  return product.name.toLowerCase().includes(searchedValue.toLowerCase()) && product.gender.toLowerCase() === "men";

                }
                else if( gender === "women")
                {
                  return product.name.toLowerCase().includes(searchedValue.toLowerCase()) && product.gender.toLowerCase() === "women";

                }
                else return product.name.toLowerCase().includes(searchedValue.toLowerCase())
              })
              .map((product) => (
                <ProductCard key={product.id} products={product} title={product.category} currentUser={currentUser} />
              ))}
          </div>
        );

      case "Accessories":
        return (
          <div className="shop-value-all">
            {categoriesMap["accessories"]
              .sort((a,b) => {
                if(sort === "1")
                return  (a.createdAt.seconds <  b.createdAt.seconds) ? 1 : -1
                else if(sort === "2") return  (a.price >  b.price) ? 1 : -1
                else if(sort === "3") return  (a.price <  b.price) ? 1 : -1
              } )
              .filter((product) => product.name.toLowerCase().includes(searchedValue.toLowerCase()))
              .map((product) => (
                <ProductCard key={product.id} products={product} title={product.category} currentUser={currentUser} />
              ))}
          </div>
        );
      case "Clothes":
        return (
          <div className="shop-value-all">
            {categoriesMap["clothes"]
            .sort((a,b) => {
              if(sort === "1")
               return  (a.createdAt.seconds <  b.createdAt.seconds) ? 1 : -1
              else if(sort === "2") return  (a.price >  b.price) ? 1 : -1
              else if(sort === "3") return  (a.price <  b.price) ? 1 : -1
            } )
              .filter((product) => product.name.toLowerCase().includes(searchedValue.toLowerCase()))
              .map((product) => (
                <ProductCard key={product.id} products={product} title={product.category} currentUser={currentUser} />
              ))}
          </div>
        );
      case "Sneakers":
        return (
          <div className="shop-value-all">
            {categoriesMap["sneakers"]
            .sort((a,b) => {
              if(sort === "1")
               return  (a.createdAt.seconds <  b.createdAt.seconds) ? 1 : -1
              else if(sort === "2") return  (a.price >  b.price) ? 1 : -1
              else if(sort === "3") return  (a.price <  b.price) ? 1 : -1
            } )
              .filter((product) => product.name.toLowerCase().includes(searchedValue.toLowerCase()))
              .map((product) => (
                <ProductCard key={product.id} products={product} title={product.category} currentUser={currentUser} />
              ))}
          </div>
        );
      default:
        return (
          <div className="shop-value-all">
            {[...categoriesMap["accessories"], ...categoriesMap["clothes"], ...categoriesMap["sneakers"]]
            .sort((a,b) => {
              if(sort === "1")
               return  (a.createdAt.seconds <  b.createdAt.seconds) ? 1 : -1
              else if(sort === "2") return  (a.price >  b.price) ? 1 : -1
              else if(sort === "3") return  (a.price <  b.price) ? 1 : -1
            } )
              .filter((product) => product.name.toLowerCase().includes(searchedValue.toLowerCase()))
              .map((product) => (
                <ProductCard key={product.id} products={product} title={product.category} currentUser={currentUser} />
              ))}
          </div>
        );
    }
  };

  return (
    <div className="shop-container">
      <div className="shop-search-container">
        <h1>Match your style</h1>
        <div className="search-input">
          <svg version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 487.95 487.95">
            <g>
              <g>
                <path
                  fill="#b6b6b6"
                  d="M481.8,453l-140-140.1c27.6-33.1,44.2-75.4,44.2-121.6C386,85.9,299.5,0.2,193.1,0.2S0,86,0,191.4s86.5,191.1,192.9,191.1    c45.2,0,86.8-15.5,119.8-41.4l140.5,140.5c8.2,8.2,20.4,8.2,28.6,0C490,473.4,490,461.2,481.8,453z M41,191.4    c0-82.8,68.2-150.1,151.9-150.1s151.9,67.3,151.9,150.1s-68.2,150.1-151.9,150.1S41,274.1,41,191.4z"
                />
              </g>
            </g>
          </svg>
          <input onChange={(e) => setSarchedValue(e.target.value)} placeholder="Search" type="text" />
        </div>
        <div className="shop-search-values">
          <div onClick={() => setSelectedValue("All")} className={`shop-value ${selectedValue === "All" ? "value-selected" : ""}`}>
            All
          </div>
          <div onClick={() => setSelectedValue("Accessories")} className={`shop-value ${selectedValue === "Accessories" ? "value-selected" : ""}`}>
            Accessories
          </div>
          <div onClick={() => setSelectedValue("Clothes")} className={`shop-value ${selectedValue === "Clothes" ? "value-selected" : ""}`}>
            Clothes
          </div>
          <div onClick={() => setSelectedValue("Sneakers")} className={`shop-value ${selectedValue === "Sneakers" ? "value-selected" : ""}`}>
            Sneakers
          </div>
        </div>

      </div>
      <div className="dropdown-content">
      <select className=" dropbtn"  defaultValue="Sort" onChange={handleChange} >
       <option value="1">Sort - New in</option>
       <option value="2">Sort - Price: Low to High</option>
       <option value="3">Sort - Price: High to Low</option>
      </select>
      <select className=" dropbtn"  defaultValue="Gender" onChange={handleGenderChange} >
       <option value="0">Gender:</option>
       <option value="women">women</option>
       <option value="men">men</option>
      </select>
      </div>
      

      {renderSelectedValue()}
    </div>
  );
};

export default CategoriesPreview;
