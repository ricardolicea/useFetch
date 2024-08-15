import React, { useState, useEffect } from "react";
import "./styles.css";

/*
  Instructions:
    Implement the `useFetch` function. 
*/

function useFetch(url) {
  const [data, setData] = useState({ body: null, title: null });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchText() {
      const response = await fetch(url);
      const resData = await response.json();
      let error = "";
      if (!response.ok) {
        error = new Error("Failed to fetch");
      }
      setData(resData);
      setLoading(false);
    }

    fetchText();
  
  }, [url]);

  return { loading: loading, data: data, error: "" };
}

export default function App() {
  const postIds = [1, 2, 3, 4, 5, 6, 7, 8];
  const [index, setIndex] = useState(0);

  let {
    loading,
    data: post,
    error,
  } = useFetch(`https://jsonplaceholder.typicode.com/posts/${postIds[index]}`);

  const incrementIndex = () => {
    setIndex((i) => (i === postIds.length - 1 ? i : i + 1));
    console.log(index)
  };

  if (loading === true) {
    return <p>Loading</p>;
  }

  if (error) {
    return (
      <>
        <p>{error}</p>
        <button onClick={incrementIndex}>Next Post</button>
      </>
    );
  }

  return (
    <div className="App">
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      {error && <p>{error}</p>}
      {index === postIds.length - 1 ? (
        <p>No more posts existss ....</p>
      ) : (
        <button onClick={incrementIndex} className='button'>Next Post</button>
      )}
    </div>
  );
}
