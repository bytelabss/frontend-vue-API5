import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import QuantidadeDeProcessoSeletivo from '@/components/QuantidadeDeProcessoSeletivo.vue'

// Mock do componente bar-chart (caso necessário)
vi.mock('@/components/BarChart.vue', () => ({
  name: 'BarChart',
  props: ['data', 'colors'],
  template: '<div></div>',
}))

describe('QuantidadeDeProcessoSeletivo', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(QuantidadeDeProcessoSeletivo)
  })

  it('deve renderizar o título corretamente', () => {
    const titulo = wrapper.find('h1.titulo')
    expect(titulo.text()).toBe('Quantidade de Contratações por Processo Seletivo')
  })

  it('deve renderizar as opções de mês e ano corretamente', () => {
    const meses = wrapper.findAll('select#mesInicial option')
    expect(meses.length).toBe(12) // 12 meses

    const anos = wrapper.findAll('select#anoInicial option')
    expect(anos.length).toBe(3) // 3 anos (2023, 2024, 2025)
  })

  it('deve mudar o valor de mesInicial ao selecionar uma nova opção', async () => {
    const selectMes = wrapper.find('select#mesInicial')
    await selectMes.setValue(5) // Selecionar maio
    expect(wrapper.vm.mesInicial).toBe(5)
  })

  it('deve chamar fetchData quando um filtro é alterado', async () => {
    const fetchDataSpy = vi.spyOn(wrapper.vm, 'fetchData')

    const selectAno = wrapper.find('select#anoInicial')
    await selectAno.setValue(2025)
    expect(fetchDataSpy).toHaveBeenCalled()
  })

  it('deve chamar exportExcel ao clicar no botão XLSX', async () => {
    const exportExcelSpy = vi.spyOn(wrapper.vm, 'exportExcel')

    const btnXlsx = wrapper.find('button:first-of-type')
    await btnXlsx.trigger('click')

    expect(exportExcelSpy).toHaveBeenCalled()
  })

  it('deve chamar exportPdf ao clicar no botão PDF', async () => {
    const exportPdfSpy = vi.spyOn(wrapper.vm, 'exportPdf')

    const btnPdf = wrapper.find('button:last-of-type')
    await btnPdf.trigger('click')

    expect(exportPdfSpy).toHaveBeenCalled()
  })

  
  it('deve tratar erro ao falhar na requisição fetchData', async () => {
    const errorMessage = 'Erro na requisição'
    global.fetch = vi.fn().mockRejectedValueOnce(new Error(errorMessage))

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    await wrapper.vm.fetchData()
    expect(consoleErrorSpy).toHaveBeenCalledWith('Erro ao buscar dados:', expect.any(Error))
  })
})