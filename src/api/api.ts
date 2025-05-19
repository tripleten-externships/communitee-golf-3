import { baseUrl } from "./baseUrl";

function checkResponse(res: Response) {
  return res.ok ? res.json() : Promise.reject(`Error:${res.status}`);
}

export function request(url: string, options: RequestInit) {
  return fetch(url, options).then(checkResponse);
}

export const getAllMsgStream = (token: string | undefined = "") => {
  return request(`${baseUrl}/message-stream`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const getSingleMsgStream = (
  streamId: string,
  token: string | undefined = ""
) => {
  return request(`${baseUrl}/message-stream/${streamId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const updateSingleMsgStream = (
  content: string,
  streamId: string,
  token: string | undefined = ""
) => {
  return request(`${baseUrl}/message/${streamId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      content,
    }),
  });
};
