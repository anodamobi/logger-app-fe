import React, { useEffect, useState } from "react";
import { Table, ScrollArea } from "@mantine/core";
import { useFormik } from "formik";
import { Header, useStyles } from "./index.styles";
import { Button, Input } from "../common/common.styles";
import { api } from "../../api";
import { useParams } from "react-router-dom";

const LoggerTable = () => {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const { projectName } = useParams();
  const [logs, setLogs] = useState([]);

  const formik = useFormik({
    initialValues: {
      context: "",
      traceId: "",
      message: "",
      timestamp: "",
    },
    onSubmit: (values) => {
      getLogs(values);
    },
  });

  const rows = logs.map((row) => (
    <tr className={cx(classes.row)} key={row}>
      <td>
        <span className={cx(classes.rowText)}>{row.context}</span>
      </td>
      <td>
        <span className={cx(classes.rowText)}>{row.traceId}</span>
      </td>
      <td>
        <span className={cx(classes.rowText)}>{row.message}</span>
      </td>
      <td>
        <span className={cx(classes.rowText)}>{row.timestamp}</span>
      </td>
    </tr>
  ));

  const getLogs = (values) => {
    api
      .get(`/logger`, {
        params: {
          project: projectName,
          traceId: values ? values.traceId : undefined,
        },
      })
      .catch(() => {
        setLogs([]);
      })
      .then((r) => {
        setLogs(r.data);
      });
  };

  useEffect(() => {
    getLogs();
  }, []);

  return (
    <form onSubmit={formik.handleSubmit} className={cx(classes.form)}>
      <Header>
        <Button type="button" onClick={() => getLogs()}>
          Reset logs
        </Button>
        <Button type="submit">Apply filters</Button>
      </Header>
      <ScrollArea
        sx={{ height: "calc(100vh - 55px)" }}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table sx={{ minWidth: 700 }}>
          <thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
          >
            <tr>
              <th>
                <span className={cx(classes.headerText)}>Context</span>
                <Input
                  id="context"
                  value={formik.values.context}
                  onChange={formik.handleChange}
                />
              </th>
              <th>
                <span className={cx(classes.headerText)}>Trace Id</span>
                <Input
                  id="traceId"
                  value={formik.values.traceId}
                  onChange={formik.handleChange}
                />
              </th>
              <th>
                <span className={cx(classes.headerText)}>Message</span>
                <Input
                  id="message"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                />
              </th>
              <th>
                <span className={cx(classes.headerText)}>Timestamp</span>
                <Input
                  id="timestamp"
                  value={formik.values.timestamp}
                  onChange={formik.handleChange}
                />
              </th>
            </tr>
          </thead>
          <tbody className={cx(classes.body)}>{rows}</tbody>
        </Table>
      </ScrollArea>
    </form>
  );
};

export default LoggerTable;
