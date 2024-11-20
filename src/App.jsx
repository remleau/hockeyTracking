import { Route, Routes } from "react-router-dom";

import Layout from "@/components/Layout";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import AddMatch from "@/pages/AddMatch";
import Settings from "@/pages/Settings";
import Expenses from "@/pages/Expenses";
import Stats from "@/pages/Stats";

export default function App() {
  return (
    <Routes>
      <Route path={"/login"} element={<Login />} />

      <Route path={"/"} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={"/addMatch"} element={<AddMatch />} />
        <Route path={"/expenses"} element={<Expenses />} />
        <Route path={"/stats"} element={<Stats />} />
        <Route path={"/settings"} element={<Settings />} />
      </Route>
    </Routes>
  );
}
