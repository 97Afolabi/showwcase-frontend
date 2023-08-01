"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getCookie } from "cookies-next";
import { ApiRoutes } from "../../routes";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import Sidebar from "../../components/layout/Sidebar";
import { IEducation } from "../../interfaces/IEducation";

const MainContainer = styled.main`
  display: flex;
  justify-content: center;
  height: 100vh;
`;

const RightColumn = styled.div`
  flex: 1;
`;

const EducationCard = styled.div`
  background-color: #999;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 40px;
  margin-bottom: 2rem;
  p {
    font-size: 16px;
    margin: 0;
  }
`;
/*
const UpdateButton = styled.button`
  background-color: #000;
  color: #fff;
  cursor: pointer;
  margin-right: 8px;
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #999;
  }
`;

const DeleteButton = styled.button`
  background-color: #000;
  color: #fff;
  cursor: pointer;
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #999;
  }
`;
*/
export default function Education() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [educationList, setEducationList] = useState<IEducation[]>([]);
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [field, setField] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [grade, setGrade] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const fetchEducationHistory = async () => {
      try {
        const token = getCookie("token");
        if (!token) {
          router.push("/");
          return;
        }
        const response = await axios.get(ApiRoutes.getAllHistory, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        setEducationList(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching education history:", error);
        setEducationList([]);
      }
    };

    fetchEducationHistory();
  }, [router]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const saveEducationHistory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newEducation: IEducation = {
      school,
      degree,
      field,
      startDate,
      endDate,
      grade,
      description,
    };

    const saveHistory = async () => {
      try {
        const token = getCookie("token");
        const response = await axios.post(
          ApiRoutes.saveHistory,
          {
            school: school,
            degree,
            field,
            start_date: startDate,
            end_date: endDate,
            grade,
            description,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        setEducationList([...educationList, newEducation]);

        setSchool("");
        setDegree("");
        setField("");
        setStartDate("");
        setEndDate("");
        setGrade("");
        setDescription("");

        handleCloseModal();

        // setCookie("token", response.data.token, { expires, sameSite: true });
        // setMessage(response.data.message);
        // setErrors([]);
        router.push("education");
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          setErrors(error.response.data.errors);
        } else {
          setMessage(error.response.data.message);
        }
      }
    };
    saveHistory();
  };

  const handleUpdateEducation = async (updatedEducation: IEducation) => {};

  const handleDeleteEducation = async (education: IEducation) => {
    try {
      const token = getCookie("token");
      const response = await axios.delete(
        ApiRoutes.deleteHistory + education.id,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setEducationList((prevList) =>
        prevList.filter((item) => item.id !== education.id)
      );

      console.log("Delete education item:", education);
    } catch (error) {
      console.error("Error deleting education history:", error);
    }
  };

  return (
    <>
      <Header handleOpenModal={handleOpenModal} />
      <MainContainer>
        <Sidebar educationList={educationList}></Sidebar>

        <RightColumn>
          {educationList.length > 0 ? (
            educationList.map((education, index) => (
              <EducationCard key={index}>
                <p style={{ fontSize: "22px", fontWeight: "bold" }}>
                  Institution Name: {education.school}
                </p>
                <p>Degree: {education.degree}</p>
                <p>Field: {education.field}</p>
                <p>Start Date: {education.startDate}</p>
                <p>End Date: {education.endDate}</p>
                <p>Grade: {education.grade}</p>
                <p>Description: {education.description}</p>
                <div>
                  <Button
                    type="button"
                    text="Update"
                    onClick={() => handleUpdateEducation(education)}
                  ></Button>
                  {/* <UpdateButton
                    onClick={() => handleUpdateEducation(education)}
                  >
                    Update
                  </UpdateButton> */}
                  <Button
                    type="button"
                    text="Delete"
                    onClick={() => handleDeleteEducation(education)}
                  ></Button>
                  {/* <DeleteButton
                    onClick={() => handleDeleteEducation(education)}
                  >
                    Delete
                  </DeleteButton> */}
                </div>
              </EducationCard>
            ))
          ) : (
            <p>No education details entered yet.</p>
          )}

          {showModal && (
            <Modal onClose={handleCloseModal}>
              <>
                <h1>New Education Modal</h1>
                <form onSubmit={saveEducationHistory}>
                  {message && <p>{message}</p>}
                  {errors.length > 0 && (
                    <p>
                      {errors.map((error, index) => (
                        <small
                          key={index}
                          style={{ display: "block", color: "#f44336" }}
                        >
                          {error.message}
                        </small>
                      ))}
                    </p>
                  )}

                  <label htmlFor="name">School</label>
                  <input
                    type="text"
                    id="name"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    required
                  />
                  <label htmlFor="name">Degree</label>
                  <input
                    type="text"
                    id="degree"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    required
                  />
                  <label htmlFor="name">Field</label>
                  <input
                    type="text"
                    id="field"
                    value={field}
                    onChange={(e) => setField(e.target.value)}
                    required
                  />
                  <label htmlFor="name">Start date</label>
                  <input
                    type="date"
                    id="start-date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                  <label htmlFor="name">End date</label>
                  <input
                    type="text"
                    id="end-date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                  <label htmlFor="name">Grade</label>
                  <input
                    type="text"
                    id="grade"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    required
                  />
                  <label htmlFor="name">Description</label>
                  <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                  <Button
                    type={"submit"}
                    text={"Save"}
                    onClick={() => {}}
                  ></Button>
                </form>
              </>
            </Modal>
          )}
        </RightColumn>
      </MainContainer>
    </>
  );
}
