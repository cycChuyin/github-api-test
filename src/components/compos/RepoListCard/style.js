import styled from "styled-components";

const LanguageColor = [
  { lang: "HTML", color: "#e34c26" },
  { lang: "CSS", color: "#563d7c" },
  { lang: "Vue", color: "#41b883" },
  { lang: "Python", color: "#3572A5" },
  { lang: "JavaScript", color: "#f1e05a" },
  { lang: "TypeScript", color: "#3178c6" },
];

export const RepoLanguageColor = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: ${(props) => {
    const findColor = LanguageColor.find(
      (item) => item.lang === props.language
    );
    return findColor ? findColor.color : "#fff";
  }};
`;

export const Container = styled.div`
  .ant-list-item {
    color: #41464f;
    width: 100%;
    margin: 8px auto;
    padding: 16px 8px;
    display: flex;
    flex-direction: column;
    background-color: #eaeae8;
    border-radius: 8px;

    &:hover {
      background-color: #dbd6d0;
      cursor: pointer;
    }

    > div {
      width: 100%;
    }

    h3,
    p {
      margin: 0;
    }
  }
`;
