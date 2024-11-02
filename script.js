document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("submit-button").addEventListener("click", function() {
        const title = document.getElementById("title").value;
        const cashValue = document.getElementById("cash-request").value.replace('R$', '').replace(',', '.');
        const gender = document.getElementById("options").value;
        const text = document.getElementById("body-request-text").value;

        const payload = {
            titulo: title,
            conteudo: text,
            diretor: 1,
            genero: [gender],
            status: "Em análise",
            data: new Date().toISOString(),
            valor: parseFloat(cashValue)
        };

        fetch('http://localhost:3000/criar-solicitacao', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na rede');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            alert("Solicitação enviada com sucesso!");
        })
        .catch(error => {
            console.error('Houve um problema com a solicitação:', error);
            alert("Erro ao enviar a solicitação.");
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const cashInput = document.getElementById('cash-request');

    // Define a função para formatar o valor
    function formatCashInput(value) {
        // Remove caracteres não numéricos
        value = value.replace(/[^\d]/g, '');

        // Se o valor estiver vazio, retorne apenas o prefixo
        if (value === '') {
            return 'R$';
        }

        // Garante que sempre haja pelo menos dois dígitos para os centavos
        let centavos = value.slice(-2); // Parte decimal
        let reais = value.slice(0, -2); // Parte inteira

        // Remove zeros à esquerda na parte inteira
        reais = reais.replace(/^0+/, '') || '0'; // Se ficar vazio, define como '0'

        // Formata a parte inteira com pontos
        const formattedReais = reais.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        // Garante que sempre haja dois dígitos para os centavos
        centavos = centavos.padStart(2, '0');

        // Retorna o valor formatado
        return `R$ ${formattedReais},${centavos}`;
    }

    // Adiciona um evento de entrada ao campo
    cashInput.addEventListener('input', function() {
        const currentValue = cashInput.value;
        // Atualiza o valor do campo de entrada
        cashInput.value = formatCashInput(currentValue);

        // Verifica se o valor é "R$ 0,00"
        if (cashInput.value === 'R$ 0,00') {
            cashInput.value = ''; // Reinicia para o placeholder padrão
        }
    });
});

