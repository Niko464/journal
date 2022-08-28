import Navbar from "components/NavBar"
import * as cookies from "Cookies"
import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getServerArticles } from "apiCalls/Articles"
import MiddlePageBackground from "components/MiddlePageBackground"
import Theme from "Theme"
import styled from "styled-components"
import { Divider } from "@mui/material"
import Title from "components/Title"
import TopicFilter from "components/TopicFilter";
import { getTopicsList } from "apiCalls/Topics"
import TopicDateFilter from "components/TopicDateFilter"
import BtnOne from "components/Buttons/BtnOne"
const moment = require("moment")

const HistoryElement = styled(Link)(({ theme }) => `
  color: ${theme.colors.primary.textWhite};
  margin: 5px 10px 10px 10px;
`)

export default function HistoryPage() {
  const navigate = useNavigate()
  const [articles, setArticles] = useState([])
  const [allTopics, setAllTopics] = useState([])
  const [selectedTopics, setSelectedTopics] = useState([])
  const [filterdArticles, setFilteredArticles] = useState([])
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  useEffect(() => {
    if (!cookies.doesUserHaveCookie())
      navigate("/login")
  }, [])

  useEffect(() => {
    getServerArticles()
      .then(res => {
        setArticles(res.articles)
        setFilteredArticles(res.articles)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    getTopicsList()
      .then((res) => {
        setAllTopics(res.topics.map((topic) => topic.name))
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  function filterArticles() {
    let filterdArticles = articles.filter((article) => {
      const articleDate = new Date(article.date)
      if (articleDate < startDate || articleDate > endDate)
        return false
      if (selectedTopics.length === 0)
        return true
      let hasSelectedTopics = false
      article.topics.forEach((topic) => {
        if (selectedTopics.includes(topic))
          hasSelectedTopics = true
      })
      return hasSelectedTopics
    })
    
    setFilteredArticles(filterdArticles)
  }

  return (
    <Theme>
      <Navbar />
      <div style={{ justifyContent: "center", display: "flex" }}>
        <MiddlePageBackground>
          <Title>Filters</Title>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <TopicFilter allTopics={allTopics} selectedTopics={selectedTopics} setSelectedTopics={setSelectedTopics} />
            <Divider variant="middle" orientation="vertical" flexItem />
            <TopicDateFilter startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}/>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <BtnOne
              onClick={filterArticles}>
              Filter
            </BtnOne>
          </div>
          <Divider variant="middle" sx={{ marginBottom: "10px", marginTop: "10px" }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
            {
              filterdArticles.map(article => {
                return (
                  <HistoryElement key={article.id} to={`/article/${article.id}`}>
                    {moment(new Date(article.date)).format("DD MMMM YYYY")}: {article.topics.join(', ')}
                  </HistoryElement>
                )
              })
            }
          </div>
        </MiddlePageBackground>
      </div>
    </Theme>
  )
}