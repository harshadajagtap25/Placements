import React, { useState } from "react";
import Add from "../Components/Add";
import styles from "../style.module.css";
import axios from "axios";
import { useEffect } from "react";
import Card from "../Components/Card";

const Home = () => {
  const [data, setData] = useState("");

  const getDataFrom = () => {
    axios
      .get("http://localhost:8080/cards")
      .then((r) => {
        setData(r.data);
      })
      .catch((e) => console.log(e));

    return data;
  };
  const handleAdd = (name) => {
    let filteredCard = data.filter((c) => c.class === name);
    if (filteredCard.length < 8) {
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
    }
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

  const onDragStart = (evt) => {
    let element = evt.currentTarget;
    element.classList.add("dragged");
    evt.dataTransfer.setData("text/plain", evt.currentTarget.id);
    evt.dataTransfer.effectAllowed = "move";
  };
  const onDragEnd = (evt) => {
    evt.currentTarget.classList.remove("dragged");
  };
  const onDragEnter = (evt) => {
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.add("dragged-over");
    evt.dataTransfer.dropEffect = "move";
  };
  const onDragLeave = (evt) => {
    let currentTarget = evt.currentTarget;
    let newTarget = evt.relatedTarget;
    if (newTarget.parentNode === currentTarget || newTarget === currentTarget)
      return;
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.remove("dragged-over");
  };
  const onDragOver = (evt) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
  };
  const onDrop = (evt, status) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove("dragged-over");
    let newData = evt.dataTransfer.getData("text/plain");
    let datas = data;
    // console.log("data", newData, status);
    let updated = datas.map((task) => {
      if (task.id === newData) {
        console.log(task, task.class, status);
        task.class = status;
      }
      return task;
    });
    // console.log(updated)
    // setState({ tasks: updated });
  };

  useEffect(() => {
    getDataFrom();
  }, [data.length]);
  // console.log(data);
  return (
    <div>
      <div
        style={{
          display: "flex",
          height: "auto",
          width: "80%",
          margin: "auto",
          justifyContent: "center",
          border: "1px solid red",
          padding: "10px",
        }}
        className={styles.maincontainer}
      >
        <div
          className={styles.first}
          onDragLeave={(e) => onDragLeave(e)}
          onDragEnter={(e) => onDragEnter(e)}
          onDragEnd={(e) => onDragEnd(e)}
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, false, "red")}
        >
          <Add name={"Red"} handleAdd={() => handleAdd("red")} />

          <div className={styles.red}>
            {data.length > 0 &&
              data
                .filter((card) => card.class === "red")
                .map((c) => (
                  <div
                    draggable
                    onDragStart={(e) => onDragStart(e)}
                    onDragEnd={(e) => onDragEnd(e)}
                  >
                    <Card
                      id={c.id}
                      key={c.id}
                      name={c.title}
                      handleDelete={() => handleDelete(c.id)}
                    />
                  </div>
                ))}
          </div>
        </div>

        <div
          onDragLeave={(e) => onDragLeave(e)}
          onDragEnter={(e) => onDragEnter(e)}
          onDragEnd={(e) => onDragEnd(e)}
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, false, "blue")}
        >
          <Add name={"Blue"} handleAdd={() => handleAdd("blue")} />

          <div className={styles.blue}>
            {data.length > 0 &&
              data
                .filter((card) => card.class === "blue")
                .map((c, index) => (
                  <div
                    draggable
                    onDragStart={(e) => onDragStart(e)}
                    onDragEnd={(e) => onDragEnd(e)}
                  >
                    <Card
                      id={c.id}
                      key={c.id}
                      name={c.title}
                      handleDelete={() => handleDelete(c.id)}
                    />
                  </div>
                ))}
          </div>
        </div>

        <div
          onDragLeave={(e) => onDragLeave(e)}
          onDragEnter={(e) => onDragEnter(e)}
          onDragEnd={(e) => onDragEnd(e)}
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, false, "green")}
        >
          <Add name={"Green"} handleAdd={() => handleAdd("green")} />
          <div className={styles.green}>
            {data.length > 0 &&
              data
                .filter((card) => card.class === "green")
                .map((c) => (
                  <div
                    draggable
                    onDragStart={(e) => onDragStart(e)}
                    onDragEnd={(e) => onDragEnd(e)}
                  >
                    <Card
                      id={c.id}
                      key={c.id}
                      name={c.title}
                      handleDelete={() => handleDelete(c.id)}
                    />
                  </div>
                ))}
          </div>
        </div>

        <div
          onDragLeave={(e) => onDragLeave(e)}
          onDragEnter={(e) => onDragEnter(e)}
          onDragEnd={(e) => onDragEnd(e)}
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, false, "black")}
        >
          <Add name={"Black"} handleAdd={() => handleAdd("black")} />

          <div className={styles.black}>
            {data.length > 0 &&
              data
                .filter((card) => card.class === "black")
                .map((c) => (
                  <div
                    draggable
                    onDragStart={(e) => onDragStart(e)}
                    onDragEnd={(e) => onDragEnd(e)}
                  >
                    <Card
                      id={c.id}
                      key={c.id}
                      name={c.title}
                      handleDelete={() => handleDelete(c.id)}
                    />
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
