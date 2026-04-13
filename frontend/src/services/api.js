import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const saveMessage = async (text) => {
  try {
    const response = await api.post('/message', { text });
    return response.data;
  } catch (error) {
    console.error('Error saving message:', error);
    throw error;
  }
};

export const getMessages = async () => {
  try {
    const response = await api.get('/message');
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

export const deleteMessage = async (id) => {
  try {
    const response = await api.delete(`/message/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting message:', error);
    throw error;
  }
};
