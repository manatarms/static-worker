# Static Worker [![Build Status](https://travis-ci.com/manatarms/static-worker.svg?branch=master)](https://travis-ci.com/manatarms/static-worker) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/manatarms/static-worker/blob/master/LICENSE)
A utility package for Cloudflare workers


Example
```
import StaticWorker from "static-worker";
// TODO this needs to be raw loader, maybe
import index from "./index.js";

const worker = new StaticWorker(request);

// root route
worker.route(//,(request)=>{
  return console.log(request);
})


// images route
worker.route(/images/,(request)=>{
  return console.log(request);
})

getResourceNameFromRequestUrl(){

}

Full example


addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});


function handleRequest(request){
  new StaticWorker(request)
}


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
        this.responses[statusCode] ||
        // TODO check if undefined is a valid response body
        new Response(undefined, { status: statusCode })
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
      return this.responses["404"];
    }
    return response;
  }

  getResourceNameFromUrl() {
    return this.request.url.split("/").pop();
  }
}
```
