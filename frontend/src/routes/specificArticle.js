import * as React from "react";
import {
  useParams,
} from "react-router-dom";
import styled from "styled-components"
import { useEffect, useState } from "react";
import { getArticleDetails } from "apiCalls/Articles";
import Navbar from "components/NavBar"
import { Typography } from "@mui/material";
import Theme from "Theme"
import HorizontalTopicList from "components/HorizontalTopicList";
import MiddlePageBackground from "components/MiddlePageBackground";
const moment = require('moment');

const TopicElem = styled.div(({ theme }) => `
  color: ${theme.colors.primary.textWhite};
  border-radius: 10px;
  font-size: 1.1rem;
  background: transparent;
  outline: none;
  border: solid .1rem;
  margin: 5px;
  padding-right: 10px;
  padding-left: 10px;
  cursor: auto;

`)


export default function SpecificArticle() {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true)
  const [article, setArticle] = useState({});

  useEffect(() => {
    getArticleDetails(id)
      .then((res) => {
        setArticle(res.article);
        setLoading(false)
        console.log(res.article)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  function loadingRender() {
    return (
      <div>
        <Typography variant="h4" sx={{ color: "white" }}>Loading...</Typography>
      </div>
    )
  }

  function notLoadingRender() {
    return (
      <>
        <Typography
          variant="h5"
          sx={{
            color: "white",
            marginTop: "10px",
            textDecoration: "underline"
          }}>
          {moment(new Date(article.date)).format("DD MMMM YYYY")}
        </Typography>
        <HorizontalTopicList style={{ marginTop: "10px" }}>
          {
            article.topics.map((elem) => {
              return (
                <TopicElem key={elem}>{elem}</TopicElem>
              )
            })
          }
        </HorizontalTopicList>
        <Typography sx={{ color: "white", margin: "20px" }} style={{ wordWrap: "break-word" }} align="center">{article.text}</Typography>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <Theme>
        <div style={{ justifyContent: "center", display: "flex" }}>
          <MiddlePageBackground style={{alignItems: "center"}}>
            {isLoading ? loadingRender() : notLoadingRender()}
          </MiddlePageBackground>
        </div>
      </Theme>
    </>
  );
}