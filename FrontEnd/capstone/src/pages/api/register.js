/*
 * Author: Jiawei Zhou
 * Final Edit Date: 2024/07/03
*/

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      console.log('Received registration request:', req.body); // 添加日志

      const response = await fetch('http://54.153.66.233/user/register', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });

      const data = await response.json();
      console.log('Response status:', response.status, 'Response OK:', response.ok, 'Data code:', data.code, 'Data message:', data.message);

      const isSuccess = data.code === 200;
      const message = isSuccess ? 'Registration successful' : data.message || 'Registration failed';
      console.log('isSuccess:', isSuccess, 'message:', message); 

      res.status(200).json({ success: isSuccess, message, data: isSuccess ? data : null });
    } catch (error) {
      console.error('Server error:', error); // 添加日志
      res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
