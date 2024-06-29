export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const response = await fetch('http://54.153.66.233/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });
      const data = await response.json();
      if (response.ok) {
        res.status(200).json({ message: 'Login successful', data });
      } else {
        res.status(500).json({ message: 'Login failed', error: data });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}