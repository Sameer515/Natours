module.export = (fn) => (req, res, next) => {
    fn(req, res, next).catch(next);
};
