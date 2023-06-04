import { useState, useEffect } from "react";
import { MessageInput } from "@chatscope/chat-ui-kit-react";

import Layout from "./components/Layout";
import Header from "./components/Header";
import ChatHistory from "./components/ChatHistory";

import ImageSlider from "./components/ImageSlider";
import InputButtonGroup from "./components/InputButtonGroup";

import SCRIPT from "./script";
import earrings from "./assets/earrings.jpeg";

import { createMessageObj } from "./helpers";

const App = () => {
  // used to display chat history
  const [messageList, setMessageList] = useState([]);
  const [occasion, setOccasion] = useState(null);
  const [gender, setGender] = useState(null);
  const [style, setStyle] = useState(null);
  const [showInput, setShowInput] = useState(true);
  const [showLoading, setShowLoading] = useState(false);

  // used to keep track of step in user flow
  const [step, setStep] = useState(1);

  // initialize the messageList with introduction

  useEffect(() => {
    const { introduction, prompt1 } = SCRIPT;
    setMessageList(() => {
      return [introduction, prompt1].map((message) =>
        createMessageObj(message, "incoming")
      );
    });
  }, []);

  useEffect(() => {
    if (step === 2 || step === 4) setShowInput(() => false);

    // ready to get styles from api
    if (step === 4) {
      console.log(
        `occasion is ${occasion}\ngender is ${gender}\nstyle is ${style}`
      );
      setShowLoading(() => true);
    }
  }, [step]);

  // update the list and step
  // save info
  const handleSend = (e) => {
    setMessageList(() => {
      setStep(() => step + 1);

      let prompt = SCRIPT.prompt2;
      if (step === 1) {
        setOccasion(() => e);
      }

      if (step === 3) {
        setStyle(() => e);
        prompt = SCRIPT.prompt4;
      }

      return [
        ...messageList,
        createMessageObj(e, "outgoing"),
        createMessageObj(prompt, "incoming"),
      ];
    });
  };

  const handleGenderSelect = (e) => {
    setShowInput(() => true);
    setStep(() => step + 1);
    setGender(() => e);
    setMessageList(() => [
      ...messageList,
      createMessageObj(e, "outgoing"),
      createMessageObj(SCRIPT.prompt3, "incoming"),
    ]);
  };

  return (
    <Layout>
      <Header />
      <ChatHistory
        messageList={messageList}
        className="layout-body"
        showLoading={showLoading}
      />
      {showInput && (
        <MessageInput
          className="layout-footer"
          placeholder="Message..."
          attachButton={false}
          onSend={(e) => handleSend(e)}
        />
      )}
      {!showInput && step === 2 && (
        <InputButtonGroup
          className="layout-footer"
          options={["Female", "Male", "Non-binary"]}
          handleClick={handleGenderSelect}
        />
      )}
      {/* <ImageSlider
        srcList={[
          earrings,
          earrings,
          earrings,
          earrings,
          earrings,
          earrings,
          earrings,
          earrings,
        ]}
      /> */}
    </Layout>
  );
};

export default App;
