import styled from "styled-components";

const CenterSection = styled.section`
  text-align: center;
  padding: 20px;

  p {
    font-size: 18px;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5em;

    label {
      font-size: 16px;
      margin-bottom: 5px;
    }

    input {
      width: 250px;
      padding: 8px;
      margin-bottom: 10px;
      border: 1px solid #000;
    }
  }
`;

export default CenterSection;
