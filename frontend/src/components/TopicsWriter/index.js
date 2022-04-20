import { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import { Wrapper, TopicsList, TopicsTitle, TopicElem, TopicElemClose, AddTopicBtn } from "./elements";
import Theme from "Theme"
import { getTopicsList } from "apiCalls/Topics"

const TopicsWriter = () => {
  const [topicsList, setTopicsList] = useState([]);

  useEffect(() => {
    console.log("useEffect")
    getTopicsList()
      .then(res => {
        let newTopicsList = []
        res.topics.sort((a, b) => b.counter - a.counter)
        res.topics.forEach(topic => {
          newTopicsList.push({
            name: topic.name,
            selected: false,
          })
        })
        setTopicsList(newTopicsList)
      })
      .catch(err => {
        console.log("error ")
        console.log(err)
      })
  }, [])

  function toggleTopic(topic) {
    let toChange = topicsList.find(elem => elem.name === topic.name)
    if (toChange === undefined)
      return;
    toChange.selected = !topic.selected;
    setTopicsList([...topicsList])
  }
  console.log("rerender")

  return (
    <Theme>
      <div style={{ justifyContent: "center", display: "flex" }}>
        <Wrapper>
          <TopicsTitle>What do you want to write about today ?</TopicsTitle>
          <Divider variant="middle" sx={{ marginBottom: "10px" }} />
          <TopicsList>
            {
              topicsList.map((elem) => {
                return (
                  <TopicElem
                    key={elem.name}
                    selected={elem.selected}
                    onClick={() => toggleTopic(elem)}>
                    {elem.name}
                    <TopicElemClose selected={elem.selected}>x</TopicElemClose>
                  </TopicElem>
                )
              })
            }
            <div style={{ display: "flex", alignItems: "center" }}>
              <AddTopicBtn to="/topics">New</AddTopicBtn>
            </div>
          </TopicsList>
          <Divider variant="middle" sx={{ marginTop: "10px", marginBottom: "10px" }} />
        </Wrapper>
      </div>
    </Theme>
  )
}

export default TopicsWriter;