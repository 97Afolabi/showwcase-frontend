import styled from "styled-components";
import { IEducation } from "../../interfaces/IEducation";

const StyledSidebar = styled.section`
  margin-right: 30px;
  background-color: #999;
  padding: 20px;
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 22px;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      margin-bottom: 10px;
    }
  }
`;

const Sidebar = ({ educationList }) => {
  return (
    <StyledSidebar>
      <h2>Showcase University</h2>
      <ul>
        {educationList.map((education: IEducation, index: number) => (
          <li key={index}>{education.school}</li>
        ))}
      </ul>
    </StyledSidebar>
  );
};

export default Sidebar;
