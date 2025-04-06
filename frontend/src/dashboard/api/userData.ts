import axios from 'axios';
import { UserData } from '../types/UserData';

export const fetchUserData = async (): Promise<UserData> => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.get('http://localhost:5000/api/user/data', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // The shape of the response must match your UserData type
    return response.data as UserData;
  } catch (error: any) {
    console.error('Failed to fetch user data:', error.response?.data || error.message);
    throw new Error('Unable to fetch user data');
  }
};
