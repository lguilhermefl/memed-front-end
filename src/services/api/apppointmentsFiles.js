import api from "./api";

const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

// export function upload(appointmentFile, updateFile) {
//   const data = new FormData();

//   data.append("file", appointmentFile.file, appointmentFile.name);

//   return api.post(
//     "/appointments/files",
//     data,
//     {
//       onUploadProgress: (e) => {
//         const progress = parseInt(Math.round((e.loaded * 100) / e.total));
//         updateFile(appointmentFile.id, { progress });
//       },
//     },
//     config
//   );
// }
