import {
  MessageList,
  Message,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

// messageList is array of objects with structure:
// { message, direction, isCustom, Component, props }
const ChatHistory = ({ messageList, showLoading, ...props }) => {
  return (
    <MessageList {...props}>
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
      {showLoading && <TypingIndicator />}
    </MessageList>
  );
};

export default ChatHistory;
