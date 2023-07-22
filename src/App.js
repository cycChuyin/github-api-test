//import logo from './logo.svg';
import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import "./App.css";

function App() {
  const [userName, setUserName] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [reposData, setReposData] = useState([]);

  const handleChangeUserName = (e) => {
    const { value } = e.target;
    setUserName(value);
  };

  const handleSearch = () => {
    setIsLoading(true);
    // Send a GET request
    axios
      .get(`https://api.github.com/users/${userName}/repos`)
      .then((response) => {
        console.log(response.data);
        setReposData([...response.data]);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  const RepoItems = () => {
    return reposData.map((repo) => (
      <div key={repo.id}>
        <h6>Repo Name</h6>
        <p>{repo.name}</p>
        <h6>Link</h6>
        <a href={repo.url}>{repo.url}</a>
        <h6>Updated At</h6>
        <p>{moment(repo.updated_at).format("YYYY-MM-DD")}</p>
      </div>
    ));
  };

  useEffect(() => {
    setReposData([]);
  }, [userName]);

  return (
    <div className='App'>
      <input
        value={userName}
        placeholder='Please input the gitHub username'
        onChange={(e) => handleChangeUserName(e)}></input>
      <button onClick={() => handleSearch()}>Search</button>
      {reposData.length > 0 ? <RepoItems /> : null}
    </div>
  );
}

export default App;
