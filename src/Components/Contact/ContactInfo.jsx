import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const ContactInfo = () => {
  const contactInfo = [
    {
      icon: <FaPhone className="text-orange-500 text-xl" />,
      title: "Phone",
      value: "+880 1234 567890",
      link: "tel:+8801234567890"
    },
    {
      icon: <FaEnvelope className="text-orange-500 text-xl" />,
      title: "Email",
      value: "info@digitalxpress.com",
      link: "mailto:info@digitalxpress.com"
    },
    {
      icon: <FaMapMarkerAlt className="text-orange-500 text-xl" />,
      title: "Head Office",
      value: "123 Tech Avenue, Dhaka 1212, Bangladesh"
    },
    {
      icon: <FaClock className="text-orange-500 text-xl" />,
      title: "Working Hours",
      value: "Sunday-Thursday: 9AM - 6PM"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="space-y-8"
    >
      <h2 className="text-3xl font-bold mb-6">Contact Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contactInfo.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-orange-500 transition duration-300"
          >
            <div className="flex items-start space-x-4">
              <div className="bg-orange-500/20 p-3 rounded-full">
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                {item.link ? (
                  <a href={item.link} className="text-gray-300 hover:text-orange-400 transition">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-gray-300">{item.value}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ContactInfo;