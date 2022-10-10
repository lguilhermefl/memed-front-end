import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import checkForToken from "../utils/checkForToken";
import dayjs from "dayjs";
import styled from "styled-components";

import api from "../services/api/api";
import * as appointmentApi from "../services/api/appointments";
import FileList from "../components/FileList";
import UploadBox from "../components/UploadBox";

import createConfig from "../utils/createConfig";

export default function EditAppointment() {
  const navigate = useNavigate();
  const location = useLocation();
  const route = location.pathname;

  useEffect(() => {
    checkForToken(navigate, route, route);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [appointment, setAppointment] = useState({
    title: "",
    date: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const apiUploadFileUrl = `/appointments/files/${id}`;
  const apiDeleteFileUrl = "/appointments/files";

  useEffect(() => {
    appointmentApi
      .getById(id)
      .then(({ data }) => {
        setAppointment({
          ...data,
          date: dayjs(data.date).format("YYYY-MM-DD"),
        });
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateAppointment = (e) => {
    e.preventDefault();

    setLoading(true);
    const { title, notes } = appointment;

    const updatedAppointment = {
      title,
      notes,
      date: dayjs(appointment.date).toISOString(),
    };
    const id = appointment.id;

    appointmentApi
      .update(id, updatedAppointment)
      .then(() => {
        setLoading(false);
        navigate("/history");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

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

  const createAppointmentForm = () => {
    return (
      <>
        <input
          disabled={loading}
          required
          type="text"
          maxLength="20"
          placeholder="Nome do exame"
          value={appointment.title}
          onChange={(e) =>
            setAppointment({ ...appointment, title: e.target.value })
          }
        />
        <input
          disabled={loading}
          type="date"
          value={appointment.date}
          onChange={(e) =>
            setAppointment({ ...appointment, date: e.target.value })
          }
        />
        <textarea
          disabled={loading}
          placeholder="Anotações"
          rows="5"
          value={appointment.notes}
          onChange={(e) =>
            setAppointment({ ...appointment, notes: e.target.value })
          }
        />
        <SectionTitle>
          <span>Arquivos</span>
        </SectionTitle>
        {appointment.files?.length === 0 ? (
          <NoFiles>
            <span>Sem arquivos até o momento</span>
          </NoFiles>
        ) : (
          <FileList files={appointment?.files} onDelete={deleteFile} />
        )}
        <SectionTitle>
          <span>Upload</span>
        </SectionTitle>
        <UploadBox
          apiUploadFileUrl={apiUploadFileUrl}
          apiDeleteFileUrl={apiDeleteFileUrl}
          setLoading={setLoading}
        />
        <Button backgroundColor="#17c1d5" disabled={loading}>
          {!loading ? "Salvar consulta" : <ThreeDots color="#FFFFFF" />}
        </Button>
      </>
    );
  };

  const appointmentForm = createAppointmentForm();

  return (
    <Container>
      <Content>
        <Header>
          <span>Criar/editar consulta</span>
        </Header>
        <Form marginTop="40px" onSubmit={updateAppointment}>
          {appointmentForm}
        </Form>
        <Button
          backgroundColor="#FE6D6A"
          disabled={loading}
          onClick={() => navigate("/history")}
        >
          {!loading ? "Cancelar" : <ThreeDots color="#FFFFFF" />}
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 13px;
  width: 100%;
  margin-top: ${(props) => props.marginTop};

  input {
    background: #ffffff;
    border-radius: 5px;
    height: 58px;
    box-sizing: border-box;
    font-size: 20px;
    padding: 0 15px;
    color: #000000;
    border: none;
    outline: none;
  }

  textarea {
    background: #ffffff;
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 20px;
    padding: 15px;
    color: #000000;
    border: none;
    outline: none;
  }
`;

const SectionTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #ffffff;
  font-size: 22px;
  font-weight: 700;
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
  margin-bottom: 13px;
`;
