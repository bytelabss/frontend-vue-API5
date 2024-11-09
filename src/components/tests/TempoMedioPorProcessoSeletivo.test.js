// tests/TempoMedioPorProcessoSeletivo.spec.ts
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TempoMedioPorProcessoSeletivo from '../TempoMedioPorProcessoSeletivo.vue';

describe('TempoMedioPorProcessoSeletivo.vue', () => {
  beforeEach(() => {
    vi.resetAllMocks(); // Resetar todos os mocks antes de cada teste
  });

  it('deve renderizar corretamente', () => {
    const wrapper = mount(TempoMedioPorProcessoSeletivo);

    // Verifica se o título está correto
    expect(wrapper.find('h1.titulo').text()).toBe('Tempo Médio de Contratação por Processo Seletivo');

    // Verifica se os botões de exportação estão presentes
    expect(wrapper.findAll('button')).toHaveLength(2);
    expect(wrapper.find('button').text()).toBe('XLSX');
    expect(wrapper.findAll('button')[1].text()).toBe('PDF');
  });

  it('deve chamar fetchData apenas uma vez ao montar o componente', async () => {
    // Dados simulados para a resposta da API
    const mockData = [
      { nome: 'Processo 1', tempo_medio: 10 },
      { nome: 'Processo 2', tempo_medio: 20 },
    ];

    // Mock escopado para fetch
    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });
    global.fetch = mockFetch;

    const wrapper = mount(TempoMedioPorProcessoSeletivo);

    // Aguardar a montagem e a execução do fetchData
    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 0)); // Aguarda o processamento assíncrono

    // Verifica se o fetch foi chamado
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith('http://localhost:9090/api/fatoContratacoes?inicio=2023-01-04T00:00:00&fim=2024-01-30T00:00:00');

    // Verifica se a transformação dos dados ocorreu corretamente
    expect(wrapper.vm.chartData).toEqual({
      'Processo 1': 10,
      'Processo 2': 20,
    });
  });

  it('deve chamar a função exportExcel', async () => {
    const mockBlob = new Blob(['dummy data'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      blob: async () => mockBlob,
    });
    global.fetch = mockFetch;

    const wrapper = mount(TempoMedioPorProcessoSeletivo);
    const button = wrapper.find('button:first-of-type');

    // Simula o clique no botão XLSX
    await button.trigger('click');

    // Verifica se o fetch foi chamado para exportação
    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(mockFetch).toHaveBeenCalledWith('http://localhost:9090/api/excel/tempo', { method: 'GET' });
  });

  it('deve chamar a função exportPdf', async () => {
    const mockBlob = new Blob(['dummy data'], { type: 'application/pdf' });
    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      blob: async () => mockBlob,
    });
    global.fetch = mockFetch;

    const wrapper = mount(TempoMedioPorProcessoSeletivo);
    const button = wrapper.find('button:last-of-type');

    // Simula o clique no botão PDF
    await button.trigger('click');

    // Verifica se o fetch foi chamado para exportação
    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(mockFetch).toHaveBeenCalledWith('http://localhost:9090/api/pdf/tempo', { method: 'GET' });
  });
});
