import { createStyles } from "@mantine/core";
import styled from "styled-components";

export const useStyles = createStyles((theme) => ({
  form: {
    minHeight: "100vh"
  },
  header: {
    position: "sticky",
    top: 0,
    color: "rgb(193, 194, 197)",
    borderBottom: "1px solid #ff7145",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0
    }
  },
  table: {
    position: "relative"
  },

  scrolled: {
    boxShadow: theme.shadows.sm
  },
  body: {
    color: "black",
    overflow: "scroll"
  },
  headerText: {
    color: "#ff7145",
    fontSize: 18
  },
  rowText: {
    fontSize: 16
  },
  row: {
    cursor: "pointer"
  },
  messageCol: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: 300
  },
  th: {
    padding: "0 !important"
  },

  control: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0]
    }
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21
  }
}));

export const Header = styled.div`
  z-index: 5;
  background-color: white;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  position: sticky;
  top: 0;
`;

export const InputWrapper = styled.span`
  display: flex;
  flex-direction: column;
`;

export const InputLabel = styled.span`
  color: #ff7145;
  font-size: 16px;
  font-weight: bold;
`;

export const NoData = styled.div`
  display: flex;
  justify-content: center;
`;
