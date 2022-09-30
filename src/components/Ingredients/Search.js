import React, { useEffect, useRef } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const searchInputRef = useRef();
  const { onLoadIngredients } = props;
  useEffect(() => {
    const enteredSearch = searchInputRef.current.value;
    //if (!enteredSearch) return
    const fetching = async() => {
      const query =
        enteredSearch.length === 0
          ? ""
          : `?orderBy="title"&equalTo="${enteredSearch}"`;
      const response = await fetch(
        "https://react-hooks-d7875-default-rtdb.firebaseio.com/ingredients.json" +
          query
      );
      const data = await response.json();
      const loadedIngredient = [];
      for (const key in data) {
        loadedIngredient.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount,
        });
      }
      onLoadIngredients(loadedIngredient);
    };
     fetching()
  }, [onLoadIngredients, searchInputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" ref={searchInputRef} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
