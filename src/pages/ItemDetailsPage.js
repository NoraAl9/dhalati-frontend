import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
// atoms
import alertAtom from "../recoil/atoms/alertAtom";
// material
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Box,
  Avatar,
  Stack,
} from "@mui/material";
// __apis__
import { itemDetailsRequest } from "../__apis__/items";
// components
import Header from "../components/Header";

// -----------------------------------------------------------------------------

function ItemDetailsPage() {
  const { id } = useParams();
  const [itemData, setItemData] = useState([]);
  const [fetching, setIsFetching] = useState(false);
  const setAlert = useSetRecoilState(alertAtom);

  const fetcher = useCallback(async () => {
    setIsFetching(true);
    await itemDetailsRequest(id)
      .then((response) => setItemData(response))
      .catch(() =>
        setAlert({
          show: true,
          message: "Something wrong happened while fetching item details.",
        })
      );
    setIsFetching(false);
  }, [id, setAlert]);

  useEffect(() => {
    fetcher();
  }, [fetcher]);

  return (
    <>
      <Header />
      <Container>
        <Grid container spacing={3} sx={{ pt: 6 }}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="h5" color="primary">
              Item details
            </Typography>
          </Grid>
          {fetching && (
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <CircularProgress />
              </Box>
            </Grid>
          )}
          {!fetching && (
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Avatar
                    variant="rounded"
                    src={itemData?.item_data && itemData?.item_data.image_url}
                    alt={itemData?.item_data && itemData?.item_data.ref_num}
                    sx={{ width: "300px", height: "300px" }}
                  />
                </Grid>
                {itemData.images &&
                  itemData?.images.map((image, index) => (
                    <Grid item xs={6} sm={4} md={2} lg={2} key={index}>
                      <Avatar
                        sx={{ width: "150px", height: "150px" }}
                        src={image}
                        alt={index}
                      />
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          )}
          {!fetching && (
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {Object.keys(itemData.item_data ? itemData?.item_data : {}).map(
                  (key, index) =>
                    !["image_url"].includes(key) && (
                      <Stack direction="row" alignItems="center" key={index}>
                        <Typography variant="h6" color="primary">
                          {key} :
                        </Typography>
                        <Typography sx={{ marginLeft: 1 }}>
                          {itemData?.item_data[key]}
                        </Typography>
                      </Stack>
                    )
                )}
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default ItemDetailsPage;
