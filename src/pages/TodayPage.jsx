import { FaStar } from "react-icons/fa";
import CreateTask from "../components/CreateTask";
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
import TasksList from "../components/TasksList";

export default function TodayPage() {
  return (
    <Layout>
      <PageTitle label="Today" icon={<FaStar color="#FFCE28" size={25} />} />
      <CreateTask />
      <TasksList />
    </Layout>
  );
}
