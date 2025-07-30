
import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");


  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const { id } = useParams();

  
  const handleApplication = async (e) => {
    e.preventDefault();
      const payload = {
    name,
    email,
    phone,
    address,
    coverLetter,
    resumeLink: resumeUrl,  // ✅ must match the backend key
    jobId: id,
  };
  console.log("payload:",payload);
  

    
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/application/post`,
        payload,
        {
          withCredentials: true,
          headers:{
            "Content-Type":"application/json",
          },
        }
      );

      // ✅ Reset form fields correctly
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResumeUrl("");

      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }

  return (
    <section className="application">
      <div className="container">
        <h3>Application Form</h3>
        <form onSubmit={handleApplication}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <textarea
            placeholder="CoverLetter..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />
            
            <input
              type="text"
              placeholder="resumeUrl"
                value={resumeUrl}
            onChange={(e) => setResumeUrl(e.target.value)}
            />
          <button type="submit">Send Application</button>
        </form>
      </div>
    </section>
  );
};

export default Application;
