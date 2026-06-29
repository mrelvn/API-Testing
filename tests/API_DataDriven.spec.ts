import {test, expect} from "@playwright/test";
import DataDriven_POST_Request from '../API_Data/DataDriven_POST_Request.json';

test("Create Booking", async({request})=>{
    const postResponse = await request.post(`/booking`,
        {
            data: DataDriven_POST_Request
        }
    )
    const responseBody = await postResponse.json();

    console.log(await responseBody);

    //Validating Status Code
    expect([200, 201]).toContain(postResponse.status());

    //Validating Status
    expect(postResponse.ok()).toBeTruthy();

    //Validating JSON ResponseBody
    expect(responseBody.booking).toHaveProperty("firstname","Farzan")
    expect(responseBody.booking).toHaveProperty("lastname","Ahmad")

    //Validating JSON Schema Dynamically
    expect(responseBody).toMatchObject({
        bookingid: expect.any(Number),
        booking:{
            firstname: expect.any(String),
            lastname: expect.any(String),
            totalprice: expect.any(Number),
            depositpaid: expect.any(Boolean),
            bookingdates:{
                checkin: expect.any(String),
                checkout: expect.any(String)
            },
            additionalneeds: expect.any(String)
        }
    })

    //Validating JSON Structure
    expect(responseBody).toHaveProperty("bookingid")
    expect(responseBody).toHaveProperty("booking")
    expect(responseBody.booking).toHaveProperty("firstname")
    expect(responseBody.booking).toHaveProperty("lastname")
    expect(responseBody.booking).toHaveProperty("totalprice")
    expect(responseBody.booking).toHaveProperty("depositpaid")
    expect(responseBody.booking.bookingdates).toHaveProperty("checkin")
    expect(responseBody.booking.bookingdates).toHaveProperty("checkout")

    //Validating Headers
    expect(postResponse.headers()["content-type"]).toContain("application/json")

})

