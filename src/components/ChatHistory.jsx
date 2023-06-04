import { MessageList, Message } from "@chatscope/chat-ui-kit-react";

// messageList is array of objects with structure:
// { message, direction, isCustom, Component, props }
const ChatHistory = ({ messageList, chatRef, ...props }) => {
  return (
    <MessageList
      // scrollBehavior="auto"
      // autoScrollToBottom={true}
      // disableOnYReachWhenNoScroll={true}
      {...props}
    >
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

      {/* last element, used for scrolling */}
      <div className="chat-last" ref={chatRef}></div>
    </MessageList>
  );
};

export default ChatHistory;
