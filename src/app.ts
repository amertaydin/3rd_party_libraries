// import { Product } from "./product.model";
// import "reflect-metadata";
// import { plainToClass } from "class-transformer";
// import { validate } from "class-validator";

// const products = [
//   { title: "A Carper", price: 29.99 },
//   { title: "A Book", price: 10.99 },
// ];

// // const p1 = new Product("A Book", 12.99);

// // const loadedProducts = products.map((prod) => {
// //   return new Product(prod.title, prod.price);
// // });

// const newProd = new Product("", -5.99);
// validate(newProd).then((errors) => {
//   if (errors.length > 0) {
//     console.log("Validation Errors!");
//     console.log(errors);
//   } else {
//     console.log(newProd.getInformation());
//   }
// });

// const loadedProducts = plainToClass(Product, products);

// // for (const prod of loadedProducts) {
// //   console.log(prod.getInformation());
// // }

// console.log(loadedProducts);

import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const GOOGLE_API_KEY = "YOUR_API_KEY";

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

const searchAddressHandler = (event: Event) => {
  event.preventDefault();
  const enteredAdress = addressInput.value;

  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAdress
      )}&key=${GOOGLE_API_KEY}
`
    )
    .then((response) => {
      if (response.data.status !== "OK") {
        throw new Error("Couldn't fetch location!");
      }
      const coordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById("map")!, {
        center: coordinates,
        zoom: 8,
      });

      new google.maps.Marker({ position: coordinates, map: map });
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
  // send this to Google's API
};

form.addEventListener("submit", searchAddressHandler);
