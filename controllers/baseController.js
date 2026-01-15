export function wrap(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export function crud(service, options = {}) {
  const idParam = options.idParam || "id";

  function getMethod(obj, ...names) {
    for (const n of names) {
      if (obj && typeof obj[n] === "function") return obj[n].bind(obj);
    }
    return null;
  }

  const findAllFn = getMethod(service, "findAll", "getAll");
  const findByIdFn = getMethod(service, "findById", "getById");
  const createFn = getMethod(service, "create");
  const updateFn = getMethod(service, "update", "patch");
  const removeFn = getMethod(service, "remove", "delete");

  return {
    create: wrap(async (req, res) => {
      const result = await createFn(req.body);
      return res.status(201).json(result);
    }),

    findAll: wrap(async (req, res) => {
      const result = await findAllFn(req.query);
      return res.json(result);
    }),

    getById: wrap(async (req, res) => {
      const id = req.params[idParam];
      const result = await findByIdFn(id);
      return res.json(result);
    }),

    update: wrap(async (req, res) => {
      const id = req.params[idParam];
      const result = await updateFn(id, req.body);
      return res.json(result);
    }),

    remove: wrap(async (req, res) => {
      const id = req.params[idParam];
      await removeFn(id);
      return res.status(204).send();
    })
  };
}
