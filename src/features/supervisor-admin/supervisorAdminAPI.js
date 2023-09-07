const widgetAPI = window.WS.widgetAPI();

export function setReady() {
  return widgetAPI.setAgentReady();
}
export function setNotReady(reasonCode) {
  return widgetAPI.setAgentNotReady(reasonCode);
}

export function getNotReadyReasonCodes() {
  return widgetAPI.getNotReadyReasonCodes();
}
export function getCapabilities() {
  return widgetAPI.getCapabilities();
}
export function getAgentDetails() {
  return widgetAPI.getConfiguration()?.user;
}

export function subscribeToAgentState(callback) {
  widgetAPI.onDataEvent("onAgentStateEvent", callback);
}
