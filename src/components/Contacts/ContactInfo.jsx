import { MapPin, Phone, Mail, MessageCircle, Clock, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const ContactInfo = () => {
  const WHATSAPP_NUMBER = "+2347066277945";
  // Same rules and messages as before, now with react-hook-form + yup.
  const schema = yup.object({
    fullName: yup.string().trim().required("Full name is required"),
    phoneNumber: yup.string().trim().required("Phone number is required").matches(/^[0-9+\-\s()]{10,}$/, "Invalid phone number"),
    email: yup.string().trim().test("email", "Invalid email", (v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)),
    message: yup.string().trim().required("Message is required"),
  });
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { fullName: "", phoneNumber: "", email: "", message: "" },
  });

  const onSubmit = (formData) => {
    let whatsappMessage = `*New Enquiry from MOLEK Schools Website*\n\n`;
    whatsappMessage += `*Name:* ${formData.fullName}\n`;
    whatsappMessage += `*Phone:* ${formData.phoneNumber}\n`;
    if (formData.email) whatsappMessage += `*Email:* ${formData.email}\n`;
    whatsappMessage += `\n*Message:*\n${formData.message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    reset();
  };

  const inputClass = (err) => `w-full px-4 py-3 min-h-12 border-2 rounded-xl text-[17px] focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#1F3B6B] ${err ? 'border-red-700' : 'border-gray-300'}`;
  const Field = ({ id, label, type = "text", placeholder, autoComplete, textarea }) => (
    <div>
      <label htmlFor={id} className="block font-semibold text-[#2D2D2D] mb-2">{label}</label>
      {textarea ? (
        <textarea id={id} rows={5} placeholder={placeholder} aria-invalid={Boolean(errors[id])}
          aria-describedby={errors[id] ? `${id}-error` : undefined} className={`${inputClass(errors[id])} resize-none`} {...register(id)} />
      ) : (
        <input id={id} type={type} placeholder={placeholder} autoComplete={autoComplete} aria-invalid={Boolean(errors[id])}
          aria-describedby={errors[id] ? `${id}-error` : undefined} className={inputClass(errors[id])} {...register(id)} />
      )}
      {errors[id] && <p id={`${id}-error`} className="mt-1 font-semibold text-red-700">{errors[id].message}</p>}
    </div>
  );

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-[#FAFAFA] px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-7xl mx-auto">

        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-[#3B82F6]/10 px-6 py-2 rounded-full mb-4">
            <MessageCircle aria-hidden="true" className="w-5 h-5 text-[#1F3B6B]" />
            <span className="text-[#1F3B6B] font-semibold text-sm uppercase tracking-wider">Get in Touch</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1F3B6B] mb-4">Contact Information</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out through any of our contact channels.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <aside className="space-y-8">
            <article className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-[#3B82F6]/10">
                        <MapPin className="w-6 h-6 text-[#2563EB]" />
                    </div>
                    <h3 className="font-bold text-[#1F3B6B]">Address</h3>
                </div>
                <p className="text-gray-700">10 Haliru Muhammed Street, Off Old Osogbo-Ede Road, Ofatedo, Osun State</p>
            </article>

            <article className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-[#E85D5D]/10">
                        <Phone className="w-6 h-6 text-red-700" />
                    </div>
                    <h3 className="font-bold text-[#1F3B6B]">Phone</h3>
                </div>
                <p className="text-gray-700">+234 706 627 7945</p>
                <p className="text-gray-700">+234 803 359 7945</p>
            </article>

            <article className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-[#F9D89C]/20">
                        <Mail className="w-6 h-6 text-[#F9D89C]" />
                    </div>
                    <h3 className="font-bold text-[#1F3B6B]">Email</h3>
                </div>
                <p className="text-gray-700">info@molekschools.com</p>
            </article>

            <article className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-[#3B82F6]/10">
                        <Clock className="w-6 h-6 text-[#2563EB]" />
                    </div>
                    <h3 className="font-bold text-[#1F3B6B]">Office Hours</h3>
                </div>
                <p className="text-gray-700">Monday – Friday: 8:00 AM – 4:00 PM</p>
                <p className="text-gray-700">Saturday: 9:00 AM – 1:00 PM</p>
            </article>
          </aside>

          <section>
            <form noValidate onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-[#1F3B6B] mb-6">Send us a Message</h2>
                <div className="space-y-4">
                    {Field({ id: "fullName", label: "Full Name *", placeholder: "Enter your full name", autoComplete: "name" })}
                    {Field({ id: "phoneNumber", label: "Phone Number *", type: "tel", placeholder: "Enter your phone number", autoComplete: "tel" })}
                    {Field({ id: "email", label: "Email (Optional)", type: "email", placeholder: "Enter your email", autoComplete: "email" })}
                    {Field({ id: "message", label: "Message *", placeholder: "Enter your message or enquiry", textarea: true })}
                    <button type="submit"
                        className="w-full bg-[#25D366] text-[#1F3B6B] py-4 px-6 min-h-12 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#1F3B6B]">
                        <Send aria-hidden="true" className="w-5 h-5" />
                        Send via WhatsApp
                    </button>
                </div>
            </form>
          </section>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;