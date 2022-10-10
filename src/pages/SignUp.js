import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import checkForToken from "../utils/checkForToken";
import { signUp } from "../services/api/signUp";
import styled from "styled-components";

export default function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const route = location.pathname;

  useEffect(() => {
    checkForToken(navigate, route, "/history");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    repeat_password: "",
  });
  const [loading, setLoading] = useState(false);

  const createSignUpForm = () => {
    return (
      <>
        <input
          disabled={loading}
          required
          type="email"
          maxLength="40"
          placeholder="E-mail"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          disabled={loading}
          required
          type="password"
          minLength="6"
          maxLength="40"
          placeholder="Senha"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <input
          disabled={loading}
          required
          type="password"
          minLength="6"
          maxLength="40"
          placeholder="Confirme a senha"
          value={newUser.repeat_password}
          onChange={(e) =>
            setNewUser({ ...newUser, repeat_password: e.target.value })
          }
        />
        <Button disabled={loading}>
          {!loading ? "Cadastrar" : <ThreeDots color="#FFFFFF" />}
        </Button>
      </>
    );
  };

  const signUpSuccess = () => {
    setNewUser({
      name: "",
      email: "",
      password: "",
      repeat_password: "",
    });
    setLoading(false);
    navigate("/");
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    setLoading(true);

    const user = { ...newUser };

    signUp(user)
      .then(() => {
        signUpSuccess();
      })
      .catch(() => {
        alert("Houve um erro em seu cadastro, tente novamente por favor!");
        setLoading(false);
      });
  };

  const signUpForm = createSignUpForm();

  return (
    <Container>
      <Content>
        <Logo>MeMed</Logo>
        <Form onSubmit={handleSignUp}>{signUpForm}</Form>
        <Link to="/">
          <SignUpOrSignIn>Já tem uma conta? Entre agora!</SignUpOrSignIn>
        </Link>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 30px;
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  background-color: #0d6e70;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 32px;
  font-family: Saira Stencil One, sans-serif;
  font-weight: 400;
  margin-bottom: 30px;
  color: #ffffff;
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
`;

const SignUpOrSignIn = styled.div`
  margin-top: 35px;
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  background: #17c1d5;
  border-radius: 5px;
  height: 45px;
  box-sizing: border-box;
  border: none;
`;
