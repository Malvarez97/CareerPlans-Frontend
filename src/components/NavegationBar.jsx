import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Kanban from "./routes/kanban/Kanban";
import CreateSubject from "./routes//create/CreateSubject";
import Plan from "./routes/Plan";
import CrudTable from "./routes/plan/CrudTable";
import CreatePlan from "./routes/plan/CreatePlan";

export default function NavegationBar({ db, setDb }) {
  return (
    <div className="mt-5" style={{ minHeigth: "1200px" }}>
      <Routes>
        <Route path="/interactive-plan" element={<Plan />} />
        <Route path="/plans/:id" element={<Kanban data={db} />} />
        <Route path="/" element={<Kanban data={db} />} />
        <Route path="/create-subject" element={<CreateSubject />} />
        <Route path="/plans" element={<CrudTable data={db} />} />
        <Route path="/create-plan" element={<CreatePlan data={db} />} />
      </Routes>
    </div>
  );
}
