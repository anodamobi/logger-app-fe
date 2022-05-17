import React, { useEffect, useState } from "react";
import { Table, UnstyledButton, Group, Text, Center } from "@mantine/core";
import { Selector, ChevronDown, ChevronUp } from "tabler-icons-react";
import { useFormik } from "formik";
import { Header, InputWrapper, useStyles } from "./index.styles";
import { Button, Input } from "../common/common.styles";
import { api } from "../../api";
import { useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import InfiniteScroll from "react-infinite-scroll-component";
import { DatePicker, Space } from "antd";
import LogsModal from "../../modals/LogsModal";

const LoggerTable = () => {
  const { classes, cx } = useStyles();
  const { projectName, env } = useParams();
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [sorting, setSorting] = useState(1);

  const { RangePicker } = DatePicker;

  const formik = useFormik({
    initialValues: {
      traceId: "",
      timestamp: { start: "", untilDate: "" },
      context: ""
    },
    onSubmit: (values) => {
      getLogs(values);
    }
  });

  function Th({ children, reversed, sorted, onSort }) {
    const { classes } = useStyles();
    const Icon = sorted ? (reversed ? ChevronUp : ChevronDown) : Selector;
    return (
      <th className={classes.th}>
        <UnstyledButton onClick={onSort} className={classes.control}>
          <Group position="apart">
            <Text weight={500} size="sm">
              {children}
            </Text>
            <Center className={classes.icon}>
              <Icon size={14} />
            </Center>
          </Group>
        </UnstyledButton>
      </th>
    );
  }

  const rows = logs.map((row) => (
    <tr
      className={cx(classes.row)}
      key={row}
      onClick={() => {
        setModalOpen(true);
        setModalData(row);
      }}>
      <td>
        <span className={cx(classes.rowText)}>{row.context}</span>
      </td>
      <td>
        <span className={cx(classes.rowText)}>{row.traceId}</span>
      </td>
      <td title={row.message} className={cx(classes.messageCol)}>
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
          env: env,
          context: values?.context,
          traceId: values?.traceId ? values.traceId : undefined,
          dateFrom: values?.timestamp.start
            ? format(new Date(values?.timestamp.start), "yyyy-MM-dd'T'hh:mm")
            : undefined,
          dateUntil: values?.timestamp.untilDate
            ? format(new Date(values?.timestamp.untilDate), "yyyy-MM-dd'T'hh:mm")
            : undefined,
          order: sorting
        }
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
          context: values?.context,
          dateFrom: values?.timestamp.start
            ? format(new Date(values?.timestamp.start), "yyyy-MM-dd'T'hh:mm")
            : undefined,
          dateUntil: values?.timestamp.untilDate
            ? format(new Date(values?.timestamp.untilDate), "yyyy-MM-dd'T'hh:mm")
            : undefined,
          page: page,
          limit: 25,
          order: sorting
        }
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
    <>
      <form onSubmit={formik.handleSubmit} className={cx(classes.form)}>
        <Header>
          <Button
            type="reset"
            onClick={() => {
              getLogs();
              formik.resetForm();
            }}>
            Reset logs
          </Button>
          <Button type="submit">Apply filters</Button>
        </Header>
        <InfiniteScroll
          dataLength={logs.length}
          next={() => loadMore(formik.values)}
          hasMore={true}>
          <Table className={cx(classes.table)} sx={{ minWidth: 700 }}>
            <thead className={cx(classes.header)}>
              <tr>
                <th>
                  <InputWrapper>
                    <span className={cx(classes.headerText)}>Context</span>
                    <Input
                      placeholder="Context"
                      id="context"
                      value={formik.values.context}
                      onChange={formik.handleChange}
                      autocomplete="off"
                    />
                  </InputWrapper>
                </th>
                <th>
                  <InputWrapper>
                    <span className={cx(classes.headerText)}>Trace Id</span>
                    <Input
                      placeholder="traceId"
                      id="traceId"
                      value={formik.values.traceId}
                      onChange={formik.handleChange}
                      autocomplete="off"
                    />
                  </InputWrapper>
                </th>
                <th>
                  <span className={cx(classes.headerText)}>Message</span>
                  <InputWrapper style={{ visibility: "hidden" }}>
                    <Input
                      placeholder="Context"
                      id="context"
                      value={formik.values.context}
                      onChange={formik.handleChange}
                      autocomplete="off"
                    />
                  </InputWrapper>
                </th>
                <Th
                  onSort={() => {
                    setSorting(sorting === 1 ? -1 : 1);
                    setLogs([]);
                    getLogs();
                  }}>
                  <InputWrapper>
                    <span className={cx(classes.headerText)}>Timestamp</span>
                    <Space>
                      <RangePicker
                        showTime={{ format: "HH:mm" }}
                        format="YYYY-MM-DD HH:mm"
                        onChange={(val) => {
                          if (!val) return;
                          const [start, end] = val;
                          formik.setFieldValue("timestamp", {
                            start: start._d,
                            untilDate: end._d
                          });
                        }}
                      />
                    </Space>
                  </InputWrapper>
                </Th>
              </tr>
            </thead>
            <tbody className={cx(classes.body)}>{rows}</tbody>
          </Table>
        </InfiniteScroll>
      </form>
      <LogsModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} data={modalData} />
    </>
  );
};

export default LoggerTable;
