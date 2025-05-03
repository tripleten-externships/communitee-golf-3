export const baseUrl = "http://localhost:8080";

function checkResponse(res: Response) {
  return res.ok ? res.json() : Promise.reject(`Error:${res.status}`);
}

export function request(url: string, options: RequestInit) {
  return fetch(url, options).then(checkResponse);
}

export const getAllMsgStream = (token: string) => {
  return request(`${baseUrl}/message-stream`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const getSingleMsgStream = (streanId: string, token: string) => {
  return request(`${baseUrl}/message-stream/:${streanId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const updateSingleMsgStream = (streanId: string, token: string) => {
  return request(`${baseUrl}/message-stream/:${streanId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};
