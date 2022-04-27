import { createStyles } from "@mantine/core";
import styled from "styled-components";

export const useStyles = createStyles((theme) => ({
  form: {
    minHeight: "100vh",
  },
  header: {
    position: "sticky",
    top: 0,
    backgroundColor: theme.colors.dark[7],
    transition: "box-shadow 150ms ease",
    color: "rgb(193, 194, 197)",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${theme.colors.dark[3]}`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
  body: {
    color: "rgb(193, 194, 197)",
  },
  headerText: {
    color: "rgb(255, 212, 59)",
    fontSize: 18,
  },
  rowText: {
    fontSize: 16,
  },
}));

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
`;

export const InputWrapper = styled.span`
  display: flex;
  flex-direction: column;
`;

export const InputLabel = styled.span`
  color: rgb(255, 212, 59);
  font-size: 16px;
  font-weight: bold;
`;
