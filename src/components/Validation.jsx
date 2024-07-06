import { useEffect, useState } from "react";

const Validation = () => {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const checkEmailVerification = () => {
        
    };

    // Call the function to check email verification status
    checkEmailVerification();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[96vh]">
      <div className="max-w-md px-6 py-8 bg-white shadow-lg rounded-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
        <p className="text-center mb-4">
          Check your inbox for a verification email. Click the verification link
          to complete your registration.
        </p>
      </div>
    </div>
  );
};

export default Validation;
