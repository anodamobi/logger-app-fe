import styled from "styled-components";

export const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

export const Input = styled.input`
  border: thin solid rgb(255, 212, 59);
  background: inherit;
  color: #fff;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 40px;

  &:focus {
    outline: none;
  }
`;

export const SubmitButton = styled.button`
  background-color: inherit;
  border: thin solid rgb(255, 212, 59);
  color: rgb(255, 212, 59);
  font-size: 22px;
  border-radius: 5px;
  font-weight: bold;
  padding: 7px 0;
`;
