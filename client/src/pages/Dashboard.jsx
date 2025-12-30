import { useEffect, useState } from "react";
import api from "../services/api";

import Topics from "./Topic";

export default function Dashboard() {

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Topics</h1>
      <p className=" mb-6 text-center">Explore this exciting Topics!</p>

      {/* {topics.map(t => (
        <TopicAccordion key={t._id} topic={t} />
      ))} */}
      <Topics />
    </div>
  );
}
