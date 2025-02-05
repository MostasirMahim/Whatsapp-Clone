import { useQuery } from "@tanstack/react-query";
import { Navigate, Route, Routes } from "react-router-dom";
import Conversation from "./components/conversation/Conversation";
import MessageInbox from "./components/inbox/MessageInbox";
import Register from "./components/auth/Register";
import LoadingSpinner from "./components/utils/LoadingSpinner";

function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/users/me");
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) throw new Error(data.error);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <div className="bg-[#111B21] text-white">
        <Routes>
          <Route
            path="/:box"
            element={authUser ? <Conversation /> : <Navigate to="/login " />}
          >
            <Route path=":id" element={<MessageInbox />}></Route>
          </Route>
          <Route
            path="/login"
            element={!authUser ? <Register /> : <Navigate to="/chats " />}
          />
          <Route path="*" element={<Navigate to="/chats" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
