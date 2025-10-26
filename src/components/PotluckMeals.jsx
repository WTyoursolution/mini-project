import { useState } from "react";
import supabase from "../utils/supabase";

export default function PotluckMeals() {
  const [meals, setMeals] = useState([]);

  function handleAddMeal(event) {
    console.log(event);
    console.log(event.target);
    console.log(event.target.elements);
    event.preventDefault();
    console.log("handle add meal submitted");
    //extract the forms data
    const mealName = event.target.elements.mealName.value;
    const guestName = event.target.elements.guestName.value;
    const serves = event.target.elements.serves.value;
    const kindOfDish = event.target.elements.kindOfDish.value;

    const newMeal = {
      meal_name: mealName,
      guest_name: guestName,
      serves: serves,
      kindOfDish: kindOfDish,
    };

    console.log(newMeal);
    // we'll add the insert logic in the next step
  }

  async function handleFetchMeals() {
    const { data, error } = await supabase.from("potluck_meals").select("*");
    if (error) {
      console.log("Error fetching meals: ", error);
    } else {
      console.log("Fetched data:", data);
      setMeals(data);
    }
  }

  const mealsDisplay = [];

  for (let i = 0; i < meals.length; i++) {
    mealsDisplay.push(
      <li key={meals[i].id}>
        {meals[i].meal_name} by {meals[i].guest_name} serves {meals[i].serves} ({" "}
        {meals[i].kind_of_dish} )
      </li>
    );
  }
  return (
    <>
      <h1>Potluck Data</h1>
      <button onClick={handleFetchMeals}>Fetch Meals</button>
      <ul>{mealsDisplay}</ul>

      <div>
        <form onSubmit={handleAddMeal}>
          <label>
            Meal: <input type="text" name="mealName" />
          </label>
          <br />
          <label>
            Guest: <input type="text" name="guestName" />
          </label>
          <br />
          <label>
            Serves: <input type="number" name="serves" />
          </label>
          <br />
          <label>
            Kind of Dish: <input type="text" name="kindOfDish" />
          </label>
          <br />
          <button type="submit">Add Meal</button>
        </form>
      </div>
    </>
  );
}
