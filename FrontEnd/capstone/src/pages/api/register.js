/*
 * Author: Jiawei Zhou
 * Final Edit Date: 2024/07/03
*/

export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const response = await fetch('http://54.153.66.233/user/register', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(req.body),
        });
        if (response.ok) {
          res.status(200).json({ message: 'Registration successful' });
        } else {
          res.status(500).json({ message: 'Registration failed' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }