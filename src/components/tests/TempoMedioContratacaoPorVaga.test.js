import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import TempoMedioDeContratacaoPorVaga from '../TempoMedioDeContratacaoPorVaga.vue'

describe('TempoMedioDeContratacaoPorVaga.vue', () => {
  // Mockando o método global fetch
  global.fetch = vi.fn()

  // Resetando mocks antes de cada teste
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve renderizar corretamente', () => {
    const wrapper = mount(TempoMedioDeContratacaoPorVaga)

    // Verifica se o título é renderizado corretamente
    expect(wrapper.find('h1.titulo').text()).toBe('Tempo Médio de Contratação por Vaga')

    // Verifica se os botões de exportação estão presentes
    expect(wrapper.findAll('button')).toHaveLength(2)
    expect(wrapper.find('button').text()).toBe('XLSX')
    expect(wrapper.findAll('button')[1].text()).toBe('PDF')
  })

  it('deve chamar fetchData', async () => {
    const mockData = { "vaga1": 10, "vaga2": 20 }
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    })

    const wrapper = mount(TempoMedioDeContratacaoPorVaga)

    // Aguardar o componente montar e executar o método fetchData
    await wrapper.vm.$nextTick() // Garantir que as promessas foram resolvidas

    // Verifica se o fetchData foi chamado apenas uma vez
    expect(global.fetch).toHaveBeenCalledTimes(1)  // Verifica que fetch foi chamado apenas uma vez
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:9090/api/fatoContratacoes/tempo-medio-por-vaga')
    

  })

  it('deve chamar a função exportExcel', async () => {
    const mockBlob = new Blob(['dummy data'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    global.fetch.mockResolvedValueOnce({
      ok: true,
      blob: async () => mockBlob
    })

    const wrapper = mount(TempoMedioDeContratacaoPorVaga)
    const button = wrapper.find('button:first-of-type')

    // Simula o clique no botão XLSX
    await button.trigger('click')

    // Verifica se o fetch foi chamado para exportação
    expect(global.fetch).toHaveBeenCalledTimes(2)
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:9090/api/excel/vagas', { method: 'GET' })
  })

  it('deve chamar a função exportPdf', async () => {
    const mockBlob = new Blob(['dummy data'], { type: 'application/pdf' })
    global.fetch.mockResolvedValueOnce({
      ok: true,
      blob: async () => mockBlob
    })

    const wrapper = mount(TempoMedioDeContratacaoPorVaga)
    const button = wrapper.find('button:last-of-type')

    // Simula o clique no botão PDF
    await button.trigger('click')

    // Verifica se o fetch foi chamado para exportação
    expect(global.fetch).toHaveBeenCalledTimes(2)
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:9090/api/pdf/vagas', { method: 'GET' })
  })
})
