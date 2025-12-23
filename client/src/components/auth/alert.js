import Swal from "sweetalert2";

export const showAlert = (icon = "error", title = "Gagal", text = "Mohon maaf fitur belum tersedia") => {
  Swal.fire({
    icon,
    title,
    text,
  });
};