// Sure, here's the code for mindmapRoutes.js:


 * @swagger
 * tags:
 *   name: Mind Maps
 *   description: API for mind maps
 */

/**
 * @swagger
 * /mindmaps:
 *   get:
 *     summary: Returns the list of all mind maps
 *     tags: [Mind Maps]
 *     responses:
 *       200:
 *         description: The list of all mind maps
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MindMap'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/mindmaps', async (req, res) => {
  try {
    const mindMaps = await MindMap.find({});
    res.status(200).json(mindMaps);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @swagger
 * /mindmaps/{id}:
 *   get:
 *     summary: Returns the mind map with the specified ID
 *     tags: [Mind Maps]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the mind map to retrieve
 *     responses:
 *       200:
 *         description: The mind map with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MindMap'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Mind map not found
 */
router.get('/mindmaps/:id', async (req, res) => {
  try {
    const mindMap = await MindMap.findById(req.params.id);
    if (!mindMap) {
      return res.status(404).json({ msg: 'Mind map not found' });
    }
    res.status(200).json(mindMap);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Mind map not found' });
    }
    res.status(500).send('Server Error');
  }
});

/**
 * @swagger
 * /mindmaps:
 *   post:
 *     summary: Creates a new mind map
 *     tags: [Mind Maps]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewMindMap'
 *     responses:
 *       200:
 *         description: The created mind map
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MindMap'
 *       400:
 *         description: Invalid request body
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/mindmaps', async (req, res) => {
  const { name, description, nodes } = req.body;

  if (!name || !description || !nodes) {
    return res.status(400).json({ msg: 'Please include name, description, and nodes' });
  }

  try {
    const newMindMap = new MindMap({
      name,
      description,
      nodes
    });

    const mindMap = await newMindMap.save();
    res.status(200).json(mindMap);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @swagger
 * /mindmaps/{id}:
 *   put:
 *     summary: Updates the mind map with the specified ID
 *     tags: [Mind Maps]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the mind map to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewMindMap'
 *     responses:
 *       200:
 *         description: The updated mind map
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MindMap'
 *       400:
 *         description: Invalid request body
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Mind map not found
 */
router.put('/mindmaps/:id', async (req, res) => {
  const { name, description, nodes } = req.body;

  if (!name || !description || !nodes) {
    return res.status(400).json({ msg: 'Please include name, description, and nodes' });
  }

  try {
    const mindMap = await MindMap.findByIdAndUpdate(
      req.params.id,
      { name, description, nodes },
      { new: true }
    );

    if (!mindMap) {
      return res.status(404).json({ msg: 'Mind map not found' });
    }

    res.status(200).json(mindMap);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Mind map not found' });
    }
    res.status(500).send('Server Error');
  }
});

/**
 * @swagger
 * /mindmaps/{id}:
 *   delete:
 *     summary: Deletes the mind map with the specified ID
 *     tags: [Mind Maps]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the mind map to delete
 *     responses:
 *       200:
 *         description: The deleted mind map
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MindMap'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Mind map not found
 */
router.delete('/mindmaps/:id', async (req, res) => {
  try {
    const mindMap = await MindMap.findByIdAndRemove(req.params.id);

    if (!mindMap) {
      return res.status(404).json({ msg: 'Mind map not found' });
    }

    res.status(200).json(mindMap);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Mind map not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
