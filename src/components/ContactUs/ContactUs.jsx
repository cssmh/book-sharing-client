const ContactUs = () => {
    return (
        <section className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-center mb-4 ">
                <h1 className="text-h-font font-bold text-3xl  mb-5">
                    Contact With Us
                </h1>
            </div>
            {/* Flex section */}
            <div className="flex justify-center flex-col lg:flex-row gap-11">
                {/* Address */}
                <div className="grid grid-cols-2 gap-1">
                    {/* Card 1 */}
                    <div className="card card-compact py-10 px-10  bg-yellow-100 rounded-lg">
                        <figure>
                            <img src="./images/address.png" alt="" />
                        </figure>
                        <div className="card-body items-center">
                            <h2 className="card-title text-h-font font-extrabold font-garamond">
                                Address
                            </h2>
                            <p className="text-p-font font-poppins text-center">
                                Tangail,<br></br>
                                Dhaka,Bangladesh.
                            </p>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="card card-compact py-10 px-10 rounded-none bg-[#F3F3F3]">
                        
                        <div className="card-body items-center">
                            <h2 className="card-title text-h-font font-extrabold font-garamond">
                               
                            </h2>
                            <p className="text-p-font font-poppins text-center">
                              
                                <br /> 
                            </p>
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div className="card card-compact py-10 px-10 rounded-none bg-[#F3F3F3]">
                        <figure>
                            <img src="./images/email.png" alt="" />
                        </figure>
                        <div className="card-body items-center">
                            <h2 className="card-title text-h-font font-extrabold font-garamond">
                               
                            </h2>
                            <p className="text-p-font font-poppins text-center">
                               
                                <br /> 
                            </p>
                        </div>
                    </div>
                    {/* Card 4 */}
                    <div className="card card-compact py-10 px-10  bg-red-200 rounded-lg">
                        <figure>
                            <img src="./images/address.png" alt="" />
                        </figure>
                        <div className="card-body items-center">
                            <h2 className="card-title text-h-font font-extrabold font-garamond">
                            Contact Info
                            </h2>
                            <p className="text-p-font font-poppins text-center">
                            Phone : +88027383,
                                <br />Email: book@share.com
                            </p>
                        </div>
                    </div>
                </div>
                {/* Send Message */}
                <div className="card w-full lg:max-w-lg px-2 lg:px-0">
                    <div className="card-body space-y-3 p-0">
                        <div className="form-control">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="py-5 pl-5 rounded-lg font-poppins bg-[#F3F3F3]"
                            />
                        </div>
                        <div className="form-control">
                            <input
                                type="text"
                                placeholder="Your Email"
                                className="py-5 pl-5 rounded-lg font-poppins bg-[#F3F3F3]"
                            />
                        </div>
                        <div className="form-control">
                            <input
                                type="text"
                                placeholder="Subject"
                                className="py-5 pl-5 rounded-lg font-poppins bg-[#F3F3F3]"
                            />
                        </div>
                        <div className="form-control">
                            <input
                                type="text"
                                placeholder="Your Message"
                                className="pt-5 pb-24 pl-5 rounded-lg font-poppins bg-[#F3F3F3]"
                            />
                        </div>
                        
                    </div>

                    <div className="text-center mt-4">
                        <button className="btn btn-primary btn-outline">Send Message</button>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default ContactUs;