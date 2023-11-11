import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const CardComponent = ({
  _id,
  title,
  subTitle,
  phone,
  address,
  img,
  alt,
  description,
  web,
  email,
  state,
  country,
  zip,
  like,
  cardNumber,
  onDeleteCard,
  onEditCard,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);
  const isAdmin = useSelector((bigPie) => bigPie.authSlice.isAdmin);
  const search = useLocation();

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };
  const handleDeleteCardClick = () => {
    onDeleteCard(_id);
  };
  const handleClickEditCard = () => {
    onEditCard(_id);
  };
  const myCardPage = false;
  if (search.pathname === "/mycard") {
    myCardPage = true;
  }
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          image={img}
          alt={alt}
          sx={{ height: "170px" }}
        />
      </CardActionArea>
      <CardContent>
        <CardHeader title={title} subheader={subTitle} sx={{ p: 0, mb: 1 }} />
        <Divider />
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">
            <Typography fontWeight="700" variant="subtitle1" component="span">
              Phone:{" "}
            </Typography>
            {phone}
          </Typography>
          <Typography variant="body2">
            <Typography fontWeight="700" variant="subtitle1" component="span">
              Address:{" "}
            </Typography>
            {address}
          </Typography>
          {isOpen && (
            <Box>
              <Typography variant="body2">
                <Typography
                  fontWeight="700"
                  variant="subtitle1"
                  component="span"
                >
                  descraption:
                </Typography>
                {description}
              </Typography>
              <Typography variant="body2">
                <Typography
                  fontWeight="700"
                  variant="subtitle1"
                  component="span"
                >
                  email:
                </Typography>
                {email}
              </Typography>
              <Typography variant="body2">
                <Typography
                  fontWeight="700"
                  variant="subtitle1"
                  component="span"
                >
                  web:
                </Typography>
                {web}
              </Typography>
              <Typography variant="body2">
                <Typography
                  fontWeight="700"
                  variant="subtitle1"
                  component="span"
                >
                  state:
                </Typography>
                {state}
              </Typography>
              <Typography variant="body2">
                <Typography
                  fontWeight="700"
                  variant="subtitle1"
                  component="span"
                >
                  country:
                </Typography>
                {country}
              </Typography>
              <Typography variant="body2">
                <Typography
                  fontWeight="700"
                  variant="subtitle1"
                  component="span"
                >
                  zip:
                </Typography>
                {zip}
              </Typography>
            </Box>
          )}
        </Box>
        <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
          <Box>
            <IconButton>
              <PhoneIcon />
            </IconButton>
            {myCardPage && (
              <IconButton onClick={handleClickEditCard}>
                <CreateIcon />
              </IconButton>
            )}
          </Box>
          <Box>
            {myCardPage && (
              <IconButton onClick={handleDeleteCardClick}>
                <DeleteIcon />
              </IconButton>
            )}
            {isAdmin && (
              <IconButton onClick={handleDeleteCardClick}>
                <DeleteIcon />
              </IconButton>
            )}
            {loggedIn && (
              <IconButton>
                <FavoriteIcon color={like ? "favActive" : "black"} />
              </IconButton>
            )}
          </Box>
        </Box>
      </CardContent>
      <Button size="small" sx={{ ml: "10px", mb: "10px" }} onClick={toggleCard}>
        {isOpen ? "close" : "learn more"}
      </Button>
    </Card>
  );
};
CardComponent.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  phone: PropTypes.string,
  address: PropTypes.string,
  img: PropTypes.string,
  alt: PropTypes.string,
  // like: PropTypes.bool,
  cardNumber: PropTypes.number,
  onDeleteCard: PropTypes.func.isRequired,
  onEditCard: PropTypes.func.isRequired,
};
CardComponent.defaultProps = {
  img: "https://www.livemint.com/lm-img/img/2023/08/14/1600x900/garena_free_fire_max_1688877791610_1691982307589.jpg",
  alt: "running",
};

export default CardComponent;
