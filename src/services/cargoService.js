import { config } from '../config';
import { axiosInstance } from '../utils/api';

export const cargoServices = {
  async index(key) {
    const res = await axiosInstance.get(`${config.baseUrl}users/cargos`);
    return res;
  },
  async create(key, body = {}) {
    const res = await axiosInstance.post(`${config.baseUrl}users/cargos`, body);
    return res;
  },
  async pay(key, cargoId) {
    const res = await axiosInstance.post(`${config.baseUrl}users/cargos/${cargoId}/pay`);
    return res;
  },
};
