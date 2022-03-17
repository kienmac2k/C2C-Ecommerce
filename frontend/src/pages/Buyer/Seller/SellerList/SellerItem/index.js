import React from "react";

import { styled } from "@mui/material/styles";
import {
  Card,
  CardMedia,
  Typography,
  CardContent,
  CardHeader,
  CardActions,
  Avatar,
  IconButton,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import ShopBgImage from "../../../../../assets/img/ShopImgBG.jpg";
import { Link } from "react-router-dom";

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const SellerItem = ({ data }) => {
  return (
    <SectionStyle>
      <CardHeader
        avatar={
          <Avatar sx={{ backgroundColor: "red" }} aria-label="recipe">
            {data.name.charAt(0)}
          </Avatar>
        }
        title={<Typography variant={"h4"}>{data.name}</Typography>}
      />
      <a href={`/shops/${data.id}`}>
        <CardMedia
          component="img"
          height="194"
          image={ShopBgImage}
          alt="Paella dish"
        />
      </a>
      <CardContent>
        <Typography variant="h5" color="text.secondary">
          {data.description}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          {data.address}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          {data.mobile}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </SectionStyle>
  );
};

export default SellerItem;
