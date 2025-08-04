import { motion } from 'framer-motion';

const FAQSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-800/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Can't find what you're looking for? Check out these common questions.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {[
            {
              question: "What are your customer support hours?",
              answer: "Our customer support team is available Sunday through Thursday from 9:00 AM to 6:00 PM (GMT+6)."
            },
            {
              question: "How can I track my order?",
              answer: "Once your order ships, you'll receive a tracking number via email that you can use to monitor your package's journey."
            },
            {
              question: "What payment methods do you accept?",
              answer: "We accept all major credit/debit cards, mobile banking (bKash, Nagad, Rocket), and cash on delivery."
            },
            {
              question: "Do you offer international shipping?",
              answer: "Currently, we only ship within Bangladesh. We're working to expand our shipping options in the future."
            }
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-700/50 border border-gray-600 rounded-xl overflow-hidden"
            >
              <details className="group">
                <summary className="list-none p-6 cursor-pointer flex justify-between items-center">
                  <h3 className="text-lg font-medium">{faq.question}</h3>
                  <span className="text-orange-500 group-open:rotate-180 transition-transform duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 pt-0 text-gray-300">
                  {faq.answer}
                </div>
              </details>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;