import React, { useState, useEffect } from "react";
import { socket } from "../../socket";

export default function Date() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [time, setTime] = useState(null);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("time", (data) => setTime(data));

    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <>
      <div className="App">{isConnected ? "connected" : "not connected"}</div>
      <div className="App">{time}</div>
    </>
  );
}
