import React from "react";
import { useState, useEffect } from "react";
import { Input, List, Select } from "antd";
import axios from "axios";
import RepoListCard from "../../components/compos/RepoListCard/RepoListCard";
import RepoDetailDrawer from "../../components/compos/RepoDetailDrawer/RepoDetailDrawer";
import * as Style from "./style";

const { Search } = Input;

const SortByOptions = [
  {
    value: "updated",
    label: "Last Updated",
  },
  {
    value: "name",
    label: "Name",
  },
  {
    value: "stargazers",
    label: "Stars",
  },
];

function UsernameRepo() {
  const [userName, setUserName] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [reposData, setReposData] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState({});
  const [sortBy, setSortBy] = useState("updated");

  const handleChangeUserName = (e) => {
    const { value } = e.target;
    setUserName(value);
  };

  const handleSearch = async (value) => {
    setIsLoading(true);
    try {
      if (value) {
        const res = await axios.get(
          `https://api.github.com/users/${value}/repos?sort=${sortBy}`
        );
        console.log(res.data);
        setReposData([...res.data]);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMsg(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowDrawer = async (repo) => {
    setSelectedRepo(repo);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const renderReposList = (repo, index) => {
    return <RepoListCard repo={repo} showDrawer={handleShowDrawer} />;
  };

  const handleChangeSort = (value) => {
    setSortBy(value);
  };

  useEffect(() => {
    setReposData([]);
    setErrorMsg("");
  }, [userName]);

  useEffect(() => {
    if (userName) {
      handleSearch(userName);
    }
  }, [sortBy]);

  return (
    <>
      <h1 style={{ color: "#CFC5BC" }}>Search Username Repositories</h1>
      <Search
        placeholder='Please input Username'
        allowClear
        enterButton='Search'
        size='large'
        onSearch={handleSearch}
        onChange={handleChangeUserName}
      />

      <Style.SelectContainer>
        <p>SortBy</p>
        <Select
          defaultValue='updated'
          onChange={handleChangeSort}
          options={SortByOptions}
          popupMatchSelectWidth
        />
      </Style.SelectContainer>

      {errorMsg ? (
        <Style.ErrorMsgText>{errorMsg}</Style.ErrorMsgText>
      ) : (
        <List
          loading={isloading}
          itemLayout='horizontal'
          dataSource={reposData}
          renderItem={renderReposList}
          pagination={{
            defaultCurrent: 1,
            total: reposData.length,
            pageSize: 5,
          }}
        />
      )}

      <RepoDetailDrawer
        repo={selectedRepo}
        onClose={handleCloseDrawer}
        open={drawerOpen}
      />
    </>
  );
}

export default UsernameRepo;
