import { Collapse } from "@mui/material";
import { useState } from "react";

export default function FAQItem({ question, answer, ...props }) {
  const [open, setOpen] = useState(false);
  const sentence = answer.split("@@")
  return (
    <div className="faq-item">
      <div className="faq-question" onClick={() => setOpen(!open)}>
        {!open ?
          <svg width="12" height="12" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 10C20 9.66667 19.8 9 19 9H11V1C11 0.5 10.5 0 10 0C9.5 0 9 0.5 9 1V9H1C0.5 9 0 9.5 0 10C0 10.5 0.5 11 1 11H9V19C9 19.5 9.5 20 10 20C10.5 20 11 19.5 11 19V11H19C19.8 11 20 10.3333 20 10Z" fill="white" />
          </svg>
          :
          <svg width="12" height="2" viewBox="0 0 20 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" width="2" height="20" rx="1" transform="rotate(90 20 0)" fill="white" />
          </svg>
        }
        <p>{question}</p>
      </div>
      <div className="faq-answer">
        <Collapse in={open}>
          {sentence.map((item, key) => (
            <p key={key}>{item}</p>
          ))}
        </Collapse>
      </div>
    </div>
  )
}