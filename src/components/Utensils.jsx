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

  const utensilsDisplay = [];

  for (let i = 0; i < utensils.length; i++) {
    utensilsDisplay.push(
      <li key={utensils[i].id}>
        {utensils[i].item_name} by {utensils[i].guest_name} serves{" "}
        {utensils[i].quantity} ( {utensils[i].item_type} )
      </li>
    );
  }

  return (
    <>
    <div className="border border-black mx-auto p-4" style={{ width: '500px', height: 'auto' }}>
      <h1 className="text-center">Potluck Utensils</h1>
      <button type="submit" className="btn btn-outline-primary" onClick={handleFetchUtensils}>Fetch Utensils</button>
      <ul>{utensilsDisplay}</ul>

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
