import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';  // Import mount from Vue Test Utils
import TempoMedioDeContratacaoPorVaga from '../TempoMedioDeContratacaoPorVaga.vue';

describe('TempoMedioDeContratacaoPorVaga - Métodos', () => {
    it('transformData deve transformar os dados corretamente em pares chave-valor', () => {
        // Monta o componente
        const wrapper = mount(TempoMedioDeContratacaoPorVaga);

        // Dados simulados
        const mockData = {
            'Vaga A': 12,
            'Vaga B': 20,
        };

        // Chama o método transformData
        wrapper.vm.transformData(mockData);  // Use wrapper.vm to access component methods

        // Verifica se chartData foi transformado corretamente
        expect(wrapper.vm.chartData).toEqual([  // Access component's data via wrapper.vm
            ['Vaga A', 12],
            ['Vaga B', 20],
        ]);
    });
});

