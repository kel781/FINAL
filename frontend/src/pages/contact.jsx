import React, { useState } from "react";
import "../App.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (formData.name.length > 50) newErrors.name = "Name is too long";
    
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Valid email required";
    }
    
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty";
    if (formData.message.length > 500) newErrors.message = "Message is too long";
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess(false);
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Submitted:", formData);
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSuccess(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBlur = (field) => {
    const validationErrors = validate();
    setErrors({ ...errors, [field]: validationErrors[field] });
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>We'd love to hear from you! Please fill out the form below.</p>

      {success && (
        <div className="success-message">
          ✅ Message sent successfully! We'll get back to you soon.
        </div>
      )}

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            onBlur={() => handleBlur("name")}
            className={errors.name ? "error" : ""}
            aria-describedby="name-error"
          />
          {errors.name && (
            <p id="name-error" className="form-error" aria-live="assertive">
              {errors.name}
            </p>
          )}
        </div>

        <div className="form-group">
          <input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            onBlur={() => handleBlur("email")}
            className={errors.email ? "error" : ""}
            aria-describedby="email-error"
          />
          {errors.email && (
            <p id="email-error" className="form-error" aria-live="assertive">
              {errors.email}
            </p>
          )}
        </div>

        <div className="form-group">
          <textarea
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            onBlur={() => handleBlur("message")}
            className={errors.message ? "error" : ""}
            aria-describedby="message-error"
          />
          {errors.message && (
            <p id="message-error" className="form-error" aria-live="assertive">
              {errors.message}
            </p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}