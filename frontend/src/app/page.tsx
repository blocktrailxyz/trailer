/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react";
import api from "../utils/api";

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/v1/users");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Welcome to the Next.js App</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
