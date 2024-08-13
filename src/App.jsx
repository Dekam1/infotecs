import React from "react";
import Search from "./components/Search";

function App() {
  const [searchValue, setSearchValue] = React.useState("");
  const [users, setUsers] = React.useState([]);

  const options = [
    { title: "Возраст", value: "age" },
    { title: "Пол", value: "gender" },
    { title: "Номер телефона", value: "phone" },
    { title: "Адрес", value: "address.city" },
  ];

  const [selectedOption, setSelectedOption] = React.useState(options[0].title);

  const param = options.find(
    (options) => options.title === selectedOption
  ).value;

  React.useEffect(() => {
    if (searchValue) {
      const fetchData = () => {
        fetch(
          `https://dummyjson.com/users/filter?key=${param}&value=${searchValue}`
        )
          .then((response) => {
            return response.json();
          })
          .then(({ users }) => {
            setUsers(users);
          });
      };

      fetchData();
    } else {
      fetch("https://dummyjson.com/users")
        .then((response) => {
          return response.json();
        })
        .then(({ users }) => {
          setUsers(users);
        });
    }
  }, [searchValue]);

  return (
    <div className="table-container">
      <div style={{ padding: "10px 0px" }}>
        <Search
          options={options}
          selected={selectedOption}
          fnc={setSelectedOption}
        />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Поиск..."
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>ФИО</th>
            <th>Возраст</th>
            <th>Пол</th>
            <th>Номер телефона</th>
            <th>Адрес</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <th>
                {user.firstName} {user.lastName}
              </th>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>{user.phone}</td>
              <td>
                {user.address.city}, {user.address.address}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
