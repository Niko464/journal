import { useEffect, useState, createRef } from "react";
import { Divider } from "@mui/material";
import { Wrapper, TopicsList, TopicsTitle, TopicElem, TopicElemClose, AddTopicBtn, TopicsDescription, SaveBtn } from "./elements";
import { WritingSection } from "./WritingSection";
import Theme from "Theme"
import { getTopicsList } from "apiCalls/Topics"
import * as snackbars from "Snackbar"
import DatePicker from "react-datepicker";
import moment from "moment";
import { createServerSideArticle } from "apiCalls/Articles"

const TopicsWriter = ({ setSnackbarSettings }) => {
  const [topicsList, setTopicsList] = useState([]);
  const [date, setDate] = useState(new Date());
  const textRef = createRef();

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

  function saveText() {
    const text = textRef.current.value;
    const selectedTopics = topicsList.filter(topic => topic.selected === true);

    if (text === "") {
      snackbars.changeSnackbarSettings("error", "You can't save empty text.", setSnackbarSettings)
      return;
    }
    if (selectedTopics.length === 0) {
      snackbars.changeSnackbarSettings("error", "You can't save text without selecting at least one topic.", setSnackbarSettings)
      return;
    }
    console.log(date)
    if (date === null || date === undefined || date === "") {
      snackbars.changeSnackbarSettings("error", "You can't save text without selecting date.", setSnackbarSettings)
      return;
    }
    let parsedDate = moment(date)
    if (parsedDate.isValid() === false) {
      snackbars.changeSnackbarSettings("error", "You can't save text with invalid date.", setSnackbarSettings)
      return;
    }
    let formatedDate = parsedDate.format("YYYY-MM-DD")
    createServerSideArticle(selectedTopics, text, formatedDate)
  }

  console.log("rerender")

  return (
    <Theme>
      <div style={{ justifyContent: "center", display: "flex" }}>
        <Wrapper>
          <TopicsTitle>What do you want to write about today ?</TopicsTitle>
          <TopicsDescription>Select the topics you want to write about, and start typing.</TopicsDescription>
          <TopicsDescription>You can also select a date in case you want to save stuff you wrote a long time ago.</TopicsDescription>
          <Divider variant="middle" sx={{ marginBottom: "10px", marginTop: "15px" }} />
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

            {(topicsList.length === 0) ?
              <div style={{ display: "flex", width: "100%", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <TopicsDescription>You don't have any topics yet, click on the button below to create one</TopicsDescription>
                <AddTopicBtn to="/topics">New</AddTopicBtn>
              </div>
              :
              <div style={{ display: "flex", alignItems: "center" }}>
                <AddTopicBtn to="/topics">New</AddTopicBtn>
              </div>
            }
          </TopicsList>

          <Divider variant="middle" sx={{ marginTop: "10px", marginBottom: "10px" }} />
          <WritingSection textRef={textRef} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <SaveBtn onClick={() => saveText()}>Save</SaveBtn>
          </div>
          <DatePicker closeOnScroll={true} selected={date} onChange={(newDate) => setDate(newDate)} />
        </Wrapper>
      </div>
    </Theme>
  )
}

export default TopicsWriter;