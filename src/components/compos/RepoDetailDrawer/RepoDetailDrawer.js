import React, { useState, useEffect } from "react";
import { Row, Col, Drawer, Divider, Button, Spin, Card, Avatar } from "antd";
import moment from "moment";
import axios from "axios";
import * as Style from "./style";

export const RepoDetailDrawer = ({ repo, onClose, open }) => {
  const [isStarloading, setIsStarLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [stargazersData, setStargazersData] = useState([]);

  const showStargazers = async (url) => {
    setIsStarLoading(true);
    try {
      const res = await axios.get(url);
      console.log(res.data);
      setStargazersData([...res.data]);
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMsg(error.response.data.message);
    } finally {
      setIsStarLoading(false);
    }
  };

  useEffect(() => {
    if (!open) {
      setStargazersData([]);
    }
  }, [open]);

  return (
    <Drawer
      title={repo.name}
      width={720}
      placement='right'
      onClose={onClose}
      open={open}>
      <Divider orientation='left'>About</Divider>
      <Style.ContextBox>
        <Style.Title>Name:</Style.Title>
        <p>{repo.name}</p>
      </Style.ContextBox>
      <Style.ContextBox>
        <Style.Title>Description:</Style.Title>
        <p>{repo.description}</p>
      </Style.ContextBox>
      <Style.ContextBox>
        <Style.Title>Forks Count:</Style.Title>
        <p> {repo.forks_count}</p>
      </Style.ContextBox>
      <Style.ContextBox>
        <Style.Title>Stars:</Style.Title>
        <p> {repo.stargazers_count}</p>
        <Button
          onClick={() => showStargazers(repo.stargazers_url)}
          disabled={repo.stargazers_count === 0}>
          View stargazers
        </Button>
      </Style.ContextBox>
      <Style.ContextBox>
        <Style.Title>Created Date:</Style.Title>
        <p>{moment(repo.created_at).format("ll")}</p>
      </Style.ContextBox>

      <Style.ContextBox>
        <Style.Title>Updated Date:</Style.Title>
        <p> {moment(repo.updated_at).format("ll")}</p>
      </Style.ContextBox>

      {isStarloading && <Spin />}
      {errorMsg}
      {stargazersData.length > 0 ? (
        <>
          <Divider orientation='left'>Stargazers</Divider>
          <Row gutter={[16,16]}>
            {stargazersData.map((user) => {
              return (
                <Col span={12}>
                  <Card key={user.id}>
                    <Avatar
                      src={<img src={user.avatar_url} alt='avatar_url' />}
                    />
                    <h3>
                      <a href={user.html_url}>{user.login}</a>
                    </h3>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </>
      ) : null}
    </Drawer>
  );
};

export default RepoDetailDrawer;
