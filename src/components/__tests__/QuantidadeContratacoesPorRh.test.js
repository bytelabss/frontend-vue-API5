import { mount } from '@vue/test-utils';
import QuantidadeContratacoesPorRh from '@/components/QuantidadeContratacoesPorRh.vue';
import { describe, it, expect, vi } from 'vitest'

global.fetch = vi.fn(); // Mock do fetch para simular as requisições

describe('QuantidadeContratacoesPorRh', () => {

  let wrapper  
  beforeEach(() => {
    fetch.mockClear();
    wrapper = mount(QuantidadeContratacoesPorRh)
  });

  it('renderiza corretamente os filtros e o gráfico', async () => {

    // Verifica se os filtros de mês e ano estão sendo renderizados corretamente
    const mesInicialSelect = wrapper.find('select#mesInicial');
    const anoInicialSelect = wrapper.find('select#anoInicial');
    const mesFinalSelect = wrapper.find('select#mesFinal');
    const anoFinalSelect = wrapper.find('select#anoFinal');
    
    expect(mesInicialSelect.exists()).toBe(true);
    expect(anoInicialSelect.exists()).toBe(true);
    expect(mesFinalSelect.exists()).toBe(true);
    expect(anoFinalSelect.exists()).toBe(true);
  });

  it('chama fetchData ao mudar os filtros', async () => {
    const mesInicialSelect = wrapper.find('select#mesInicial');
    const anoInicialSelect = wrapper.find('select#anoInicial');

    // Simula a alteração dos filtros
    await mesInicialSelect.setValue(3); // Muda mês inicial
    await anoInicialSelect.setValue(2025); // Muda ano inicial

    // Verifica se a função fetchData foi chamada após a alteração do filtro
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('?mesInicial=3&anoInicial=2025')
    );
  });

  it('chama a função fetchData ao montar o componente', async () => {
    
    // Espera o componente montar e chamar a função fetchData
    await wrapper.vm.$nextTick();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('?mesInicial=1&anoInicial=2024&mesFinal=12&anoFinal=2024')
    );
  });

  
});
