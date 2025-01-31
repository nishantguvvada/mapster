import api from './api';

export default {
  async getMap(mapId, token) {
    const params = token ? { token } : {};
    const { data } = await api.get(`/maps/${mapId}`, { params });
    return data.data;
  },

  async createMap(mapData) {
    const { data } = await api.post('/maps', mapData);
    return data.data;
  },

  async updateMap(mapId, updates) {
    const { data } = await api.patch(`/maps/${mapId}`, updates);
    return data.data;
  },

  async deleteMap(mapId) {
    await api.delete(`/maps/${mapId}`);
  }
};