// header as header children chat history comp as body, message input as footer
const Layout = ({ children }) => {
  return <div className="layout">{children}</div>;
};

// const Layout = () => {
//   return (
//     <div className="layout">
//       {/* <div className="layout-header"> */}
//       <Header className="layout-header" />
//       {/* </div> */}
//       <div className="layout-body">hi</div>
//       <div className="layout-footer">
//         <MessageInput
//           placeholder="Message..."
//           attachButton={false}
//           // onSend={(e) => handleSend(e)}
//           // disabled={step === 30} //disabled when gender input
//         />
//       </div>
//     </div>
//   );
// };

export default Layout;
