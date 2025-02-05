import ConverHeader from "../conversation/ConverHeader";
import ConverInbox from "../conversation/ConverInbox";

function ChatBox() {
  return (
    <div className="w-full h-screen max-h-screen overflow-y-auto">
      <ConverHeader />
      <ConverInbox />
    </div>
  );
}

export default ChatBox;
