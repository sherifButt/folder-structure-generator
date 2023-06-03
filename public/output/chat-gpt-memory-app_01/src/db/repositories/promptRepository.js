const Prompt = require('../db/models/prompt');

const promptRepository = {
  async getPrompts() {
    return await Prompt.findAll();
  },

  async createPrompt(prompt) {
    return await Prompt.create(prompt);
  },

  async updatePrompt(id, prompt) {
    const [rowsAffected, [updatedPrompt]] = await Prompt.update(prompt, {
      returning: true,
      where: { id },
    });
    return rowsAffected === 1 ? updatedPrompt : null;
  },
};

module.exports = promptRepository;
