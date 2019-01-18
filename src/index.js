export default class StaticWorker {
  constructor(request, responses = {}) {
    this.request = request;
    this.responses = responses;
    this.routes = new Map();
  }

  route(regex, handler) {
    this.routes.set(regex, handler.bind(this, this.request));
  }

  getResponse() {
    let response;
    for (let [regex, handler] of this.routes.entries()) {
      if (regex.test(this.request.url)) {
        response = handler(this.request);
        break;
      }
    }
    if (typeof response === "undefined") {
      return this.notFound();
    }
    return response;
  }

  getResourceNameFromUrl() {
    return this.request.url.split("/").pop();
  }

  notFound() {
    return (
      this.responses["404"] ||
      new Response("Not Found", { status: 404, statusText: "Not Found" })
    );
  }
}
