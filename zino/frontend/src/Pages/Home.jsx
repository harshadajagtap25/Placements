import React, { useState } from "react";
import Add from "../Components/Add";
import styles from "../style.module.css";
import axios from "axios";
import { useEffect } from "react";
import Card from "../Components/Card";

const Home = () => {
  const [data, setData] = useState("");

  const getData = () => {
    axios
      .get("http://localhost:8080/cards")
      .then((r) => setData(r.data))
      .catch((e) => console.log(e));
  };
  const handleAdd = (name) => {
    axios
      .post("http://localhost:8080/cards", {
        id: "",
        title: "New Added",
        class: name,
      })
      .then((r) => {
        // console.log(r.data);
        setData(r.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/cards/${id}`, {})
      .then((r) => {
        // console.log(r.data);
        setData(r.data);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getData();
  }, [data.length]);
  // console.log(data);
  return (
    <div>
      <div
        style={{
          display: "flex",
          height: "400px",
          width: "80%",
          margin: "auto",
          justifyContent: "center",
          border: "1px solid red",
        }}
        className={styles.maincontainer}
      >
        <div>
          <Add name={"Red"} handleAdd={() => handleAdd("red")} />

          <div className={styles.red}>
            {data.length > 0 &&
              data
                .filter((card) => card.class === "red")
                .map((c) => (
                  <Card
                    id={c.id}
                    key={c.id}
                    name={c.title}
                    handleDelete={() => handleDelete(c.id)}
                  />
                ))}
          </div>
        </div>
        <div>
          <Add name={"Blue"} handleAdd={() => handleAdd("blue")} />

          <div className={styles.blue}>
            {data.length > 0 &&
              data
                .filter((card) => card.class === "blue")
                .map((c) => (
                  <Card
                    id={c.id}
                    key={c.id}
                    name={c.title}
                    handleDelete={() => handleDelete(c.id)}
                  />
                ))}
          </div>
        </div>
        <div>
          <Add name={"Green"} handleAdd={() => handleAdd("green")} />
          <div className={styles.green}>
            {data.length > 0 &&
              data
                .filter((card) => card.class === "green")
                .map((c) => (
                  <Card
                    id={c.id}
                    key={c.id}
                    name={c.title}
                    handleDelete={() => handleDelete(c.id)}
                  />
                ))}
          </div>
        </div>
        <div>
          <Add name={"Black"} handleAdd={() => handleAdd("black")} />

          <div className={styles.black}>
            {data.length > 0 &&
              data
                .filter((card) => card.class === "black")
                .map((c) => (
                  <Card
                    id={c.id}
                    key={c.id}
                    name={c.title}
                    handleDelete={() => handleDelete(c.id)}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
