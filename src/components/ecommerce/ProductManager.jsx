import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    images: [],
    variants: [],
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Simuler un appel API
      const mockProducts = [
        {
          id: 1,
          name: 'T-shirt Premium',
          description: 'T-shirt en coton bio',
          price: 29.99,
          stock: 100,
          category: 'Vêtements',
          images: ['tshirt1.jpg', 'tshirt2.jpg'],
          variants: [
            { size: 'S', color: 'Noir', stock: 30 },
            { size: 'M', color: 'Noir', stock: 40 },
            { size: 'L', color: 'Noir', stock: 30 },
          ],
        },
        // Autres produits...
      ];
      setProducts(mockProducts);
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error);
      toast.error('Erreur lors du chargement des produits');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (editingProduct) {
        // Mise à jour du produit
        const updatedProducts = products.map(p =>
          p.id === editingProduct.id ? { ...formData, id: p.id } : p
        );
        setProducts(updatedProducts);
        toast.success('Produit mis à jour avec succès');
      } else {
        // Création d'un nouveau produit
        const newProduct = {
          ...formData,
          id: Date.now(),
        };
        setProducts([...products, newProduct]);
        toast.success('Produit ajouté avec succès');
      }

      resetForm();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du produit:', error);
      toast.error('Erreur lors de la sauvegarde du produit');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowForm(true);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      return;
    }

    try {
      setLoading(true);
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProducts(products.filter(p => p.id !== productId));
      toast.success('Produit supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression du produit:', error);
      toast.error('Erreur lors de la suppression du produit');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      category: '',
      images: [],
      variants: [],
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleVariantAdd = () => {
    setFormData({
      ...formData,
      variants: [
        ...formData.variants,
        { size: '', color: '', stock: 0 }
      ],
    });
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...formData.variants];
    newVariants[index] = {
      ...newVariants[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      variants: newVariants,
    });
  };

  const handleVariantRemove = (index) => {
    setFormData({
      ...formData,
      variants: formData.variants.filter((_, i) => i !== index),
    });
  };

  if (loading && !showForm) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Gestion des Produits
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          {showForm ? 'Annuler' : 'Ajouter un Produit'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nom du produit
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Prix
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Stock
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Catégorie
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Variantes
            </label>
            {formData.variants.map((variant, index) => (
              <div key={index} className="flex items-center space-x-4 mb-4">
                <input
                  type="text"
                  value={variant.size}
                  onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                  placeholder="Taille"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  value={variant.color}
                  onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                  placeholder="Couleur"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <input
                  type="number"
                  value={variant.stock}
                  onChange={(e) => handleVariantChange(index, 'stock', parseInt(e.target.value))}
                  placeholder="Stock"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => handleVariantRemove(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  Supprimer
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleVariantAdd}
              className="text-indigo-600 hover:text-indigo-700"
            >
              + Ajouter une variante
            </button>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Enregistrement...' : editingProduct ? 'Mettre à jour' : 'Créer'}
            </button>
          </div>
        </form>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {products.map((product) => (
            <li key={product.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500">{product.description}</p>
                  <div className="mt-2">
                    <span className="text-sm font-medium text-gray-900">
                      Prix: {product.price}€
                    </span>
                    <span className="ml-4 text-sm text-gray-500">
                      Stock: {product.stock}
                    </span>
                    <span className="ml-4 text-sm text-gray-500">
                      Catégorie: {product.category}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-indigo-600 hover:text-indigo-700"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductManager;
