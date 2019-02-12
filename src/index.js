export default class StaticWorker {
  constructor(request, responses = {}) {
    this.request = request;
    this.responses = responses;
    this.routes = new Map();
  }

  route(regex, handler) {
    this.routes.set(regex, handler.bind(this, this.request));
  }

  getResponse(statusCode) {
    if (typeof statusCode !== "undefined") {
      return (
        this.responses[statusCode] || new Response(null, { status: statusCode })
      );
    }

    let response;
    for (let [regex, handler] of this.routes.entries()) {
      if (regex.test(this.request.url)) {
        response = handler(this.request);
        break;
      }
    }
    if (typeof response === "undefined") {
      return this.getResponse(404);
    }
    return response;
  }

  getResourceNameFromUrl() {
    return this.request.url.split("/").pop();
  }
}
