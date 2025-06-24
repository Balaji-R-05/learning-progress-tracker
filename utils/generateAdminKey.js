import jwt from 'jsonwebtoken';

const user = {
  id: '685aa169cebca281f8db9807',
  role: 'admin'
};

const token = jwt.sign(user, 'H8s92!dJkd#19Ls@3fKxZp@XjQr1AbcD', {
  expiresIn: '7d'
});

console.log('✅ Admin Token:', token);