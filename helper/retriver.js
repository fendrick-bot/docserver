export default async function retriver() {
  try {
    let docs = await fetch("/api/retrive", { cache: 'no-cache' });
    docs = await docs.json();
    return docs;
  } catch (error) {
    return [];
  }
}

// import axios from "axios";

// export default async function retriver() {
//   try {
//     axios
//       .get("/api/retrive", {
//         // query URL without using browser cache
//         headers: {
//           "Cache-Control": "no-cache",
//           Pragma: "no-cache",
//           Expires: "0",
//         },
//       })
//       // .then((doc) => {
//       //   doc = doc.json();
//       // })
//       .then((doc) => {
//         return doc;
//       });
//   } catch (error) {
//     return [];
//   }
// }
