import React from "react";

//notice how the file name and the component name are the same,not neccesarry but a good practice,easier to keep track
//instead of writing props in front of every line,we can destructure our object,that means inside of {} get something that we passed in those props,in our case movie1
const MovieCard = ({ movie }) => {
  return (
    <div className="movie">
      <div>
        <p>{movie.Year}</p>
      </div>
      <div>
        <img
          //ternary operator that says: if the movie poster equals to N/A then provide this placeholder image
          //else post the movie1.Poster,since we dont have a poster and have an N/A,we get a placeholder
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/400"
          }
          alt={movie.Title}
        />
      </div>
      <div>
        <span>{movie.Type}</span>
        <h3>{movie.Title}</h3>
      </div>
    </div>
  );
};

//usually we use export default when there is just one component to export from our file
export default MovieCard;
