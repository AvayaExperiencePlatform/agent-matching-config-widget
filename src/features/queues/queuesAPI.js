import axios from "axios";
import process from "../../app/config";


export function listQueues({ pageSize, pageNumber }) {
  const config = {
    method: "get",
    url: `${process.env.AXP_PROXY_BASE_URL}/api/admin/match/v1beta/accounts/${process.env.AXP_ACCOUNT_ID}/queues`,
    params: { pageSize, pageNumber },
  };
  return axios(config).then((response) => {
    return response.data;
  });
}
