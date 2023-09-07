import axios from "axios";
import process from "../../app/config";

export function getUser({ userId }) {
  const config = {
    method: "get",
    url: `${process.env.AXP_PROXY_BASE_URL}/api/admin/user/v1beta/accounts/${process.env.AXP_ACCOUNT_ID}/users/${userId}`,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
  return axios(config).then((response) => {
    return response.data;
  });
}

export function listGroups({ groupIds }) {
  const config = {
    method: "get",
    url: `${process.env.AXP_PROXY_BASE_URL}/api/admin/group/v1beta/accounts/${process.env.AXP_ACCOUNT_ID}/groups/${groupIds}`,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
  return axios(config).then((response) => {
    return response.data;
  });
}

export function saveUser({ userId, updatedUser }) {
  const config = {
    method: "put",
    url: `${process.env.AXP_PROXY_BASE_URL}/api/admin/user/v1beta/accounts/${process.env.AXP_ACCOUNT_ID}/users/${userId}`,
    data: updatedUser,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
  return axios(config).then((response) => {
    return response.data;
  });
}
