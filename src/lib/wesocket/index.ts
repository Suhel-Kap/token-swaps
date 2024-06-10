import { OHLCApiResponse, WebSocketMessage, WebSocketOHLCData } from "../types";

export const createWebSocket = (
  url: string,
  symbols: string[],
  interval: number = 1,
): WebSocket => {
  const socket = new WebSocket(url);

  socket.onopen = () => {
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

  socket.onclose = (event) => {
    console.log("WebSocket connection closed", event);
  };

  socket.onerror = (error) => {
    console.error("WebSocket error", error);
  };

  return socket;
};

export const handleWebSocketMessage = (event: MessageEvent) => {
  const data = JSON.parse(event.data);
  if (data.channel === "ohlc") {
    if (data.type === "snapshot" || data.type === "update") {
      return {
        error: [],
        result: {
          ohlcData: data.data.map((item: WebSocketOHLCData) => [
            new Date(item.timestamp).getTime() / 1000,
            item.open.toString(),
            item.high.toString(),
            item.low.toString(),
            item.close.toString(),
            item.vwap.toString(),
            item.volume.toString(),
            item.trades,
          ]),
        },
      } as OHLCApiResponse;
    }
  }
};
