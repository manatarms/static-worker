import StaticWorker from "../src/index";

let testWorker;

beforeEach(() => {
  testWorker = new StaticWorker(
    new Response("test", {
      url: "myurl.com/images"
    })
  );
});

test("Should build new instance", () => {
  expect(testWorker).toMatchSnapshot();
});

test("Should configure route correctly", () => {
  testWorker.route(/images/, request => {});
  expect(testWorker).toMatchSnapshot();
});

test("Should get response for route", () => {
  testWorker.route(/images/, request => new Response("images response"));
  expect(testWorker.getResponse()).toMatchSnapshot();
});

test("Should return 404 for unregistered routes", () => {
  testWorker.route(/unregistered/, request => new Response("unregistered"));
  expect(testWorker.getResponse()).toMatchSnapshot();
});

test("Should return 404", () => {
  expect(testWorker.notFound()).toMatchSnapshot();
});

test("Should getAssetNameFromUrl", () => {
  expect(testWorker.getResourceNameFromUrl()).toMatchSnapshot();
});

test("Should match first registered route", () => {
  testWorker.route(/images/, request => new Response("images response 1"));
  testWorker.route(/image/, request => new Response("images response 2"));
  expect(testWorker.getResponse()).toMatchSnapshot();
});
