import request from 'supertest';
import app from '../../app.js';

jest.mock('../../services/empresaService.js', () => ({
  getAll: jest.fn()
}));

import empresaService from '../../services/empresaService.js';

describe('GET /empresa', () => {
  beforeAll(() => {
    process.env.API_URL = 'http://test.local';
  });

  it('deve retornar 200 e lista com campo imagem construído', async () => {
    const fake = [
      { id_empresa: '1', nome_empresa: 'X', cnpj: '123', imagem_path: '/uploads/empresas/x.png' },
      { id_empresa: '2', nome_empresa: 'Y', cnpj: '456', imagem_path: 'https://cdn.example.com/y.png' }
    ];
    empresaService.getAll.mockResolvedValue(fake);

    const res = await request(app).get('/empresa');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('imagem', 'http://test.local/uploads/empresas/x.png');
    expect(res.body[1]).toHaveProperty('imagem', 'https://cdn.example.com/y.png');
  });
});
