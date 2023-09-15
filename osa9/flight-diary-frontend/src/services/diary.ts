import axios from 'axios';
import { Diary } from '../types';
const baseUrl = 'http://localhost:3001/api/diaries';

const getAll = async () => {
  const res = await axios.get<Diary[]>(baseUrl);
  return res.data;
};

const create = async (diary: object) => {
  const res = await axios.post<Diary>(baseUrl, diary);
  return res.data;
};

export default { getAll, create };