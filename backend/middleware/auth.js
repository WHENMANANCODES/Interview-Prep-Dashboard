const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // 1. Frontend se token 'Authorization' header mein aayega: "Bearer <token>"
  const authHeader = req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "No token found, authorization denied" });
  }

  // 2. "Bearer " ko hata kar sirf pure token string ko nikalenge
  const token = authHeader.split(' ')[1];

  try {
    // 3. Token ko check karenge ki sahi hai ya nahi (using our JWT_SECRET)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Token sahi hai toh uske andar se user ki ID nikal kar request object mein daal denge
   // ❌ Pehle
req.user = decoded; // req.user.id = undefined!

// ✅ Ab
req.user = { id: decoded.userId }; // req.user.id = sahi ID! // Is req.user ke andar ab tumhari 'id' hogi (req.user.id)
    
    // 5. Agle function (controller) par jaane ki permission de do
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = auth;