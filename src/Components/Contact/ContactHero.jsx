import { motion } from 'framer-motion';

const ContactHero = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/10 to-blue-500/10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/tech-pattern.png')] opacity-10"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 relative z-10 text-center"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Get In <span className="text-orange-500">Touch</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
        >
          We'd love to hear from you! Whether you have questions about our products or need support, our team is ready to help.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default ContactHero;