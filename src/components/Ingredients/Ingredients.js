import React, { useCallback, useState } from "react";
import IngredientList from "./IngredientList";
import IngredientForm from "./IngredientForm";
import Search from "./Search";

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);
  const addIngredientHandler = async (ingredient) => {
    const response = await fetch(
      "https://react-hooks-d7875-default-rtdb.firebaseio.com/ingredients.json",
      {
        method: "POST",
        body: JSON.stringify(ingredient),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    setUserIngredients((prevIng) => [
      ...prevIng,
      { id: data.name, ...ingredient },
    ]);
  };
  const removeIngredientHandler = (id) => {
    fetch(
      `https://react-hooks-d7875-default-rtdb.firebaseio.com/ingredients/${id}.json`,
      {
        method: "DELETE",
      }
    ).then((response) => {
      setUserIngredients((prevIng) => prevIng.filter((ing) => ing.id !== id));
    });
  };
  const filteredIngredientHandler = useCallback((filteredIngredients) => {
    setUserIngredients(filteredIngredients);
  });
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
