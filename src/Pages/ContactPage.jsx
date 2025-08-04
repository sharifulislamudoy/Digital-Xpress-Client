import ContactForm from "../Components/Contact/ContactForm";
import ContactHero from "../Components/Contact/ContactHero";
import ContactInfo from "../Components/Contact/ContactInfo";
import ContactMap from "../Components/Contact/ContactMap";
import FAQSection from "../Components/Contact/FAQSection";


const ContactPage = () => {
  return (
    <div className='min-h-screen bg-black text-white'>
      <div className="w-11/12 mx-auto">
        <ContactHero />
        
        {/* Contact Content */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <ContactInfo />
                <ContactMap />
              </div>
              <ContactForm />
            </div>
          </div>
        </section>

        <FAQSection />
      </div>
    </div>
  );
};

export default ContactPage;