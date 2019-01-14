class StaticWorker {
  constructor(request) {
    this.request = request;
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
      return this.notFound()
    }
    return response;
  }

  getAssetNameFromUrl() {
    return this.request.url.split("/").pop();
  }

  notFound(){
    return new Response("Not Found", { status: 404 });
  }
}

