import { useEffect, useState, createRef } from "react";
import { Divider } from "@mui/material";
import { TopicElem, TopicElemClose, AddTopicBtn } from "./elements";
import { WritingSection } from "./WritingSection";
import Theme from "Theme"
import { getTopicsList } from "apiCalls/Topics"
import * as snackbars from "Snackbar"
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fr from "date-fns/locale/fr"
import moment from "moment";
import { createServerSideArticle } from "apiCalls/Articles"
import HorizontalTopicList from "components/HorizontalTopicList";
import MiddlePageBackground from "components/MiddlePageBackground";
import Title from "components/Title";
import Description from "components/Description";
import BtnOne from "components/Buttons/BtnOne";

registerLocale("fr", fr);

const TopicsWriter = ({ setSnackbarSettings }) => {
  const [topicsList, setTopicsList] = useState([]);
  const [date, setDate] = useState(new Date());
  const textRef = createRef();

  useEffect(() => {
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

  function saveText() {
    const text = textRef.current.value;
    const selectedTopics = topicsList.filter(topic => topic.selected === true)
      .map((elem) => elem.name);

    if (text === "") {
      snackbars.changeSnackbarSettings("error", "You can't save empty text.", setSnackbarSettings)
      return;
    }
    if (selectedTopics.length === 0) {
      snackbars.changeSnackbarSettings("error", "You can't save text without selecting at least one topic.", setSnackbarSettings)
      return;
    }
    if (date === null || date === undefined || date === "") {
      snackbars.changeSnackbarSettings("error", "You can't save text without selecting date.", setSnackbarSettings)
      return;
    }
    let parsedDate = moment(date)
    if (parsedDate.isValid() === false) {
      snackbars.changeSnackbarSettings("error", "You can't save text with invalid date.", setSnackbarSettings)
      return;
    }
    createServerSideArticle(selectedTopics, text, date.getTime())
      .then(() => {
        snackbars.changeSnackbarSettings("success", "Article saved.", setSnackbarSettings)
      })
      .catch((err) => {
        snackbars.changeSnackbarSettings("error", "Error while saving article.", setSnackbarSettings)
      })
  }

  return (
    <Theme>
      <div style={{ justifyContent: "center", display: "flex" }}>
        <MiddlePageBackground>
          <Title>What do you want to write about today ?</Title>
          <Description>Select the topics you want to write about, and start typing.</Description>
          <Description>You can also select a date in case you want to save stuff you wrote a long time ago.</Description>
          <Divider variant="middle" sx={{ marginBottom: "10px", marginTop: "15px" }} />
          <HorizontalTopicList>
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

            {(topicsList.length === 0) ?
              <div style={{ display: "flex", width: "100%", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <Description>You don't have any topics yet, click on the button below to create one</Description>
                <AddTopicBtn to="/topics">New</AddTopicBtn>
              </div>
              :
              <div style={{ display: "flex", alignItems: "center" }}>
                <AddTopicBtn to="/topics">New</AddTopicBtn>
              </div>
            }
          </HorizontalTopicList>

          <Divider variant="middle" sx={{ marginTop: "10px", marginBottom: "10px" }} />
          <WritingSection textRef={textRef} />
          <DatePicker
            dateFormat="P"
            locale="fr"
            selected={date}
            onChange={(newDate) => setDate(newDate)} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BtnOne onClick={() => saveText()}>Save</BtnOne>
          </div>
        </MiddlePageBackground>
      </div>
    </Theme>
  )
}

export default TopicsWriter;

//closeOnScroll={true} selected={date} 