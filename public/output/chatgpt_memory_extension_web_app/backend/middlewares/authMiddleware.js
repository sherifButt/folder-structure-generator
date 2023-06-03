



const protect = (handler) => async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  req.session = session;
  return handler(req, res);
};

module.exports = { protect };

