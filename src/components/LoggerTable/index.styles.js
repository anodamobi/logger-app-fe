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
  table: {
    position: "relative",
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
  body: {
    color: "rgb(193, 194, 197)",
    overflow: "scroll",
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
  z-index: 5;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: rgb(26, 27, 30);
  position: sticky;
  top: 0;
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
