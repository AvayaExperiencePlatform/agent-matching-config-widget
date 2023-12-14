import axios from "axios";
import process from "../../app/config";

export function getUser({ userId }) {
  const config = {
    method: "get",
    url: `${process.env.AXP_PROXY_BASE_URL}/api/admin/user/v1/accounts/${process.env.AXP_ACCOUNT_ID}/users/${userId}`,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "appkey": process.env.AXP_API_APP_KEY
    },
  };
  return axios(config).then((response) => {
    return response.data;
  });
}

export function listGroups({ groupIds }) {
  const config = {
    method: "get",
    url: `${process.env.AXP_PROXY_BASE_URL}/api/admin/group/v1/accounts/${process.env.AXP_ACCOUNT_ID}/groups/${groupIds}`,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "appkey": process.env.AXP_API_APP_KEY
    },
  };
  return axios(config).then((response) => {
    return response.data;
  });
}

export function saveUser({ userId, updatedUser }) {
  const config = {
    method: "put",
    url: `${process.env.AXP_PROXY_BASE_URL}/api/admin/user/v1/accounts/${process.env.AXP_ACCOUNT_ID}/users/${userId}`,
    data: updatedUser,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "appkey": process.env.AXP_API_APP_KEY
    },
  };
  return axios(config).then((response) => {
    return response.data;
  });
}
