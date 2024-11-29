import { describe, it, expect } from 'vitest';
import TempoMedioPorProcessoSeletivo from '../TempoMedioPorProcessoSeletivo.vue';
import { mount } from '@vue/test-utils';

describe('TempoMedioPorProcessoSeletivo - Métodos', () => {
    it('transformData deve transformar os dados corretamente', () => {
        // Instancia o componente
        const wrapper = mount (TempoMedioPorProcessoSeletivo);
        
        // Dados simulados
        const mockData = [
            { nome: 'Processo A', tempo_medio: 10 },
            { nome: 'Processo B', tempo_medio: 15 },
        ];
        
        // Chama o método transformData
        wrapper.vm.transformData(mockData);
        
        // Verifica se chartData foi transformado corretamente
        expect(wrapper.vm.chartData).toEqual({
            'Processo A': 10,
            'Processo B': 15,
        });
    });
});
