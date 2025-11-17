import {Title} from "react-head";
import {Link} from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import api from "../../api/axios";

const Register = () => {
const [isSubmitting, setSubmitting] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        
        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!username || !email || !password) {
            Swal.fire({
                icon: "warning",
                title: "Data tidak lengkap",
                text: "Harap isi username, email, dan password.",
            });
            return;
        }
        if (username.length < 3) {
            Swal.fire({
                icon: "warning",
                title: "Username terlalu pendek",
                text: "Minimal 3 karakter.",
            });
            return;
        }
        if (password.length < 6) {
            Swal.fire({
                icon: "warning",
                title: "Password terlalu pendek",
                text: "Minimal 6 karakter.",
            });
            return;
        }
    }
    return (
        <>
        <Title>Register</Title>
        <div className="min-h-screen flex items-center justify-center">
            <form action={handleRegister}
            className="bg-gradient rounded flex flex-col gap-5 shadow p-5 text-light"
            >
                <h1 className="text-center font-bold text-2xl">Register</h1>

                <div className="p-2 flex gap-2 border rounded">
                    <i class="bi bi-person-fill"></i>
                    <input type="text" name="username" placeholder="username" required />
                </div>
                <div className="p-2 flex gap-2 border rounded">
                    <i class="bi bi-envelope-fill"></i>
                    <input type="email" name="email" placeholder="email" required />
                </div>

                <div className="p-2 flex gap-2 border rounded">
                    <i class="bi bi-key-fill"></i>
                    <input type="password" name="password" placeholder="password" required />
                </div>

                <button type="submit" className="bg-blue-500 rounded p-3 text-white cursor-pointer hover:bg-blue-400" disabled={isSubmitting}>{isSubmitting? "Loading ..." : "Register"}</button>

                <Link to="/login" className="text-center">have account</Link>
            </form>
        </div>
        </>
    )
}

export default Register;