

# PD_Re4OrganizadorDeInventario 

**Número da Lista**: 34<br>
**Conteúdo da Disciplina**: Programação dinâmica<br>

## Alunos
|Matrícula | Aluno |
| -- | -- |
| 200059947  | Pedro Henrique Muniz de Oliveira |
| 211030827  |  Leandro de Almeida Oliveira|

## Sobre
Este projeto implementa um sistema de otimização de inventário inspirado no jogo Resident Evil 4, utilizando o algoritmo da Mochila (Knapsack Problem) para maximizar o valor dos itens carregados respeitando o limite de peso da mochila. O sistema é desenvolvido usando HTML, CSS e JavaScript puro, oferecendo uma interface onde os usuários podem:

- Visualizar itens disponíveis com suas respectivas características (peso e valor)
- Adicionar novos itens ao sistema com imagens personalizadas
- Definir o peso máximo da mochila
- Otimizar automaticamente a seleção de itens para maximizar o valor total
- Reiniciar o inventário quando necessário

## Screenshots
![print1](/assets/images/RE4_1.jpeg)

![print2](/assets/images/RE4_2.jpeg)

![print3](/assets/images/RE4_3.jpeg)


## Vídeo da Apresentação

<a href="https://youtu.be/1nNxQzrrbno" target="_blank" rel="noopener noreferrer">Assista ao Vídeo da Apresentação</a>


## Instalação 
**Linguagem**: JavaScript<br>

**Pré-requisitos**:
Um navegador web 
Não é necessário instalar nenhuma dependência adicional, pois o projeto usa JavaScript vanilla

**Como executar**:
Você pode usar qualquer servidor HTTP simples. Por exemplo, com Python:
Code
CopyInsert
python -m http.server 8000
Ou usando o Node.js com um pacote como http-server:
Code
CopyInsert
npx http-server
Depois acesse http://localhost:8000 no seu navegador


## Uso
Após iniciar o servidor e acessar a aplicação no navegador:

1. O sistema já vem com alguns itens pré-cadastrados do universo de Resident Evil 4
2. Para adicionar um novo item:
   - Preencha o nome do item
   - Defina o peso (1 ou mais)
   - Defina o valor do item (1 ou mais)
   - Faça upload de uma imagem para o item
   - Clique em "Adicionar Item"
3. Para otimizar o inventário:
   - Ajuste o "Peso Máximo da Mochila" conforme desejado
   - Clique em "Otimizar Inventário"
   - O sistema selecionará automaticamente os itens que maximizam o valor total respeitando o limite de peso
4. Para reiniciar o inventário, clique em "Reiniciar"

Os itens selecionados serão exibidos na seção "Itens na Mochila", enquanto os itens disponíveis permanecerão na seção "Itens Disponíveis".

## Outros 
O deploy do projeto também foi feito no gitpages e está disponível pelo link: https://projeto-de-algoritmos-2024.github.io/PD_Re4OrganizadorDeInventario/



