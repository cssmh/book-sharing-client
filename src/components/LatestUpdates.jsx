// LatestUpdates.jsx (updated)
import { motion } from "framer-motion";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import Banner from "../assets/notified.jpg";
import { postEmail } from "../Api/books";
import useDataQuery from "../Hooks/useDataQuery";

const LatestUpdates = () => {
  const { data, refetch } = useDataQuery(["userEmails"], "/emails");
  const existingEmails = data?.map((user) => user.email);
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState({ title: "", text: "", type: "" });

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();

    if (!emailRegex.test(email)) {
      setMessage({
        title: "Invalid Email",
        text: "Please enter a valid email address.",
        type: "error",
      });
      setIsOpen(true);
      return;
    }

    if (existingEmails?.includes(email)) {
      setMessage({
        title: "Already Subscribed",
        text: "This email has already been subscribed to our updates.",
        type: "warning",
      });
      setIsOpen(true);
      return;
    }

    try {
      const res = await postEmail(email);
      if (res?.insertedId) {
        setMessage({
          title: "Thank You!",
          text: `We'll send updates to ${email}`,
          type: "success",
        });
        setIsOpen(true);
        refetch();
        e.target.reset();
      }
    } catch {
      setMessage({
        title: "Error",
        text: "An error occurred. Please try again later.",
        type: "error",
      });
      setIsOpen(true);
    }
  };

  const getIcon = () => {
    switch (message.type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      default:
        return "ℹ️";
    }
  };

  return (
    <>
      <section
        className="relative py-16 md:py-24 rounded-2xl overflow-hidden my-8 mx-4 md:mx-auto container 2xl:max-w-[1370px]"
        style={{
          backgroundImage: `url(${Banner})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        <div className="relative z-10 px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Stay Updated with BookHaven
            </h2>
            <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
              Subscribe to get notified about new books, events, and community
              updates
            </p>

            <form
              onSubmit={handleSubmitEmail}
              className="flex flex-col md:flex-row gap-4 max-w-md mx-auto md:max-w-2xl"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-lg"
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <div className="text-center">
              <div className="text-2xl mb-2">{getIcon()}</div>
              <Dialog.Title className="text-lg font-bold text-gray-900 mb-2">
                {message.title}
              </Dialog.Title>
              <Dialog.Description className="text-gray-600 mb-4">
                {message.text}
              </Dialog.Description>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Got it
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default LatestUpdates;
