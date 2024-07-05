/*
 * Author: Jiawei Zhou
 * Final Edit Date: 2024/07/04
*/

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }
  
  try {
    const API_URL = process.env.LOGIN_API_URL || 'http://54.153.66.233/user/login';
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    console.log('Response status:', response.status, 'Response OK:', response.ok, 'Data code:', data.code, 'Data message:', data.message);
  
    const isSuccess = data.code === 200;
    const message = isSuccess ? 'Login successful' : data.message || 'Login failed';
    console.log('isSuccess:', isSuccess, 'message:', message); 
    res.status(200).json({ success: isSuccess, message, data: isSuccess ? data : null });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' }).end(); 
  }
}