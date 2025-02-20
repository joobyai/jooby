import { NextApiRequest, NextApiResponse } from 'next';
import { serialize, parse } from 'cookie';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }

        const cookie = serialize('id', String(id), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            sameSite: 'strict',
            path: '/',
        });

        res.setHeader('Set-Cookie', cookie);
        return res.status(200).json({ message: 'ID saved in cookies' });
    } else if (req.method === 'GET') {
        const cookies = parse(req.headers.cookie || '');
        const id = cookies.id;

        if (!id) {
            return res.status(404).json({ message: 'ID not found in cookies' });
        }

        return res.status(200).json({ id });
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
};

export default handler;