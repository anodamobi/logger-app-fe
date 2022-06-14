import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import { Input, SubmitButton, Wrapper } from "./index.styles";

const LoginForm = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      pin: ""
    },
    onSubmit: (values) => {
      api
        .get("/auth", {
          headers: {
            "x-access-token": values.pin
          }
        })
        .then((res) => {
          localStorage.setItem("token", res.auth.jwt);
          navigate("/", { replace: true });
        });
    }
  });

  return (
    <Wrapper onSubmit={formik.handleSubmit}>
      <Input
        id="pin"
        value={formik.values.pin}
        onChange={formik.handleChange}
        placeholder="PIN code"
      />
      <SubmitButton type="submit">Log in</SubmitButton>
    </Wrapper>
  );
};

export default LoginForm;
