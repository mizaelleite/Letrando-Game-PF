// JavaScript - Salvo em um arquivo separado chamado 'main.js'
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

    const palavraFormada = (() => {
        let valor = '';
        return {
            obter: () => valor,
            adicionar: (letra) => {
                valor += letra;
                return valor;
            },
            resetar: () => {
                valor = '';
                return valor;
            }
        };
    })();

    // Adicionando eventos de clique para formar a palavra
    letrasSelecionadas.forEach((letra, index) => {
        document.getElementById(`letra-${index}`).addEventListener('click', () => {
            palavraFormada.adicionar(letra);
            renderizarPalavraFormada(palavraFormada.obter());
        });
    });

    // Verificando a palavra quando o jogador clicar em "Verificar"
    document.getElementById('verificar').addEventListener('click', () => {
        if (verificarPalavra(palavraFormada.obter(), palavrasValidas, letraObrigatoria)) {
            alert('Parabéns! Você formou uma palavra correta!');
        } else {
            alert('A palavra não é válida ou não contém a letra obrigatória.');
        }
        palavraFormada.resetar();
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

    const faseAtual = (() => {
        let valor = 0;
        return {
            obter: () => valor,
            incrementar: () => {
                valor += 1;
                return valor;
            }
        };
    })();

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
    document.getElementById('proxima-fase').addEventListener('click', iniciarProximaFase);
};

// Função para renderizar a palavra formada pelo jogador
const renderizarPalavraFormada = (palavra) => {
    document.getElementById('palavra-formada').innerText = palavra;
};

// Inicializando o jogo quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    iniciarJogo();
});