import React, { useEffect, useState } from "react";
import { Table, ScrollArea } from "@mantine/core";
import { useFormik } from "formik";
import { Header, InputLabel, InputWrapper, useStyles } from "./index.styles";
import { Button, DatePicker, Input } from "../common/common.styles";
import { api } from "../../api";
import { useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import InfiniteScroll from "react-infinite-scroll-component";

const LoggerTable = () => {
  const { classes, cx } = useStyles();
  const { projectName, env } = useParams();
  const [scrolled, setScrolled] = useState(false);
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);

  const formik = useFormik({
    initialValues: {
      traceId: "",
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
        <span className={cx(classes.rowText)}>
          {new Date(new Date(row.timestamp).toUTCString()).getDate() +
            "-" +
            (new Date(new Date(row.timestamp).toUTCString()).getMonth() + 1) +
            "-" +
            new Date(new Date(row.timestamp).toUTCString()).getFullYear()}
        </span>
      </td>
    </tr>
  ));

  const getLogs = (values) => {
    api
      .get(`/logger`, {
        params: {
          project: projectName,
          env: env,
          traceId: values?.traceId ? values.traceId : undefined,
          dateFrom: values?.timestamp
            ? format(new Date(values.timestamp), "yyyy-MM-dd'T00:00'")
            : undefined,
          dateUntil: values?.timestamp
            ? format(new Date(values.timestamp), "yyyy-MM-dd'T23:59'")
            : undefined,
          page: page,
          limit: limit,
        },
      })
      .catch(() => {
        setLogs([]);
      })
      .then((r) => {
        setLogs(r.data);
      });
  };

  const loadMore = async (values) => {
    return api
      .get(`/logger`, {
        params: {
          project: projectName,
          traceId: values?.traceId ? values.traceId : undefined,
          dateFrom: values?.timestamp
            ? format(new Date(values.timestamp), "yyyy-MM-dd'T00:00'")
            : undefined,
          dateUntil: values?.timestamp
            ? format(new Date(values.timestamp), "yyyy-MM-dd'T23:59'")
            : undefined,
          page: page,
          limit: limit,
        },
      })
      .then((r) => {
        setLogs([...logs, ...r.data]);
        setPage(page + 1);
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
        <InputWrapper>
          <InputLabel>Trace Id</InputLabel>
          <Input
            placeholder="traceId"
            id="traceId"
            value={formik.values.traceId}
            onChange={formik.handleChange}
          />
        </InputWrapper>
        <InputWrapper>
          <InputLabel>Timestamp</InputLabel>
          <DatePicker
            selected={
              (formik.values.timestamp && new Date(formik.values.timestamp)) ||
              null
            }
            onChange={(val) => formik.setFieldValue("timestamp", val)}
          />
        </InputWrapper>
        <Button type="submit">Apply filters</Button>
      </Header>
      <InfiniteScroll
        dataLength={logs.length}
        next={() => loadMore(formik.values)}
        hasMore={true}
      >
        <Table className={cx(classes.table)} sx={{ minWidth: 700 }}>
          <thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
          >
            <tr>
              <th>
                <span className={cx(classes.headerText)}>Context</span>
              </th>
              <th>
                <span className={cx(classes.headerText)}>Trace Id</span>
              </th>
              <th>
                <span className={cx(classes.headerText)}>Message</span>
              </th>
              <th>
                <span className={cx(classes.headerText)}>Timestamp</span>
              </th>
            </tr>
          </thead>
          <tbody className={cx(classes.body)}>{rows}</tbody>
        </Table>
      </InfiniteScroll>
    </form>
  );
};

export default LoggerTable;
