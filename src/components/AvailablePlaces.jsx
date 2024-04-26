import { useEffect, useState } from "react";
import Error from "./Error.jsx";
import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);

      try {
        const response = await fetch("http://localhost:3000/places");
        const resData = await response.json();

        // logic jika ada error dari hit api backend
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        setAvailablePlaces(resData.places);
      } catch (error) {
        setError({
          message:
            error.message || "could not fetch data, plzzzz try again later!!!",
        });
      }

      setIsFetching(false);
    }
    fetchData();
  }, []);

  if (error) {
    return <Error title="an error occured!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Data is loading..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
