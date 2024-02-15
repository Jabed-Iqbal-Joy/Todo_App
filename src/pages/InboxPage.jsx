import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
import { FaInbox } from "react-icons/fa";
import CreateTask from "../components/CreateTask";
import TaskList from "../components/TasksList";

export default function InboxPage() {
  return (
    <Layout>
      <PageTitle label="Inbox" icon={<FaInbox color="#66B2ff" size={25} />} />
      <CreateTask />
      <TaskList />
    </Layout>
  );
}
