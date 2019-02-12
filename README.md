# Static Worker [![Build Status](https://travis-ci.com/manatarms/static-worker.svg?branch=master)](https://travis-ci.com/manatarms/static-worker) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/manatarms/static-worker/blob/master/LICENSE)
## A utility package for Cloudflare workers

This package provides functions that make it easy to host a static website using CLoudflare workers.

Here's a simple example
```javascript
import StaticWorker from "static-worker";

const worker = new StaticWorker(request);

// Images route
worker.route(/images/,(request)=>{
  return console.log(request);
})


```
