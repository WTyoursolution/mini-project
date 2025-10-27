import { useState } from "react";
import supabase from "../utils/supabase";

export default function Utensils() {
  const [utensils, setUtensils] = useState([]);

  async function handleAddUtensils(event) {
    event.preventDefault();
    //extract the forms data
    const itemName = event.target.elements.itemName.value;
    const guestName = event.target.elements.guestName.value;
    const quantity = event.target.elements.quantity.value;
    const typeOfItem = event.target.elements.typeOfItem.value;

    const newItem = {
      item_name: itemName,
      guest_name: guestName,
      quantity: parseInt(quantity),
      item_type: typeOfItem,
    };

    console.log(newItem);

    // Insert the new meal (single request)
    await supabase.from("utensils").insert(newItem);

    //Refresh the new meal
    const response = await supabase.from("utensils").select();
    const data = response.data;
    setUtensils(data);

    event.target.elements.itemName.value = "";
    event.target.elements.guestName.value = "";
    event.target.elements.quantity.value = "";
    event.target.elements.typeOfItem.value = "";
  }

  async function handleFetchUtensils() {
    const { data, error } = await supabase.from("utensils").select("*");
    if (error) {
      console.log("Error fetching meals: ", error);
    } else {
      console.log("Fetched data: ", data);
      setUtensils(data);
    }
  }

  const utensilsDisplay = (
    <div className="row">
      {utensils.map((item) => (
        <div key={item.id} className="col-12 col-md-6 col-lg-4 mb-3">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{item.item_name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">By {item.guest_name}</h6>
              <p className="card-text">Quantity: {item.quantity}</p>
              <span className="badge bg-info text-dark">{item.item_type}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
  <div className="container border border-black mx-auto p-4">
      <h1 className="text-center">Potluck Utensils</h1>
      
     <p>*see what others are bringing here:</p>
  <button type="submit" className="btn btn-outline-primary m-2" onClick={handleFetchUtensils}>Fetch Utensils</button>
  {utensilsDisplay}

      <div className="border border-black rounded p-3">
        <form onSubmit={handleAddUtensils}>
          <label className="m-2">
            Item: <input type="text" name="itemName" className="border border-black rounded"/>
          </label>
          <br />
          <label className="m-2">
            Guest: <input type="text" name="guestName" className="border border-black rounded"/>
          </label>
          <br />
          <label className="m-2">
            Quantity: <input type="number" name="quantity" className="border border-black rounded"/>
          </label>
          <br />
          <label className="m-2">
            Type Of Item:{" "}
            <select name="typeOfItem" defaultValue="" className="border border-black rounded">
              <option value="" disabled>Select a kind</option>
              <option value="utensil">Utensil</option>
              <option value="drinkware">Drinkware</option>
              <option value="serveware">Serveware</option>
              <option value="kitchenTool">Kitchen Tool</option>
              <option value="cookware">Cookware</option>
            </select>
          </label>
          <br />
          <button type="submit" className="btn btn-outline-primary m-2 p-1">Add Utensil</button>
        </form>
      </div>
    </div>
    </>
  );
}
