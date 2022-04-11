import React from "react";
// material
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardActions,
} from "@mui/material";
// components
import noImage from "../assets/noImage.jpg";
import { useNavigate } from "react-router-dom";

// --------------------------------------------------

function Item({ itemId, itemTitle, itemImage }) {
  const navigate = useNavigate();

  return (
    <Card>
      <CardMedia
        component="img"
        height="240"
        width="240"
        image={itemImage ? itemImage : noImage}
        alt="image"
        sx={{ objectFit: "contain" }}
      />
      <CardContent>
        <Typography gutterBottom variant="subtitle2">
          {itemTitle}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => navigate(`/item-details/${itemId}`)}
          sx={{ marginLeft: "auto" }}
        >
          View more
        </Button>
      </CardActions>
    </Card>
  );
}

export default Item;
