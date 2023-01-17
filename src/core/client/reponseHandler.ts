export function responseHandler(request: XMLHttpRequest) {
  if (request.response === 'OK') {
    return request.response;
  }
  return JSON.parse(request.response);
}
