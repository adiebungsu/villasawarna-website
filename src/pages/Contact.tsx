import { useState } from 'react';
import SEO from '@/components/SEO';
import { MapPin, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';
import { buildHreflangAlternates } from '@/utils/seo';

const Contact = () => {
  const { toast } = useToast();
  const { t, i18n } = useTranslation('common');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: t('contact.toast.title', 'Message Sent!'),
        description: t('contact.toast.description', 'Thank you for contacting us. Our team will get back to you shortly.'),
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  // Structured data untuk halaman kontak
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": t('contact.seoName', 'Contact Villa Sawarna'),
    "description": t('contact.seoDescription', 'Contact the Villa Sawarna team for information and assistance with accommodation bookings at Sawarna Beach'),
    "url": "https://villasawarna.com/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "Villa Sawarna",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+62-838-7708-0088",
        "contactType": "customer service",
        "email": "layanan@villasawarna.com",
        "availableLanguage": ["Indonesian", "English"]
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title={t('contact.seoTitle', 'Contact Us | Villa Sawarna')}
        description={t('contact.seoMetaDescription', 'Contact Villa Sawarna for reservations, questions, or other assistance. We are ready to help you plan the perfect holiday in Sawarna.')}
        keywords={t('contact.seoKeywords', 'contact villa sawarna, contact us, reservation sawarna, booking sawarna, customer service sawarna')}
        url="https://villasawarna.com/contact"
        type="website"
        structuredData={structuredData}
        hreflangAlternates={buildHreflangAlternates('/contact')}
      />
      
      {/* Main Content */}
      <div className="flex-grow">
        {/* Hero Section */}
        <div className="relative">
          {/* Mobile Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center z-0 lg:hidden bg-[url('https://i.imgur.com/iEOR4l5.jpeg')]"
          ></div>
          {/* Desktop Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center z-0 hidden lg:block bg-[url('https://i.imgur.com/7a7zNZK.jpeg')]"
          ></div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 z-0"></div>
          
          <div className="relative z-10 container-custom py-24">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('contact.hero.title', 'Contact Us')}</h1>
              <p className="text-lg text-white/90 mb-4">
                {t('contact.hero.subtitle1', 'Have questions or need help? Our team is ready to help you find the perfect stay in Sawarna Beach.')}
              </p>
              <p className="text-lg text-white/90">
                {t('contact.hero.subtitle2', 'Please fill out the form or reach us via the contact information below.')}
              </p>
            </div>
          </div>
        </div>
        
        {/* Contact Info & Form */}
        <div className="bg-white dark:bg-gray-900 py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">{t('contact.info.title', 'Contact Information')}</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-ocean/10 dark:bg-ocean-light/20 rounded-full p-3 mr-4">
                      <MapPin className="text-ocean dark:text-ocean-light" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-white mb-1">{t('contact.info.addressTitle', 'Address')}</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {t('contact.info.address', 'Jl. Pantai Sawarna, Desa Sawarna, Kecamatan Bayah,\nKabupaten Lebak, Banten, Indonesia')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-ocean/10 dark:bg-ocean-light/20 rounded-full p-3 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ocean dark:text-ocean-light">
                        <path d="M3 21l1.9-5.7a8.5 8.5 0 113.8 3.8z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-white mb-1">WhatsApp</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        <a href="https://wa.me/6283877080088" className="hover:text-ocean dark:hover:text-ocean-light">+62 838 7708 0088</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-ocean/10 dark:bg-ocean-light/20 rounded-full p-3 mr-4">
                      <Mail className="text-ocean dark:text-ocean-light" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-white mb-1">Email</h3>
                      <p className="text-gray-600 dark:text-gray-300">layanan@villasawarna.com</p>
                      <p className="text-gray-600 dark:text-gray-300">booking@villasawarna.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-ocean/10 dark:bg-ocean-light/20 rounded-full p-3 mr-4">
                      <Clock className="text-ocean dark:text-ocean-light" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-white mb-1">{t('contact.info.hoursTitle', 'Opening Hours')}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{t('contact.info.hoursWeekdays', 'Monday - Friday: 08:00 - 20:00')}</p>
                      <p className="text-gray-600 dark:text-gray-300">{t('contact.info.hoursWeekend', 'Saturday - Sunday: 09:00 - 18:00')}</p>
                    </div>
                  </div>
                </div>
                
                {/* Map */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{t('contact.map.title', 'Our Location')}</h3>
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15824.663487606448!2d106.33015521908977!3d-6.977660063241462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e428e6e3d2ef643%3A0xf74cc7bd3c9c12ee!2sSawarna%20Beach!5e0!3m2!1sen!2sus!4v1692596444339!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      className="border-0"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={t('contact.map.ariaTitle', 'VillaSawarna Location Map')}
                    ></iframe>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div>
                <div className="bg-sky-50 dark:bg-gray-800 p-8 rounded-lg">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">{t('contact.form.title', 'Send a Message')}</h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {t('contact.form.fullName', 'Full Name')}
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder={t('contact.form.fullNamePlaceholder', 'Enter your full name')}
                          className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder={t('contact.form.emailPlaceholder', 'Enter your email')}
                            className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {t('contact.form.phone', 'Phone Number')}
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder={t('contact.form.phonePlaceholder', 'Enter your phone number')}
                            className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {t('contact.form.subject', 'Subject')}
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          placeholder={t('contact.form.subjectPlaceholder', 'Message subject')}
                          className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {t('contact.form.message', 'Message')}
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          required
                          placeholder={t('contact.form.messagePlaceholder', 'Write your message')}
                          className="resize-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="bg-coral hover:bg-coral-dark w-full flex items-center justify-center gap-2"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? t('contact.form.sending', 'Sending...') : t('contact.form.send', 'Send Message')}
                        {!isSubmitting && <Send size={18} />}
                      </Button>
                    </div>
                  </form>
                </div>
                
                {/* FAQ */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{t('contact.faq.title', 'Frequently Asked Questions')}</h3>
                  
                  <div className="space-y-4">
                    <div className="border-b border-gray-200 pb-4">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">{t('contact.faq.q1', 'How do I make a reservation?')}</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {t('contact.faq.a1', 'You can make a reservation through our website by selecting the desired property and following the steps, or by contacting our team via WhatsApp or email.')}
                      </p>
                    </div>
                    
                    <div className="border-b border-gray-200 pb-4">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">{t('contact.faq.q2', 'What is the difference between a villa and a homestay?')}</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {t('contact.faq.a2', 'Villas offer privacy and luxury with complete facilities and dedicated staff, while homestays offer local living experiences at more affordable prices.')}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">{t('contact.faq.q3', 'Is there a shuttle service from the station or airport?')}</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {t('contact.faq.a3', 'Yes, we provide shuttle services from the nearest train station or airport at an additional cost. Please contact us for more details.')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-ocean text-white py-16">
          <div className="container-custom text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">{t('contact.newsletter.title', 'Join Our Newsletter')}</h2>
              <p className="text-white/90 mb-8">
                {t('contact.newsletter.subtitle', 'Get the latest updates and exclusive offers for your holiday in Sawarna Beach delivered to your email.')}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <Input 
                  placeholder={t('contact.newsletter.placeholder', 'Your email address')} 
                  className="bg-white text-gray-800"
                />
                <Button className="bg-coral hover:bg-coral-dark whitespace-nowrap">
                  {t('contact.newsletter.subscribe', 'Subscribe')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
