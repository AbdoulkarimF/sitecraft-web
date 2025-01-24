import React, { useState } from 'react';

const ContactSection = ({ content, onEdit }) => {
  const defaultContent = {
    title: 'Contactez-Nous',
    subtitle: 'Nous sommes là pour vous aider',
    address: '123 Rue Example, 75000 Paris',
    email: 'contact@example.com',
    phone: '+33 1 23 45 67 89',
    formTitle: 'Envoyez-nous un message'
  };

  const { title, subtitle, address, email, phone, formTitle } = { ...defaultContent, ...content };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous pouvez ajouter la logique d'envoi du formulaire
    console.log('Form submitted:', formData);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 
            className="text-3xl font-bold mb-4"
            contentEditable
            onBlur={(e) => onEdit({ ...content, title: e.target.textContent })}
          >
            {title}
          </h2>
          <p 
            className="text-gray-600"
            contentEditable
            onBlur={(e) => onEdit({ ...content, subtitle: e.target.textContent })}
          >
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Informations de contact */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Nos Coordonnées</h3>
              <div className="space-y-4">
                <p 
                  className="flex items-center text-gray-600"
                  contentEditable
                  onBlur={(e) => onEdit({ ...content, address: e.target.textContent })}
                >
                  <span className="mr-3">📍</span> {address}
                </p>
                <p 
                  className="flex items-center text-gray-600"
                  contentEditable
                  onBlur={(e) => onEdit({ ...content, email: e.target.textContent })}
                >
                  <span className="mr-3">📧</span> {email}
                </p>
                <p 
                  className="flex items-center text-gray-600"
                  contentEditable
                  onBlur={(e) => onEdit({ ...content, phone: e.target.textContent })}
                >
                  <span className="mr-3">📞</span> {phone}
                </p>
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 
              className="text-xl font-semibold mb-6"
              contentEditable
              onBlur={(e) => onEdit({ ...content, formTitle: e.target.textContent })}
            >
              {formTitle}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">Nom</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
