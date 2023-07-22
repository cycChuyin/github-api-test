import React from "react";
import { useState, useEffect } from "react";
import { Input, Button } from "antd";
import axios from "axios";
import UsernameReposTable from "../../components/compos/UsernameReposTable/UsernameReposTable";
import * as Style from "./style";

function UsernameRepo() {
  const [userName, setUserName] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [reposData, setReposData] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

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
        setErrorMsg(error.message);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    setReposData([]);
    setErrorMsg("");
  }, [userName]);

  return (
    <>
      <h1>Search Username GitHub Repositories</h1>
      <Input
        placeholder='Please input Username'
        value={userName}
        onChange={(e) => handleChangeUserName(e)}
      />
      <Button onClick={() => handleSearch()}>Search</Button>
      <UsernameReposTable dataSource={reposData} loading={loading} />
      {errorMsg && <Style.ErrorMsgText>{errorMsg}</Style.ErrorMsgText>}
    </>
  );
}

export default UsernameRepo;
