import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";
import { MdOutlineEditNote, MdOutlineDeleteOutline } from "react-icons/md";

import * as testApi from "../services/api/tests";

const capitalizeString = (string) => {
  const str = string.toLowerCase();
  return str[0].toUpperCase() + str.slice(1);
};

export default function Appointment({ test, tests, setTests }) {
  const { id, title, date } = test;
  const formatedDate = dayjs(date).format("DD/MM/YY");
  const capitalizedTitle = capitalizeString(title);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const updateTests = () => {
    const updatedTests = tests.filter((testItem) => testItem.id !== id);
    setTests(updatedTests);
  };

  const deleteTest = () => {
    if (!window.confirm("Você realmente quer deletar esta consulta?")) {
      return;
    }

    testApi
      .remove(id)
      .then(() => {
        updateTests();
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const editTest = () => {
    navigate(`/tests/edit/${id}`);
  };

  const seeTestDetails = () => {
    navigate(`/tests/${id}`);
  };

  return (
    <TestItem>
      <DateAndTitle>
        <Date>{formatedDate}</Date>
        <Title onClick={seeTestDetails}>{capitalizedTitle}</Title>
      </DateAndTitle>
      <Icons>
        <MdOutlineEditNote
          color="#000000"
          size={26}
          onClick={editTest}
          cursor="pointer"
        />
        <MdOutlineDeleteOutline
          color="#000000"
          size={22}
          disabled={loading}
          onClick={deleteTest}
          cursor="pointer"
        />
      </Icons>
    </TestItem>
  );
}

const TestItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
`;

const Date = styled.span`
  color: #c6c6c6;
`;

const Title = styled.span`
  color: #000000;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
`;

const DateAndTitle = styled.div`
  display: flex;
  gap: 10px;
  max-width: 80%;
`;

const Icons = styled.div`
  display: flex;
  gap: 8px;
`;
