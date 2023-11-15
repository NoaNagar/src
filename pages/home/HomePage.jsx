import React, { useCallback, useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import CardComponent from "../../components/CardComponent";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import homePageNormalization from "./homePageNormalization";
import { useDispatch, useSelector } from "react-redux";
import useQueryParams from "../../hooks/useQueryParams";
import { toast } from "react-toastify";
import { addLikedCard } from "../../store/likedCards";
import { getToken } from "../../service/storageService";
import InfiniteScroll from "react-infinite-scroll-component";

let initialDataFromServer = [];
const cardsPerPage = 12;

const HomePage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleLoader, setVisibleLoader] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const query = useQueryParams();
  const dispatch = useDispatch();
  let token = getToken();
  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        if (userData) data = homePageNormalization(data, userData._id);
        initialDataFromServer = data;
        setDataFromServer(data);
        setVisibleCards(data.slice(0, cardsPerPage));
      })
      .catch((err) => {
        toast.error(err.response, {
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
  useEffect(() => {
    if (!initialDataFromServer.length) return;
    const filter = query.filter ? query.filter : "";
    setDataFromServer(
      initialDataFromServer.filter((card) => card.title.startsWith(filter))
    );
  }, [query, initialDataFromServer]);

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
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  const fetchMoreData = () => {
    // Show the loader text after a delay of 0.5 seconds
    setTimeout(() => {
      setVisibleLoader(true);
    }, 1000);

    // Fetch more data from the server and append it to visibleCards
    const startIndex = visibleCards.length;
    const endIndex = startIndex + cardsPerPage;

    // Simulate fetching data with a delay of 2 seconds (adjust as needed)
    setTimeout(() => {
      const newVisibleCards = dataFromServer.slice(startIndex, endIndex);
      setVisibleCards((prevVisibleCards) => [
        ...prevVisibleCards,
        ...newVisibleCards,
      ]);
      setVisibleLoader(false);
    }, 0); // Adjust the delay as needed
  };

  return (
    <Container sx={{ mt: 12 }}>
      <InfiniteScroll
        dataLength={visibleCards.length}
        next={fetchMoreData}
        hasMore={visibleCards.length < dataFromServer.length}
        loader={visibleLoader && <h4>Loading...</h4>} // Only show loader if visibleLoader is true
      >
        <Grid sx={{ mb: 2 }} container spacing={2}>
          {visibleCards.map((card) => (
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
                onFavCard={handleFavIcon}
              />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </Container>
  );
};

export default HomePage;
