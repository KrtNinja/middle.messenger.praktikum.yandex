export function responseHandler(request: XMLHttpRequest) {
  if (request.response === 'OK' || request.response.includes('PNG')) {
    return request.response;
  }
  return JSON.parse(request.response);
}
