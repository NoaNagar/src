import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import CardComponent from "../../components/CardComponent";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import homePageNormalization from "../home/homePageNormalization";
import { useDispatch, useSelector } from "react-redux";
import useQueryParams from "../../hooks/useQueryParams";
import { toast } from "react-toastify";
import { addLikedCard } from "../../store/likedCards";
import { getToken } from "../../service/storageService";

let initialDataFromServer = [];

const FavPageComponent = () => {
  const token = getToken();
  const [dataFromServer, setDataFromServer] = useState([]);
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        if (userData) data = homePageNormalization(data, userData._id);
        setDataFromServer(data.filter((card) => card.likes === true));
      })
      .catch((err) => {
        console.error("Error fetching favorite cards:", err);
        toast.error("Looks like there is a problem with the server...");
      });
  }, [userData]);

  const handleClickFavCard = async (_id, like) => {
    try {
      setDataFromServer((prevData) => {
        return prevData.map((card) => {
          if (card._id === _id) {
            return {
              ...card,
              likes: !like,
            };
          }
          return card;
        });
      });

      const response = await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${_id}`,
        {
          like: !like,
        },
        {
          headers: {
            "x-auth-token": `${token}`,
          },
        }
      );

      if (response.data.success) {
        throw new Error("Failed to update like status");
      }

      const likedCardsResponse = await axios.get("/cards");
      if (userData) {
        likedCardsResponse.data = homePageNormalization(
          likedCardsResponse.data,
          userData._id
        );
      }

      setDataFromServer(
        likedCardsResponse.data.filter((card) => card.likes === true)
      );
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  const handleEditCard = (_id) => {
    navigate(`${ROUTES.EDITCARD}/${_id}`);
  };
  const handleFavIcon = async (_id, like) => {
    try {
      const response = await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${_id}`,
        {
          like: !like,
        },
        {
          headers: {
            "x-auth-token": `${token}`,
          },
        }
      );

      if (response.data.success) {
        dispatch(addLikedCard({ _id, like: !like }));
      }
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

  return (
    <Container sx={{ mt: 12 }}>
      <Grid sx={{ mb: 2 }} container spacing={2}>
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
              onEditCard={handleEditCard}
              onFavCard={handleClickFavCard}
              onDeleteCard={handleDeleteCard}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FavPageComponent;
