import { useState } from "react";
import supabase from "../utils/supabase";

export default function PotluckMeals() {
  const [meals, setMeals] = useState([]);

  async function handleAddMeal(event) {
    event.preventDefault();
    //extract the forms data
    const mealName = event.target.elements.mealName.value;
    const guestName = event.target.elements.guestName.value;
    const serves = event.target.elements.serves.value;
    const kindOfDish = event.target.elements.kindOfDish.value;

    const newMeal = {
      meal_name: mealName,
      guest_name: guestName,
      serves: parseInt(serves),
      kind_of_dish: kindOfDish,
    };

    console.log(newMeal);

    // Insert the new meal (single request)
    await supabase.from("potluck_meals").insert(newMeal);

    //Refresh the new meal
    const response = await supabase.from("potluck_meals").select();
    const data = response.data;
    setMeals(data);

    //Clear the form inputs 
    event.target.elements.mealName.value = ""
    event.target.elements.guestName.value = ""
    event.target.elements.serves.value = ""
    event.target.elements.kindOfDish.value = ""
  }

  async function handleFetchMeals() {
    const { data, error } = await supabase.from("potluck_meals").select("*");
    if (error) {
      console.log("Error fetching meals: ", error);
    } else {
      console.log("Fetched data: ", data);
      setMeals(data);
    }
  }

  const mealsDisplay = (
    <div className="row">
      {meals.map((meal) => (
        <div key={meal.id} className="col-12 col-md-6 col-lg-4 mb-3">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{meal.meal_name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">By {meal.guest_name}</h6>
              <p className="card-text">Serves {meal.serves}</p>
              <span className="badge bg-info text-dark">{meal.kind_of_dish}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
  <div className="container border border-black mx-auto p-4">
      <h1 className="text-center">Potluck Meals</h1>

  <p>*see what others are bringing here:</p>
  <button type="submit" className="btn btn-outline-primary m-2" onClick={handleFetchMeals}>Fetch Meals</button>
  {mealsDisplay}

      <div className="border border-black rounded p-3">
        <form onSubmit={handleAddMeal}>
          <label className="m-2">
            Meal: <input type="text" name="mealName"  className="border border-black rounded"/>
          </label>
          <br />
          <label className="m-2">
            Guest: <input type="text" name="guestName"  className="border border-black rounded"/>
          </label>
          <br />
          <label className="m-2">
            Serves: <input type="number" name="serves" className="border border-black rounded"/>
          </label>
          <br />
          <label className="m-2">
            Kind of Dish: <select name="kindOfDish" defaultValue="" className="border border-black rounded">
              <option value="" disabled>Select a kind</option>
              <option value="entree">Entree</option>
              <option value="side">Side</option>
              <option value="snack">Snack</option>
              <option value="dessert">Dessert</option>
              <option value="drink">Drink</option>
            </select>
          </label>
          <br />
          <button type="submit" className="btn btn-outline-primary m-2 p-1">Add Meal</button>
        </form>
      </div>
</div>
    </>
  );
}
