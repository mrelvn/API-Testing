import {test, expect} from "@playwright/test";
test.describe.configure({mode: "serial"});

let token:string;
let bookingid:any;

test.beforeAll("Generate token", async ({request})=>{
    const response = await request.post("https://restful-booker.herokuapp.com/auth",
        {
            data:{
                username:"admin",
                password:"password123"
            },
            headers:{
                "Content-Type": "application/json"
            }
        }
    )

    const res:any = await response.json();
    token = res.token
});


test("Create Booking", async ({request})=>{
    const response = await request.post("https://restful-booker.herokuapp.com/booking",
        {
            data:{
                firstname:"Max",
                lastname:"Hollloway",
                totalprice:999,
                depositpaid:false,
                bookingdates:{
                    "checkin": "2026-05-20",
                    "checkout": "2026-05-25"
                    }
                 },
                 headers:{
                    "Content-Type":"application/json"
                 }
        }
    )

    const res = await response.json();
    bookingid = res.bookingid

    expect([200, 201]).toContain(response.status());
});


test ("Update Existing Booking", async ({request})=>{
    const response = await request.put("https://restful-booker.herokuapp.com/booking/" + bookingid,
        {
            data:{
                firstname:"Farzan",
                lastname:"Ahmad",
                totalprice:899,
                depositpaid:true,
                bookingdates:{
                    "checkin":"2026-05-25",
                    "checkout":"2026-05-30"
                }
            },
            headers:{
                "Content-Type":"application/json",
                "Cookie":`token=${token}`
            }
        }
    )

    console.log("booking id:", bookingid)
    console.log("token:", token)
    console.log("status", response.status())
    console.log(await response.json());
    expect([200, 201]).toContain(response.status());
});


test("Deleting Existing Booking", async ({request})=>{
    const response = await request.delete("https://restful-booker.herokuapp.com/booking/" + bookingid,
       { headers:{
            "Content-Type":"application/json",
            "Cookie":`token=${token}`
                }
       } )
})
