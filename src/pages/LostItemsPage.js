import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
// atoms
import alertAtom from "../recoil/atoms/alertAtom";
// material
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
// __apis__
import { lostItemsRequest } from "../__apis__/items";
// components
import Header from "../components/Header";
import Item from "../components/Item";

// --------------------------------------------------------

function LostItemsPage() {
  const [lostItems, setLostItems] = useState([]);
  const [fetching, setIsFetching] = useState(false);
  const setAlert = useRecoilState(alertAtom)[1];

  const fetcher = useCallback(async () => {
    setIsFetching(true);
    await lostItemsRequest()
      .then((response) => setLostItems(response))
      .catch(() =>
        setAlert({
          show: true,
          message: "Something wrong happened while fetching lost items",
          variant: "error",
        })
      );
    setIsFetching(false);
  }, [setAlert]);

  useEffect(() => {
    fetcher();
  }, [fetcher]);

  return (
    <>
      <Header />
      <Container>
        <Grid container spacing={3} sx={{ pt: 6 }}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="h5" color="#2f575c">
              Lost Items
            </Typography>
          </Grid>
          {fetching && (
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress />
              </Box>
            </Grid>
          )}
          {!fetching && (
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Grid container spacing={3} paddingTop={4}>
                {lostItems.map((item, index) => (
                  <Grid item md={4} key={index}>
                    <Item
                      itemId={item?.report_item?.id}
                      itemTitle={item?.report.ref_num}
                      itemImage={item?.report_item.image_url}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default LostItemsPage;
