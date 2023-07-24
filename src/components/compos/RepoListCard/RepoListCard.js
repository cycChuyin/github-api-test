import React from "react";
import { List, Row, Col, Tag } from "antd";
import { FolderFilled } from "@ant-design/icons";
import moment from "moment";
import * as Style from "./style";

export const RepoListCard = ({ repo, showDrawer }) => {
  return (
    <Style.Container>
      <List.Item key={repo.id} onClick={() => showDrawer(repo)}>
        <Row gutter={24} justify='space-between'>
          <Col span={12}>
            <h3>
              <span style={{ marginRight: "8px" }}>
                <FolderFilled />
              </span>
              {repo.name}
            </h3>
          </Col>
          <Col>
            <Tag color='#41464f'>{repo.visibility}</Tag>
          </Col>
        </Row>
        <Row gutter={24}>
          {repo.language && (
            <Col>
              <p>
                <Style.RepoLanguageColor
                  language={repo.language || "transparent"}
                />
                {repo.language}
              </p>
            </Col>
          )}
          {repo.updated_at && (
            <Col>
              <p>Updated on {moment(repo.updated_at).format("ll")}</p>
            </Col>
          )}
        </Row>
      </List.Item>
    </Style.Container>
  );
};

export default RepoListCard;
