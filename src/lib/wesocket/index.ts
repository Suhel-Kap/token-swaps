// src/utils/websocket.ts
export interface WebSocketMessage {
  method: string;
  params: {
    channel: string;
    symbol: string[];
    interval?: number;
    snapshot?: boolean;
    req_id?: number;
  };
}

export const createWebSocket = (url: string): WebSocket => {
  const socket = new WebSocket(url);

  socket.onopen = () => {
    console.log("WebSocket connection opened");
  };

  socket.onclose = (event) => {
    console.log("WebSocket connection closed", event);
  };

  socket.onerror = (error) => {
    console.error("WebSocket error", error);
  };

  return socket;
};

export const subscribeToOhlc = (
  socket: WebSocket,
  symbols: string[],
  interval: number = 1,
) => {
  const message: WebSocketMessage = {
    method: "subscribe",
    params: {
      channel: "ohlc",
      symbol: symbols,
      interval,
    },
  };

  socket.send(JSON.stringify(message));
};

export const handleWebSocketMessage = (event: MessageEvent) => {
  const data = JSON.parse(event.data);

  if (data.channel === "ohlc") {
    if (data.type === "snapshot" || data.type === "update") {
      console.log("Received OHLC data:", data.data);
      // Handle the data (e.g., update state or call a callback function)
    }
  } else if (data.method === "subscribe") {
    console.log("Subscription acknowledged:", data);
  } else {
    console.log("Received message:", data);
  }
};
