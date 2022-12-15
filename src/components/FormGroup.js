import { useState } from "react";

const FormGroup = (props) => {
  const { item } = props;
  const [val, setVal] = useState("");
  const genreDatas = [
    "Afro/Dancehall",
    "Bolero",
    "Folklore",
    "Haltian Jazz",
    "Kanaval",
    "Konpa",
    "Raboday",
    "Ragga/Rap/Hip-Hop",
    "Rasin",
    "Reggare",
    "Gospel",
    "Twoubadou",
    "Zouk",
    "Other",
  ];

  const yearsHandle = () => {
    const yearArray = [];
    for (var i = 2022; i >= 1950; i--) {
      yearArray.push(<option> {i} </option>);
    }
    return yearArray;
  };

  const handleFormChange = (event) => {
    setVal(event.target.value);
  };

  return (
    <div className="form-group">
      <label htmlFor={item.name}>
        <b>{item.label}</b>
      </label>
      {item.type === "input" ? (
        <input
          type="text"
          className="form-control"
          id={item.name}
          placeholder={item.label + "*"}
          value={val}
          onChange={handleFormChange}
        />
      ) : item.name === "year" ? (
        <select
          className="form-control"
          id={item.name}
          style={{ padding: "8px 20px", height: "46px" }}
        >
          {yearsHandle()}
        </select>
      ) : (
        <select
          className="form-control"
          name={item.name}
          style={{ padding: "8px 20px", height: "46px" }}
        >
          {genreDatas.map((data, index) => {
            return <option>{data}</option>;
          })}
        </select>
      )}
    </div>
  );
};

export default FormGroup;
