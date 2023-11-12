import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import CardComponent from "../../components/CardComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useQueryParams from "../../hooks/useQueryParams";
import homePageNormalization from "../home/homePageNormalization";
import axios from "axios";
import ROUTES from "../../routes/ROUTES";
import { toast } from "react-toastify";

let initialDataFromServer = [];

const MyCardsPage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const navigate = useNavigate();
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const isAdmin = useSelector((bigPie) => bigPie.authSlice.isAdmin);
  const id = useSelector((bigPie) => bigPie.authSlice.id);

  useEffect(() => {
    axios
      .get(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards/`
      )
      .then(({ data }) => {
        if (userData) data = homePageNormalization(data, userData._id);
        initialDataFromServer = data;
        setDataFromServer(data);
      })
      .catch((err) => {
        toast.error(err.response.data, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  }, []);

  const handleDeleteCard = async (_id) => {
    try {
      const { data } = await axios.delete(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + _id
      );
      setDataFromServer((dataFromServerCopy) =>
        dataFromServerCopy.filter((card) => card._id !== _id)
      );
    } catch (err) {
      toast.error(err.response.data, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleEditCard = (_id) => {
    navigate(`${ROUTES.EDITCARD}/${_id}`);
  };

  return (
    <Container>
      <Grid sx={{ mt: 10 }} container spacing={2}>
        {dataFromServer.map((card) => (
          <Grid item key={card._id} xs={12} sm={6} md={4} lg={3}>
            <CardComponent
              _id={card._id}
              title={card.title}
              subTitle={card.subtitle}
              phone={card.phone}
              address={`${card.address.city}, ${card.address.street} ${card.address.houseNumber}`}
              img={card.image.url}
              alt={card.image.alt}
              description={card.description}
              web={card.web}
              email={card.email}
              state={card.address.state}
              country={card.address.country}
              zip={card.address.zip}
              like={card.likes}
              cardNumber={card.cardNumber}
              onDeleteCard={handleDeleteCard}
              onEditCard={handleEditCard}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MyCardsPage;
