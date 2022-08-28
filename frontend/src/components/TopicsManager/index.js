import { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import { TopicWrapper, TopicElem, TopicElemDel, TextBox } from "./elements";
import Theme from "Theme"
import { getTopicsList, createServerSideTopic, deleteServerSideTopic } from "apiCalls/Topics"
import { AiFillDelete } from "react-icons/ai"
import * as snackbars from "Snackbar"
import HorizontalTopicList from "components/HorizontalTopicList";
import MiddlePageBackground from "components/MiddlePageBackground";
import Title from "components/Title";
import Description from "components/Description";
import BtnOne from "components/Buttons/BtnOne";

export const TopicsManager = ({ setSnackbarSettings }) => {
  const [topicField, setTopicField] = useState("");
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

  function createTopic() {
    if (topicField.length === 0) {
      snackbars.changeSnackbarSettings("error", "Topic name cannot be empty", setSnackbarSettings)
      return
    }
    if (topicField.length === 1) {
      snackbars.changeSnackbarSettings("error", "Topic name cannot be only one character", setSnackbarSettings);
      return
    }
    //make first letter uppercase
    let newTopic = topicField.charAt(0).toUpperCase() + topicField.slice(1)
    createServerSideTopic(newTopic)
      .then((res) => {
        setTopicField("");
        setTopicsList([...topicsList, { name: newTopic }])
        snackbars.changeSnackbarSettings("success", "Topic created", setSnackbarSettings)
      })
      .catch((err) => {
        snackbars.changeSnackbarSettings("error", err.message, setSnackbarSettings)
      })
  }

  function deleteTopic(topic) {
    deleteServerSideTopic(topic)
      .then((res) => {
        setTopicsList(topicsList.filter(elem => elem.name !== topic))
        snackbars.changeSnackbarSettings("success", "Topic deleted", setSnackbarSettings)
      })
      .catch((err) => {
        snackbars.changeSnackbarSettings("error", err.message, setSnackbarSettings)
      })
  }

  return (
    <Theme>
      <div style={{ justifyContent: "center", display: "flex" }}>
        <MiddlePageBackground>
          <Title>Topics</Title>
          <Description>Here you have all your topics ordered by the amount of times you wrote about them, this page has been made so that you could manage your topics.</Description>
          <Divider variant="middle" sx={{ marginBottom: "10px", marginTop: "10px" }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <TextBox placeholder="Add a new topic" value={topicField} onChange={(e) => setTopicField(e.target.value)} />
            <BtnOne style={{width: "200px"}} onClick={createTopic}>Create topic</BtnOne>
          </div>
          <Divider variant="middle" sx={{ marginBottom: "10px", marginTop: "10px" }} />
          <HorizontalTopicList>
            {(topicsList.length === 0) &&
              <Description>No topics yet.</Description>
            }
            {
              topicsList.map((elem) => {
                return (
                  <TopicWrapper
                    key={elem.name}>
                    <TopicElem>
                      {elem.name}
                    </TopicElem>
                    <TopicElemDel
                      onClick={() => deleteTopic(elem.name)}>
                      <AiFillDelete />
                    </TopicElemDel>
                  </TopicWrapper>
                )
              })
            }
          </HorizontalTopicList>
        </MiddlePageBackground>
      </div>
    </Theme>
  )
}