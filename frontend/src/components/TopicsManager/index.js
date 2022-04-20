import { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import { Wrapper, TopicsList, TopicsTitle, TopicsDescription, TopicWrapper, TopicElem, TopicElemClose, AddTopicBtn } from "./elements";
import Theme from "Theme"
import { getTopicsList } from "apiCalls/Topics"

export const TopicsManager = () => {
  const [topicsList, setTopicsList] = useState([]);

  useEffect(() => {
    getTopicsList()
      .then(res => {
        let newTopicsList = []
        res.topics.sort((a, b) => b.counter - a.counter)
        res.topics.forEach(topic => {
          newTopicsList.push({
            name: topic.name
          })
        })
        setTopicsList(newTopicsList)
      })
      .catch(err => {
        console.log("error ")
        console.log(err)
      })
  }, [])

  return (
    <Theme>
      <div style={{ justifyContent: "center", display: "flex" }}>
        <Wrapper>
          <TopicsTitle>Topics</TopicsTitle>
          <TopicsDescription>Here you have all you topics with the amount of times you wrote about them, this page has been made so that you could manage your topics.</TopicsDescription>
          <Divider variant="middle" sx={{ marginBottom: "10px" }} />
          <TopicsList>
            {
              topicsList.map((elem) => {
                return (
                  <TopicWrapper>
                    <TopicElem
                      key={elem.name}>
                      {elem.name}
                    </TopicElem>
                  </TopicWrapper>
                )
              })
            }
          </TopicsList>
        </Wrapper>
      </div>
    </Theme>
  )
}