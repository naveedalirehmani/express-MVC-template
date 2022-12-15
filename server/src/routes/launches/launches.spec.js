const request = require("supertest");
const app = require("../../app");

describe("getAllLaunches-test", () => {
  test("get should response with 200", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
    // expect(response.statusCode).toBe(200)
  });
});

describe("addNewLaunch-test", () => {
  const completeLaunchData = {
    mission: "Kepler Exploration Y",
    rocket: "Kepler IS2",
    launchDate: "January 7, 2030",
    target: "Kepler-442 b2",
  };

  const launchDataWithDate = {
    mission: "Kepler Exploration Y",
    rocket: "Kepler IS2",
    // launchDate: "January 7, 2030",
    target: "Kepler-442 b2",
  };

  test("launch date creation 201 pass", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();

    expect(requestDate).toBe(responseDate);

    expect(response.body).toMatchObject(launchDataWithDate);
  });

  test("launch data with missing field", async () => {

    const response = await request(app)
      .post("/launches")
      .send(launchDataWithDate) 
      .expect(400)
      .expect("Content-Type", /json/);

    expect(response.body).toStrictEqual({error:"missing launch field"});

  });

  test("launch data with invalid date", async () => {

    const response = await request(app)
      .post("/launches")
      .send({
        mission: "Kepler Exploration Y",
        rocket: "Kepler IS2",
        launchDate: "invalid date",
        target: "Kepler-442 b2",
      })
      .expect(400)
      .expect("Content-Type", /json/);

  });
});
