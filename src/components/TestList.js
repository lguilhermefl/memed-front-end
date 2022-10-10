import styled from "styled-components";

import Test from "./Test";

export default function AppointmentList({ tests, setTests }) {
  const createAppointmentList = () => {
    if (tests?.length === 0) {
      return (
        <NoRecords>
          <span>Não há registros de exames ainda</span>
        </NoRecords>
      );
    } else {
      return (
        <Container>
          {tests?.map((test) => (
            <li key={test.id}>
              <Test test={test} tests={tests} setTests={setTests} />
            </li>
          ))}
        </Container>
      );
    }
  };

  const appointmentList = createAppointmentList();
  return <>{appointmentList}</>;
}

const NoRecords = styled.div`
  position: absolute;
  width: 180px;
  text-align: center;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  span {
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #868686;
    word-wrap: break-word;
  }
`;

export const Container = styled.ul`
  li {
    display: flex;
    justify-content: space-between;
    color: #000000;

    & + li {
      margin-top: 8px;
    }

    div {
      display: flex;
    }
  }
`;
