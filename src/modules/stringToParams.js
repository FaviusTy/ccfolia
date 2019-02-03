// const statusToString = status => {
//   return status
//     .map(param => {
//       return `${param.key}:${param.value}/${param.max}`;
//     })
//     .join("\n");
// };
// const stringToStatus = text => {
//   const regex = /^(.+):(.+)\/(.+)$/;
//   return text
//     .split("\n")
//     .map(chunk => {
//       const matches = chunk.trim().match(regex);
//       if (matches) {
//         return {
//           key: matches[1],
//           value: Number(matches[2]),
//           max: Number(matches[3])
//         };
//       } else {
//         return null;
//       }
//     })
//     .filter(item => item);
// };

// const paramsToString = params => {
//   return params
//     .map(param => {
//       return `${param.key}:${param.value}`;
//     })
//     .join("\n");
// };
// const stringToParams = text => {
//   const regex = /^(.+):(.+)$/;
//   return text
//     .split("\n")
//     .map(chunk => {
//       const matches = chunk.trim().match(regex);
//       if (matches) {
//         return {
//           key: matches[1],
//           value: Number(matches[2])
//         };
//       } else {
//         return null;
//       }
//     })
//     .filter(item => item);
// };
