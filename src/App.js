import React from "react";
//we have to import our MovieCard from our other file so we can use it in this App.js file
import MovieCard from "./MovieCard";
//to use useEffect we have to import it,same goes for useState
import { useEffect } from "react";
import { useState } from "react";
//this is our api url which we can use inside of our component to gather our data,we want to fetch our data from this,the Api key comes after ?
//API as soon as our component loads
import "./App.css";
import SearchIcon from "./search.svg";

const API_URL = " http://www.omdbapi.com?apikey=6a49b8cb ";

//we use this as static data,just to render out something so that we know what JSX are we writing
// const movie1 = {
//   Title: "Spiderman",
//   Year: "1990",
//   imdbID: "tt0100669",
//   Type: "movie",
//   Poster: "N/A",
// };
const App = () => {
  //we use an empty array as the initial value of useState in ReactJS when we want the useEffect function to only be executed once, when the component is first rendered
  const [movies, setMovies] = useState([]);
  //we pass an empty string here,because our searcTerm start is gonna be empty
  const [searchTerm, setSearchTerm] = useState("");
  //async aka will take some time to fetch these movies
  const searchMovies = async (title) => {
    //this is gonna call our API
    //the const response = await fetch(`${API_URL}&s=${title}`); line of code is using the fetch() API to make a request to the OMDb API
    //${} allows us to dynamically insert values into strings. In this case, we are inserting the value of the `API_URL` variable and the value of the `title` parameter into the string
    //We insert values dynamically using template literal syntax (`${}`). This allows us to reuse the same code for different values. For example, if we wanted to search for movies with the title "Iron Man", we could simply change the value of thetitle` variable
    // The `&s={title}part of the string is a query parameter. It tells the OMDb API to search for movies with the title and insert the name of the movie`
    //the query parameter could be different on a different website. The query parameter is a way of telling the API what information you want to retrieve. For example, the &s= query parameter is used to tell the OMDb API to search for movies with a specific title.
    //The best way to find the query parameters for a particular API is to consult the API documentation. The API documentation will list all of the available query parameters and explain how to use them.

    const response = await fetch(`${API_URL}&s=${title}`);

    //once we get the response,we got to get the data from it,and then inside the const data (object) we should have the data about the movies
    const data = await response.json();

    setMovies(data.Search);
  };

  //inside of it we are going to call a function which is going to fetch our movies from the api

  //
  useEffect(() => {
    //we also have to call the function for the data to show
    //  We have to call the searchMovies function inside the useEffect function because we want to fetch the movies from the API as soon as the component is displayed on the screen
    //If we did not call the searchMovies function inside the useEffect function, the movies would not be fetched until the user interacted with the component in some way
    //By calling the searchMovies function inside the useEffect function, we ensure that the movies are fetched as soon as the component is displayed on the screen
    //we usually put our component function inside useEffect when working with API because API calls are considered side effects. Side effects are actions that can potentially change state outside of React's managed state. In this case, fetching the movies from the API is a side effect
    searchMovies("Spiderman");
    // this tells React that the useEffect function does not depend on any of the props or state in the component
    //the empty dependency array tells React that the useEffect function should only be executed once, when the component is first rendered,if we dont have it, it just keeps counting in the console,site could freeze or crash
    //it is necessary to have the title prop in the dependency array if you want to search for different movies
    //If the dependency array is empty, the useEffect function will only be executed once, when the component is first rendered. This means that the searchMovies() function will only be called once, with the initial value of the title prop
  }, []);

  //elements and text rendered to our UI,what we see
  return (
    //className to give a class to our h1 element and the name of the class is "app"
    <div className="app">
      <h1>FilmoPlex</h1>

      <div className="search">
        {/* when we put a value,it becomes static,we cant type anything*/}
        <input
          type="text"
          placeholder="Search for movies"
          //comes from our second useState,this way the value is dynamic
          value={searchTerm}
          //a callback function from our second useState
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        {/* we will be calling our API from above straight from here */}
        {/* we call our searchMovies function inside of the on click listner to render our movies when we type something */}
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies.length > 0 ? (
        <div className="container">
          {/* we map out our movies,movies are plural,but as an argument usally we use a single like in this example */}
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
          {/* we call our component from the other file in here,so instead of writing the long code for every card
        we can now simply call the MovieCard as many times as we need a get a nice movie card,ofcourse we have to
        also use the props we used in our other file for our component */}
          {/* code below used as a part time code to see what we have on the page */}
          {/* <MovieCard movie1={movies[0]} /> */}
        </div>
      ) : (
        <div className="empty">No movies found</div>
      )}
    </div>
  );
};

export default App;
