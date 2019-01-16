import StaticWorker from "../src/index";

beforeEach(() => {
  const testWorker = new StaticWorker(new Response("test"));
});

test("placeholder test", () => {});
