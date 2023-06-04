import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { MessageInput } from "@chatscope/chat-ui-kit-react";

import Layout from "./components/Layout";
import Header from "./components/Header";
import ChatHistory from "./components/ChatHistory";

import ImageSlider from "./components/ImageSlider";
import InputButtonGroup from "./components/InputButtonGroup";

import SCRIPT from "./script";
import earrings from "./assets/earrings.jpeg";
import dress from "./assets/dress.jpeg";
import jacket from "./assets/jacket.jpeg";
import scarf from "./assets/scarf.jpeg";
import skirt from "./assets/skirt.jpeg";
import gen from "./assets/gen.png";

import { createMessageObj } from "./helpers";
import Typing from "./components/Typing";

import ENDPOINTS from "./endpoints";

const { recommendation, generative } = ENDPOINTS;

const App = () => {
  // used to keep track of step in user flow
  const [step, setStep] = useState(1);

  // used to display chat history
  const [messageList, setMessageList] = useState([]);
  const [occasion, setOccasion] = useState(null);
  const [gender, setGender] = useState(null);
  const [style, setStyle] = useState(null);
  const [showInput, setShowInput] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [imageList, setImageList] = useState({});

  //ref for scrolling
  const chatRef = useRef(null);

  // helper function for updating imageList
  const updateImageList = (isSelected, index, metadata) => {
    const updatedList = Object.assign(imageList);
    // add to list
    if (isSelected) {
      updatedList[index] = metadata;
    }
    // delete
    if (!isSelected) {
      delete updatedList[index];
    }

    setImageList(() => updatedList);
  };

  useEffect(() => {
    chatRef.current.scrollIntoView(true);
  }, [messageList]);

  // useEffect(() => {
  // }, [imageList]);

  // do this if error with api
  const apiFallback = () => {
    setMessageList(() => {
      return [
        ...messageList,
        createMessageObj("", "outgoing", true, ImageSlider, {
          srcList: [dress, earrings, jacket, scarf, skirt],
          updateImageList,
        }),
      ];
    });
  };

  // initialize the messageList with introduction

  useEffect(() => {
    const { introduction, prompt1 } = SCRIPT;
    setMessageList(() => {
      return [introduction, prompt1].map((message) =>
        createMessageObj(message, "incoming")
      );
    });
  }, []);

  // make request to recommendation api
  useEffect(() => {
    console.log(step);
    if (step === 2 || step === 4) setShowInput(() => false);

    // ready to get styles from api and update UI
    if (step === 4) {
      setShowLoading(() => true);

      setTimeout(() => {
        setShowLoading(() => false);
        setShowOptions(() => true);

        // api call to recommendation api
        const prompt = [occasion, gender, style].join(" + ");

        // then update messagelist with the response
        setMessageList(() => {
          return [
            ...messageList,
            createMessageObj("", "outgoing", true, ImageSlider, {
              srcList: [earrings, jacket, dress, scarf, skirt],
              updateImageList,
            }),
          ];
        });
      }, 500);
      clearTimeout();
    }

    if (step === 5) {
      setMessageList(() => {
        setShowFeedback(() => true);
        setShowLoading(() => false);

        return [
          ...messageList,
          createMessageObj("", "outgoing", true, ImageSlider, {
            srcList: [gen],
            size: "md",
            updateImageList,
          }),
        ];
      });
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

  const handleStyleSelect = () => {
    const notEmptyList = Object.keys(imageList).length > 0;

    if (notEmptyList) {
      // update step
      setStep(() => step + 1);
      //update chat history
      setMessageList(() => {
        return [...messageList, createMessageObj("Style", "outgoing")];
      });

      // show loading while waaiting for api response
      setShowLoading(() => true);

      // format prompt and call api

      let prompt = imageList.map((img) => img.description);
      prompt = prompt.join(" + ");
      // api response received
      setTimeout(() => {
        // add image to chat history
        setShowLoading(false);
        // show feedback
        // setShowFeedback(() => true);
      }, 1000);
      setMessageList(() => {
        return [
          ...messageList,
          createMessageObj("", "outgoing", true, ImageSlider, {
            srcList: [gen],
            size: "md",
            updateImageList,
          }),
        ];
      });
      setStep(() => step + 1);
    }
  };

  return (
    <Layout>
      <Header />
      <ChatHistory
        chatRef={chatRef}
        messageList={messageList}
        className="layout-body"
      />
      {/* visible when entering occasion or style text input */}
      {showInput && (
        <MessageInput
          className="layout-footer"
          placeholder="Message..."
          attachButton={false}
          onSend={(e) => handleSend(e)}
        />
      )}
      {/* visible for gender */}
      {!showInput && step === 2 && (
        <InputButtonGroup
          className="layout-footer"
          options={["Female", "Male", "Non-binary"]}
          handleClick={handleGenderSelect}
        />
      )}

      {/* visible for styling */}
      {step === 4 && showOptions && (
        <InputButtonGroup
          className="layout-footer"
          options={["Style", "More", "Refine"]}
          handleClick={handleStyleSelect}
        />
      )}

      {/* last step */}
      {showFeedback && (
        <InputButtonGroup
          className="layout-footer"
          options={["Bad results", "Refine"]}
        />
      )}
      {showLoading && <Typing />}
    </Layout>
  );
};

export default App;
