import { Avatar } from "@chatscope/chat-ui-kit-react";
import avatar from "../assets/avatar.svg";

const Header = () => {
  return (
    <div className="layout-header">
      <Avatar src={avatar} />
    </div>
  );
};

export default Header;
