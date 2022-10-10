import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";
import { MdOutlineEditNote, MdOutlineDeleteOutline } from "react-icons/md";

import * as appointmentApi from "../services/api/appointments";

const capitalizeString = (string) => {
  const str = string.toLowerCase();
  return str[0].toUpperCase() + str.slice(1);
};

export default function Appointment({
  appointment,
  appointments,
  setAppointments,
}) {
  const { id, title, date } = appointment;
  const formatedDate = dayjs(date).format("DD/MM/YY");
  const capitalizedTitle = capitalizeString(title);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const updateAppointments = () => {
    const updatedAppointments = appointments.filter(
      (appointmentItem) => appointmentItem.id !== id
    );
    setAppointments(updatedAppointments);
  };

  const deleteAppointment = () => {
    if (!window.confirm("Você realmente quer deletar esta consulta?")) {
      return;
    }

    appointmentApi
      .remove(id)
      .then(() => {
        updateAppointments();
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const editAppointment = () => {
    navigate(`/appointments/edit/${id}`);
  };

  const seeAppointmentDetails = () => {
    navigate(`/appointments/${id}`);
  };

  return (
    <AppointmentItem>
      <DateAndTitle>
        <Date>{formatedDate}</Date>
        <Title onClick={seeAppointmentDetails}>{capitalizedTitle}</Title>
      </DateAndTitle>
      <Icons>
        <MdOutlineEditNote
          color="#000000"
          size={26}
          onClick={editAppointment}
          cursor="pointer"
        />
        <MdOutlineDeleteOutline
          color="#000000"
          size={22}
          disabled={loading}
          onClick={deleteAppointment}
          cursor="pointer"
        />
      </Icons>
    </AppointmentItem>
  );
}

const AppointmentItem = styled.div`
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
  line-height: 18px;
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
