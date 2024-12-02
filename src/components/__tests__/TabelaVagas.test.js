import { mount } from '@vue/test-utils';
import TabelaVagas from '@/components/VagasTable.vue';
import VagasTable from '@/components/VagasTable.vue';

// Mock da função fetch para simular a resposta da API
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      { id: 1, nome: 'Vaga 1', dataCriacao: '2023-01-01', requisitos: 'Requisito 1', status: 'Aberta' },
      { id: 2, nome: 'Vaga 2', dataCriacao: '2023-02-01', requisitos: 'Requisito 2', status: 'Fechada' },
      { id: 3, nome: 'Vaga 3', dataCriacao: '2023-03-01', requisitos: 'Requisito 3', status: 'Aberta' },
    ]),
  })
);

describe('TabelaVagas.vue', () => {

    let wrapper

    beforeEach(() => {
      wrapper = mount(VagasTable)
    })

  // Teste 1: Verifica se os dados são carregados corretamente
  it('carrega e exibe as vagas corretamente', async () => {

    // Espera o Vue processar a requisição e renderizar os dados
    await wrapper.vm.$nextTick();

    // Verifica se a chamada de fetch foi feita
    expect(fetch).toHaveBeenCalledTimes(1);

    // Verifica se as vagas foram renderizadas na tabela
    const rows = wrapper.findAll('tbody tr');
    expect(rows.length).toBe(3);
    expect(rows.at(0).text()).toContain('Vaga 1');
    expect(rows.at(1).text()).toContain('Vaga 2');
    expect(rows.at(2).text()).toContain('Vaga 3');
  });

  // Teste 2: Verifica a funcionalidade de ordenação por ID
  it('ordena as vagas pelo ID quando clicado no cabeçalho', async () => {

    // Espera os dados da API
    await wrapper.vm.$nextTick();

    // Clique para ordenar por 'id'
    await wrapper.find('th:nth-child(1)').trigger('click');

    // Verifica se a tabela foi ordenada
    const rows = wrapper.findAll('tbody tr');
    expect(rows.at(0).text()).toContain('Vaga 3');
    expect(rows.at(1).text()).toContain('Vaga 2');
    expect(rows.at(2).text()).toContain('Vaga 1');
  });

  // Teste 3: Verifica a funcionalidade de ordenação por Nome
  it('ordena as vagas pelo Nome quando clicado no cabeçalho', async () => {

    // Espera os dados da API
    await wrapper.vm.$nextTick();

    // Clique para ordenar por 'nome'
    await wrapper.find('th:nth-child(2)').trigger('click');

    // Verifica se a tabela foi ordenada por nome (ordem alfabética)
    const rows = wrapper.findAll('tbody tr');
    expect(rows.at(0).text()).toContain('Vaga 3');
    expect(rows.at(1).text()).toContain('Vaga 2');
    expect(rows.at(2).text()).toContain('Vaga 1');
  });

  // Teste 4: Verifica a funcionalidade de ordenação por Data de Criação
  it('ordena as vagas por Data de Criação quando clicado no cabeçalho', async () => {
    // Espera os dados da API
    await wrapper.vm.$nextTick();

    // Clique para ordenar por 'dataCriacao'
    await wrapper.find('th:nth-child(3)').trigger('click');

    // Verifica se a tabela foi ordenada por data (ordem crescente)
    const rows = wrapper.findAll('tbody tr');
    expect(rows.at(0).text()).toContain('Vaga 3'); // Primeira data mais antiga
    expect(rows.at(1).text()).toContain('Vaga 2');
    expect(rows.at(2).text()).toContain('Vaga 1');
  });

  // Teste 5: Verifica a alternância da ordem da ordenação
  it('alternar a ordem da ordenação ao clicar novamente no cabeçalho', async () => {

    // Espera os dados da API
    await wrapper.vm.$nextTick();

    // Clique para ordenar por 'nome' (ordem crescente)
    await wrapper.find('th:nth-child(2)').trigger('click');
    const rowsAsc = wrapper.findAll('tbody tr');
    expect(rowsAsc.at(0).text()).toContain('Vaga 3');

    // Clique novamente para ordenar por 'nome' (ordem decrescente)
    await wrapper.find('th:nth-child(2)').trigger('click');
    const rowsDesc = wrapper.findAll('tbody tr');
    expect(rowsDesc.at(0).text()).toContain('Vaga 1');
  });
});
