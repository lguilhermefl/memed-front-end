import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";

import api from "../services/api/api";
import * as appointmentApi from "../services/api/appointments";
import checkForToken from "../utils/checkForToken";
import createConfig from "../utils/createConfig";

import FileList from "../components/FileList";

const capitalizeString = (string) => {
  const str = string.toLowerCase();
  return str[0].toUpperCase() + str.slice(1);
};

export default function Appointment() {
  const navigate = useNavigate();
  const location = useLocation();
  const route = location.pathname;

  useEffect(() => {
    checkForToken(navigate, route, route);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [appointment, setAppointment] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    appointmentApi
      .getById(id)
      .then(({ data }) => {
        setAppointment({ ...data, title: capitalizeString(data.title) });
      })
      .catch(() =>
        alert("Houve um problema com o servidor, tente novamente mais tarde!")
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteFile = async (e, id) => {
    e.preventDefault();
    setLoading(true);

    if (!window.confirm("Você realmente quer deletar este arquivo?")) {
      return setLoading(false);
    }
    const config = createConfig();

    await api.delete(`appointments/files/${id}`, config);

    setLoading(false);

    const updatedFiles = appointment.files.filter((file) => file.id !== id);
    setAppointment({ ...appointment, files: updatedFiles });
  };

  return (
    <Container>
      <Content>
        <Header>
          <span>{appointment?.title}</span>
        </Header>
        <Date>
          <span>Data: {dayjs(appointment?.date).format("DD/MM/YYYY")}</span>
        </Date>
        <Notes>
          <span>Anotações: {appointment?.notes}</span>
        </Notes>
        <SectionTitle>
          <span>Arquivos:</span>
        </SectionTitle>
        {appointment.files?.length === 0 ? (
          <NoFiles>
            <span>Sem arquivos até o momento</span>
          </NoFiles>
        ) : (
          <FileList files={appointment?.files} onDelete={deleteFile} />
        )}
        <Button
          backgroundColor="#17c1d5"
          onClick={() => navigate(`/appointments/edit/${appointment?.id}`)}
          disabled={loading}
        >
          Editar
        </Button>
        <Button
          backgroundColor="#95C2B3"
          onClick={() => navigate("/history")}
          disabled={loading}
        >
          Voltar
        </Button>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 20px 30px 17px;
  border-radius: 4px;
  background-color: #0d6e70;
  display: flex;
  flex-direction: column;
  gap: 13px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #ffffff;
  font-size: 26px;
  line-height: 30px;
  font-weight: 700;
  align-items: center;
  word-break: break-word;

  span {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Date = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  color: #ffffff;
  align-items: center;
  font-size: 22px;
  font-weight: 600;
`;

const Notes = styled.div`
  width: 100%;
  display: flex;
  color: #ffffff;
  align-items: center;
  font-size: 22px;
  font-weight: 600;
  word-break: break-word;

  span {
    display: -webkit-box;
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const SectionTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #ffffff;
  font-size: 22px;
  font-weight: 600;
  align-items: center;

  span {
    white-space: nowrap;
  }
`;

const NoFiles = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 25px 15px;

  span {
    width: 180px;
    font-weight: 400;
    font-size: 16px;
    color: #999;
    word-wrap: break-word;
    text-align: center;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  background: ${(props) => props.backgroundColor};
  border-radius: 5px;
  height: 45px;
  box-sizing: border-box;
  border: none;
`;
