import { describe, it, expect } from 'vitest';
import TempoMedioDeContratacaoPorProcessoSeletivo from '@/components/TempoMedioDeContratacaoPorProcessoSeletivo.vue';

describe('TempoMedioDeContratacaoPorProcessoSeletivo - Métodos', () => {
    it('transformData deve transformar os dados corretamente', () => {
        // Instancia o componente
        const wrapper = new TempoMedioDeContratacaoPorProcessoSeletivo();
        
        // Dados simulados
        const mockData = [
            { nome: 'Processo A', tempo_medio: 10 },
            { nome: 'Processo B', tempo_medio: 15 },
        ];
        
        // Chama o método transformData
        wrapper.transformData(mockData);
        
        // Verifica se chartData foi transformado corretamente
        expect(wrapper.chartData).toEqual({
            'Processo A': 10,
            'Processo B': 15,
        });
    });
});
