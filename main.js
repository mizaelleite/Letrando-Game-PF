// Função para verificar se a palavra formada está na lista e contém a letra obrigatória
const verificarPalavra = (palavra, listaPalavras, letraObrigatoria) => 
    listaPalavras.includes(palavra) && palavra.includes(letraObrigatoria);

// Função para iniciar o jogo de acordo com a fase
const iniciarFase = (letrasSelecionadas, palavrasValidas, letraObrigatoria) => {
    // Renderizando as letras na tela
    document.getElementById('gamelocal').innerHTML = letrasSelecionadas
        .map((letra, index) => {
            const estiloDestaque = letra === letraObrigatoria ? 'destaque' : 'normal';
            return `<div class="w ${estiloDestaque}" id="letra-${index}">${letra}</div>`;
        })
        .join('');

    const palavraFormada = {
        valor: '',
        obter: function() {
            return this.valor;
        },
        adicionar: function(letra) {
            this.valor += letra;
            return this.valor;
        },
        apagarUltimaLetra: function() {
            this.valor = this.valor.slice(0, -1);  // Remove a última letra
            return this.valor;
        },
        resetar: function() {
            this.valor = '';
            return this.valor;
        }
    };

    // Removendo qualquer listener antigo para evitar duplicações
    const botaoVerificar = document.getElementById('verificar');
    const novoBotaoVerificar = botaoVerificar.cloneNode(true);
    botaoVerificar.parentNode.replaceChild(novoBotaoVerificar, botaoVerificar);

    const botaoApagar = document.getElementById('apagar-letra');
    const novoBotaoApagar = botaoApagar.cloneNode(true);
    botaoApagar.parentNode.replaceChild(novoBotaoApagar, botaoApagar);

    // Adicionando eventos de clique para formar a palavra de maneira funcional
    letrasSelecionadas.forEach((letra, index) => {
        document.getElementById(`letra-${index}`).addEventListener('click', () => {
            palavraFormada.adicionar(letra);
            renderizarPalavraFormada(palavraFormada.obter());
        });
    });

    // Verificando a palavra quando o jogador clicar em "Verificar"
    novoBotaoVerificar.addEventListener('click', () => {
        if (verificarPalavra(palavraFormada.obter(), palavrasValidas, letraObrigatoria)) {
            alert('Parabéns! Você formou uma palavra correta!');
        } else {
            alert('A palavra não é válida ou não contém a letra obrigatória.');
        }
        palavraFormada.resetar();
        renderizarPalavraFormada(palavraFormada.obter());
    });

    // Adicionando evento para apagar a última letra
    novoBotaoApagar.addEventListener('click', () => {
        palavraFormada.apagarUltimaLetra();
        renderizarPalavraFormada(palavraFormada.obter());
    });
};

// Função para iniciar o jogo
const iniciarJogo = () => {
    const fases = [
        {
            letras: ["a", "b", "o", "r", "t", "l", "h"],
            palavrasValidas: ["aborto", "talho", "torta", "lata", "rolar", "toalha", "trabalho", "barato", "tralha", "botao"],
            letraObrigatoria: 't'
        },
        {
            letras: ["m", "a", "r", "t", "e", "o", "s"],
            palavrasValidas: ["marte", "metro", "mestre", "astro", "estar", "tomar", "resto", "aroma", "terra", "rastro"],
            letraObrigatoria: 'r'
        },
        {
            letras: ["a", "e", "l", "s", "t", "v", "o"],
            palavrasValidas: ["vaso", "selo", "salto", "esta", "estalo", "veste", "sol", "seta", "salvo", "selva"],
            letraObrigatoria: 's'
        }
    ];

    const faseAtual = {
        valor: 0,
        obter: function() {
            return this.valor;
        },
        incrementar: function() {
            this.valor += 1;
            return this.valor;
        }
    };

    const iniciarProximaFase = () => {
        if (faseAtual.obter() < fases.length) {
            const fase = fases[faseAtual.obter()];
            iniciarFase(fase.letras, fase.palavrasValidas, fase.letraObrigatoria);
            faseAtual.incrementar();
        } else {
            alert('Parabéns! Você completou todas as fases!');
        }
    };

    iniciarProximaFase();

    // Botão para avançar para a próxima fase
    const botaoProximaFase = document.getElementById('proxima-fase');
    const novoBotaoProximaFase = botaoProximaFase.cloneNode(true);
    botaoProximaFase.parentNode.replaceChild(novoBotaoProximaFase, botaoProximaFase);

    novoBotaoProximaFase.addEventListener('click', iniciarProximaFase);
};

// Função para renderizar a palavra formada pelo jogador
const renderizarPalavraFormada = (palavra) => {
    document.getElementById('palavra-formada').innerText = palavra;
};

// Inicializando o jogo quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    iniciarJogo();
});
