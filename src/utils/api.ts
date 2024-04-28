import {http} from './http';
import {TContactPayload} from './type';

export const getContacts = async () => {
  return await http.get('/contact');
};

export const getContactById = async ({id}: {id: string}) => {
  return await http.get(`/contact/${id}`);
};

export const createContact = async (payload: TContactPayload) => {
  return await http.post('/contact', payload);
};

export const editContact = async ({
  id,
  payload,
}: {
  id: string;
  payload: TContactPayload;
}) => {
  return await http.put(`/contact/${id}`, payload);
};

export const deleteContact = async ({id}: {id: string}) => {
  return await http.delete(`/contact/${id}`);
};
