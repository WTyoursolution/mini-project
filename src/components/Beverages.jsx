import { useState } from "react";
import supabase from "../utils/supabase";

export default function Beverages() {
  const [drinks, setDrinks] = useState([]);

  async function handleAddDrinks(event) {
    event.preventDefault();
    //extract the forms data
    const drinkName = event.target.elements.drinkName.value;
    const guestName = event.target.elements.guestName.value;
    const quantity = event.target.elements.quantity.value;
    const type_of_drink = event.target.elements.typeOfDrink.value;

    const newDrink = {
      beverage_name: drinkName,
      guest_name: guestName,
      quantity: parseInt(quantity),
      type_of_drink: type_of_drink,
    };

    console.log(newDrink);

    //Insert the new drink (single request)
    await supabase.from("beverages").insert(newDrink);

    //refresh the drinks list
    const response = await supabase.from("beverages").select();
    const data = response.data;
    setDrinks(data);

    //Clear the form inputs
    event.target.elements.drinkName.value = "";
    event.target.elements.guestName.value = "";
    event.target.elements.quantity.value = "";
    event.target.elements.typeOfDrink.value = "";
  }

  async function handleFetchDrinks() {
    const { data, error } = await supabase.from("beverages").select("*");
    if (error) {
      console.log("Error Fetching drinks: ", error);
    } else {
      console.log("Fetched data: ", data);
      setDrinks(data);
    }
  }

  const drinksDisplay = [];

  for (let i = 0; i < drinks.length; i++) {
    drinksDisplay.push(
      <li key={drinks[i].id}>
        {drinks[i].beverage_name} by {drinks[i].guest_name} serves{" "}
        {drinks[i].quantity} ( {drinks[i].type_of_drink} )
      </li>
    );
  }

  return (
    <>
    <div className="border border-black mx-auto p-4" style={{ width: '500px', height: 'auto' }}>
      <h1 className="text-center">Potluck Drinks</h1>
      <button type="submit" className="btn btn-outline-primary" onClick={handleFetchDrinks}>Fetch Drinks</button>
      <ul>{drinksDisplay}</ul>

      <div className="border border-black rounded p-3">
        <form onSubmit={handleAddDrinks}>
          <label className="m-2">
            Drink: <input type="text" name="drinkName" className="border border-black rounded"/>
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
            Type Of Drink:
            <select name="typeOfDrink" defaultValue="" className="border border-black rounded">
              <option value="" disabled>Select a kind</option>
              <option value="mocktail">Mocktail</option>
              <option value="cocktail">Cocktail</option>
              <option value="refresher">Refresher</option>
              <option value="smoothie">Smoothie</option>
              <option value="icedBeverage">Iced Beverage</option>
              <option value="hotDrink">Hot Drink</option>
            </select>
          </label>
          <br />
          <button type="submit" className="btn btn-outline-primary m-2 p-1">Add Drink</button>
        </form>
      </div>
    </div>
    </>
  );
}
