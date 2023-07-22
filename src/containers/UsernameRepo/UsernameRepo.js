import React from "react";
import { useState, useEffect } from "react";
import { Input, Button } from "antd";
import axios from "axios";
import UsernameReposTable from "../../components/compos/UsernameReposTable/UsernameReposTable";

function UsernameRepo() {
  const [userName, setUserName] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [reposData, setReposData] = useState([]);

  const handleChangeUserName = (e) => {
    const { value } = e.target;
    setUserName(value);
  };

  const handleSearch = () => {
    setIsLoading(true);
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

  useEffect(() => {
    setReposData([]);
  }, [userName]);

  return (
    <>
      <Input
        placeholder='Please input Username'
        value={userName}
        onChange={(e) => handleChangeUserName(e)}
      />
      <Button onClick={() => handleSearch()}>Search</Button>
      <UsernameReposTable dataSource={reposData} />
    </>
  );
}

export default UsernameRepo;
