import jwt from 'jsonwebtoken';

export const authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized User' });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
        } catch (error) {

            console.log(error);
            

            res.status(401).send({ message: 'Please authenticate.' });
            }
}