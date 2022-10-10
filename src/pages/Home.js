import { useState, useEffect } from "react";
import checkForToken from "../utils/checkForToken";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { MdExitToApp, MdOutlineAddCircleOutline } from "react-icons/md";

import * as appointmentsApi from "../services/api/appointments";
import * as testsApi from "../services/api/tests";
import AppointmentList from "../components/AppointmentList";
import TestList from "../components/TestList";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const route = location.pathname;

  useEffect(() => {
    checkForToken(navigate, route, route);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [appointments, setAppointments] = useState([]);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const alertMessage =
      "Houve um erro ao buscar os dados no servidor, tente novamente mais tarde!";

    appointmentsApi
      .list()
      .then(({ data }) => {
        setAppointments(data);
      })
      .catch(() => alert(alertMessage));

    testsApi
      .list()
      .then(({ data }) => {
        setTests(data);
      })
      .catch(() => alert(alertMessage));
  }, []);

  const logout = () => {
    if (window.confirm("Você realmente quer sair?")) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  const createAppointment = () => {
    setLoading(true);
    const newAppointment = { title: "Nova consulta" };
    appointmentsApi
      .create(newAppointment)
      .then(({ data }) => {
        navigate(`/appointments/edit/${data.id}`);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const createTest = () => {
    setLoading(true);
    const newTest = { title: "Novo exame" };
    testsApi
      .create(newTest)
      .then(({ data }) => {
        navigate(`/tests/edit/${data.id}`);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <Container>
      <Content>
        <Header>
          <span>Meu histórico</span>
          <MdExitToApp
            color="#ffffff"
            size={32}
            onClick={logout}
            cursor="pointer"
          />
        </Header>
        <Title>
          <span>Consultas</span>
        </Title>
        <History>
          <AppointmentList
            appointments={appointments}
            setAppointments={setAppointments}
          />
        </History>
        <Title>
          <span>Exames</span>
        </Title>
        <History>
          <TestList tests={tests} setTests={setTests} />
        </History>
        <Obs>
          <span>
            *Clique no título do item para ver todos os dados da entrada
          </span>
        </Obs>
        <EntryBox>
          <AddEntry onClick={createAppointment} disabled={loading}>
            <MdOutlineAddCircleOutline color="#ffffff" size={22} />
            <Entry>Nova Consulta</Entry>
          </AddEntry>
          <AddEntry onClick={createTest} disabled={loading}>
            <MdOutlineAddCircleOutline color="#ffffff" size={22} />
            <Entry>Novo Exame</Entry>
          </AddEntry>
        </EntryBox>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 20px 30px 30px;
  border-radius: 4px;
  padding: 0 20px;
  background-color: #0d6e70;
  display: flex;
  flex-direction: column;
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

  span {
    max-width: 270px;
    white-space: nowrap;
  }
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #ffffff;
  font-size: 22px;
  font-weight: 700;
  align-items: center;
  margin-top: 18px;

  span {
    white-space: nowrap;
  }
`;

const History = styled.div`
  height: 170px;
  width: 100%;
  background: #ffffff;
  border-radius: 5px;
  margin-top: 13px;
  box-sizing: border-box;
  padding: 15px 15px;
  position: relative;
  overflow-y: auto;
`;

const Obs = styled.div`
  margin: 10px 0 5px;
  color: #fff;
  font-size: 14px;
  font-style: italic;
  text-align: center;
`;

const EntryBox = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 15px;
`;

const AddEntry = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #ffffff;
  font-size: 17px;
  font-weight: 700;
  background: #17c1d5;
  border-radius: 5px;
  height: 115px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: none;

  ion-icon {
    font-size: 22px;
  }
`;

const Entry = styled.span`
  word-break: break-word;
  width: 80px;
  text-align: left;
`;
