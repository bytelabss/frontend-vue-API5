import { describe, it, expect } from 'vitest';
import TempoMedioDeContratacaoPorVaga from '@/components/TempoMedioDeContratacaoPorVaga.vue';

describe('TempoMedioDeContratacaoPorVaga - Métodos', () => {
    it('transformData deve transformar os dados corretamente em pares chave-valor', () => {
        // Instancia o componente
        const wrapper = new TempoMedioDeContratacaoPorVaga();

        // Dados simulados
        const mockData = {
            'Vaga A': 12,
            'Vaga B': 20,
        };

        // Chama o método transformData
        wrapper.transformData(mockData);

        // Verifica se chartData foi transformado corretamente
        expect(wrapper.chartData).toEqual([
            ['Vaga A', 12],
            ['Vaga B', 20],
        ]);
    });
});
