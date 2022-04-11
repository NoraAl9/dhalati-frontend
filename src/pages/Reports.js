import React, { useEffect, useCallback, useState } from "react";
// atoms
import alertAtom from "../recoil/atoms/alertAtom";
// material
import { Box, Chip, Container, Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
// __apis__
import { reportsRequest } from "../__apis__/reports";
// components
import Header from "../components/Header";
import { useSetRecoilState } from "recoil";

function Reports() {
  const [reports, setReports] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [fetching, setIsFetching] = useState(false);
  const setAlert = useSetRecoilState(alertAtom);

  const fetcher = useCallback(async () => {
    setIsFetching(true);
    await reportsRequest()
      .then((response) => setReports(response))
      .catch(() =>
        setAlert({
          show: true,
          message: "Something wrong happened while fetching reports.",
          variant: "error",
        })
      );
    setIsFetching(false);
  }, [setAlert]);

  const columns = [
    { field: "user", headerName: "User", flex: 1 },
    { field: "refNum", headerName: "Ref Number", flex: 1 },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      renderCell: (params) => (
        <Chip
          sx={{ backgroundColor: "red", color: "white" }}
          label={params.value}
          variant="contained"
        />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          color={params.value ? "primary" : "error"}
          variant="outlined"
          label={params.value ? "Closed" : "In progress"}
        />
      ),
    },
    {
      field: "timestamp",
      headerName: "Timestamp",
      flex: 1,
    },
  ];

  useEffect(() => {
    fetcher();
  }, [fetcher]);

  useEffect(() => {
    if (reports.length > 0) {
      const mappedReports = reports.map((report) => ({
        id: report.id,
        user: report.user_phone_number,
        refNum: report.ref_num,
        type: report.type,
        status: report.is_closed,
        timestamp: report.created_at,
      }));
      setTableRows(mappedReports);
    }
  }, [reports]);

  return (
    <>
      <Header />
      <Container>
        <Grid container spacing={3} sx={{ pt: 6 }}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="h5" color="red">
              Reports
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box height={400}>
              <DataGrid rows={tableRows} columns={columns} loading={fetching} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Reports;
