import styled from "styled-components";
import Picker from "react-datepicker";

export const Button = styled.button`
  border: 1px solid rgb(34, 139, 230);
  color: rgb(34, 139, 230);
  padding: 10px;
  border-radius: 5px;
  background-color: inherit;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
`;

export const Input = styled.input`
  border: 1px solid rgb(34, 139, 230);
  color: black;
  padding: 15px 2px;
  border-radius: 5px;
  background-color: inherit;
  font-size: 16px;
  cursor: pointer;
  max-height: 20px;
  align-items: center;

  &:focus {
    outline: none;
  }
`;

export const DatePicker = styled(Picker)`
  border: 1px solid rgb(34, 139, 230);
  color: rgb(193, 194, 197);
  padding: 5px 2px;
  border-radius: 5px;
  background-color: inherit;
  cursor: pointer;
  max-height: 20px;
  font-size: 16px;
  height: 100%;

  &:focus {
    outline: none;
  }
`;
