import styled from "styled-components";

const LanguageColor = [
  { lang: "HTML", color: "#e34c26" },
  { lang: "CSS", color: "#563d7c" },
  { lang: "Vue", color: "#41b883" },
  { lang: "Python", color: "#3572A5" },
  { lang: "JavaScript", color: "#f1e05a" },
  { lang: "TypeScript", color: "#3178c6" },
];

export const ErrorMsgText = styled.p`
  color: #ff0000;
`;

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

export const SelectContainer = styled.div`
  color: "#CFC5BC";
  display: flex;
  align-items: center;
  padding: 8px 0;

  p {
    margin-right: 8px;
  }
`;
