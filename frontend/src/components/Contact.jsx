import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from 'sweetalert2';

export default function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          Swal.fire({
            title: "Success",
            text: "Pesan berhasil dikirim!",
            icon: "success",
          });
          form.current.reset();
        },
        (error) => {
          console.error("Email Error:", error.text);
          Swal.fire({
            title: "Error",
            text: "Gagal mengirim pesan. Coba lagi.",
            icon: "error",
          });
        }
      );
  };

  return (
    <section id="contact" className="py-20 px-6 bg-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6" data-aos="zoom-in-up">
          Contact Me
        </h2>
        <p className="text-gray-400 mb-6" data-aos="zoom-in-up">
          Let’s work together! Fill the form below or reach me on social media.
        </p>
        <form ref={form} onSubmit={sendEmail} className="grid gap-4 text-left">
          <input
            type="text"
            name="from_name"
            placeholder="Your Name"
            className="p-3 rounded bg-gray-800 border border-gray-700"
            data-aos="zoom-in-up"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="p-3 rounded bg-gray-800 border border-gray-700"
            data-aos="zoom-in-up"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            className="p-3 rounded bg-gray-800 border border-gray-700"
            data-aos="zoom-in-up"
            rows="4"
            required
          ></textarea>
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-lg shadow"
            data-aos="zoom-in-up"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}