import { useState, useEffect } from "react";
import {
  MainContainer,
  ChatContainer,
  ConversationHeader,
  MessageList,
  Message,
  MessageInput,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import GenderSelect from "./GenderSelect";
import avatar from "../assets/avatar.svg";
import logo from "../assets/logo.svg";

/**
 * information needed
 * context, gender, more about context, [...optional]
 *
 */

const querySchema = {
  context: {
    script: "What is the event or occassion you are styling for?",
    input: null,
  },
  // user has three choices: female, male, nonbinary
  gender: {
    script: "What is your gender style preference?",
    input: null,
    choices: ["Female", "Male", "Non-Binary"],
  },
  moreContext: {
    script: "More considerations? Culture?",
    input: null,
  },
};

// const createMessageObj = (message, direction) => {
//   return { message, direction };
// };

const createMessageObj = (
  message,
  direction,
  isCustom = false,
  Component = null,
  props = null
) => {
  return { message, direction, isCustom, Component, props };
};

const BasicChat = ({ stylistName, greeting, ...props }) => {
  const [context, setContext] = useState(null);
  const [gender, setGender] = useState(null);
  const [moreContext, setMoreContext] = useState(null);
  const [step, setStep] = useState(1); //1 is context, 2 is gender, 3 is moreContext, 4 is api call
  const [messageList, setMessageList] = useState([]);

  // generate introductory messages in chat
  useEffect(() => {
    setMessageList(() => {
      return [greeting, querySchema.context.script].map((message) =>
        createMessageObj(message, "incoming")
      );
    });
  }, []);

  useEffect(() => {
    // 1. enter context
    // 2. enter gender
    // 3. more context
    // 4. api call

    console.log(step);
  }, [step]);

  const handleSend = (text) => {
    setContext(() => {
      setMessageList(() => [
        ...messageList,
        createMessageObj(text, "outgoing"),
        createMessageObj(querySchema.gender.script, "incoming"),
        createMessageObj("gender", "outgoing", true, GenderSelect, {
          genderArray: querySchema.gender.choices,
        }),
      ]);
      setStep(() => step + 1);
    });
    return text;
  };

  return (
    <MainContainer responsive>
      <ChatContainer class="chat-container">
        <ConversationHeader class="chat-header">
          <ConversationHeader.Content className="stacked">
            <Avatar src={avatar} name={stylistName} />
            <p>{stylistName}</p>
          </ConversationHeader.Content>
          {/* <Avatar src={avatar} name={stylistName} />
          <ConversationHeader.Content userName={stylistName} /> */}
        </ConversationHeader>

        <MessageList scrollBehavior="smooth">
          {messageList.map(
            ({ message, direction, isCustom, Component, props }, index) =>
              !isCustom ? (
                <Message model={{ message, direction }} key={index} />
              ) : (
                <Message model={{ message, direction }} key={index}>
                  <Message.CustomContent>
                    <Component key={index} {...props} />
                  </Message.CustomContent>
                </Message>
              )
          )}
        </MessageList>
        <MessageInput
          placeholder="Message..."
          attachButton={false}
          onSend={(e) => handleSend(e)}
          disabled={step === 30} //disabled when gender input
        />
      </ChatContainer>
    </MainContainer>
  );
};

export default BasicChat;
