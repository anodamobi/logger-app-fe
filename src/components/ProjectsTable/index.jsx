import React, { useEffect, useState } from "react";
import { createStyles, Table, ScrollArea } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";

const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
    transition: "box-shadow 150ms ease",
    color: "black",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid #ff7145`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
  body: {
    color: "black",
  },
  row: {
    cursor: "pointer",
  },
  headerText: {
    color: "#ff7145",
    fontSize: 18,
  },
  rowText: {
    fontSize: 16,
  },
}));

const ProjectTable = () => {
  const { classes, cx } = useStyles();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [projects, setProjects] = useState([]);

  const rows = projects.map((row) => (
    <tr
      className={cx(classes.row)}
      onClick={() => navigate(`/projects/${row}`)}
      key={row}
    >
      <td>
        <span className={cx(classes.rowText)}>{row}</span>
      </td>
    </tr>
  ));

  useEffect(() => {
    api.get("/logger/projects").then((res) => {
      setProjects(res.projects);
    });
  }, []);

  return (
    <ScrollArea
      sx={{ height: 300 }}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table sx={{ minWidth: 700 }}>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>
              <span className={cx(classes.headerText)}>Project Name</span>
            </th>
          </tr>
        </thead>
        <tbody className={cx(classes.body)}>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};

export default ProjectTable;
