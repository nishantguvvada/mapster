'use client';

import { useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import api from '@/services/api';

export default function AddPlaceForm({ cityId, mapId, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'hotel',
    review: '',
    photos: [],
    coordinates: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/maps/${mapId}/cities/${cityId}/places`, formData);
      onClose();
    } catch (err) {
      alert('Error adding place');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
      <div className="flex items-center mb-4">
        <FiPlusCircle className="text-xl mr-2 text-blue-600" />
        <h3 className="text-lg font-semibold">Add New Place</h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          className="w-full p-2 border rounded"
          value={formData.type}
          onChange={(e) => setFormData({...formData, type: e.target.value})}
        >
          <option value="hotel">Hotel</option>
          <option value="restaurant">Restaurant</option>
        </select>
        <input
          type="text"
          placeholder="Place name"
          className="w-full p-2 border rounded"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <textarea
          placeholder="Your review"
          className="w-full p-2 border rounded"
          value={formData.review}
          onChange={(e) => setFormData({...formData, review: e.target.value})}
        />
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Place
          </button>
        </div>
      </form>
    </div>
  );
}