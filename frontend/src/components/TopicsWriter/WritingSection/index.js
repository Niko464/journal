import styled from "styled-components"
import { useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';

export const WritingSection = ({ textRef }) => {
  const [text, setText] = useState("");

  return (
    <TextareaAutosize ref={textRef} name="writingSection" placeholder="Write your texte here..." value={text} onChange={(e) => setText(e.target.value)}
      minRows={3}
      maxRows={20}
      onKeyDown={(e) => {
        if (e.key === "Tab") {
          e.preventDefault();
          setText(text + "\t");
        }
      }}
      style={{
        outline: "none",
        background: "#40444B",
        borderRadius: "10px",
        padding: "10px",
        margin: "10px",
        resize: "none",
        color: "#D6D8DA",

        "&:focus": {
          border: "2px solid #fdd534",
        },
      }} />
  )
}