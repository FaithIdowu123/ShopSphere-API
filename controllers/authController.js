
exports.logout = (req, res) => {
    req.logout(() => res.json({ message: 'Logged out successfully' }));
};
