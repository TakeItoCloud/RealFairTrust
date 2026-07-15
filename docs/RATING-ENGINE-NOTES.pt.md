> **ESTADO: RASCUNHO — para discussão, não decidido.** Este documento reúne reflexões iniciais sobre como o motor de classificação da Fase 5 obteria os dados de cada sinal. Nada aqui está fechado. As perguntas em aberto no fim têm de ser respondidas antes de isto se tornar um plano efetivo.

# Motor de Classificação — Notas sobre a Origem dos Dados (RASCUNHO)

## Enquadramento
Isto é design de produto/modelo de dados da Fase 5, adiado desde a Fase 0 ("fórmulas exatas,
dimensão mínima da amostra — a definir"). É reflexão de design a preservar, não uma decisão a
fechar.

## A divisão central: sinais passivos vs. dependentes de resposta
Três dos cinco sinais podem ser medidos passivamente a partir de eventos da plataforma, sem
cooperação do cliente. Dois dependem da conclusão de uma ação (uma avaliação submetida, um
negócio fechado) — é aí que estão os problemas difíceis.

### Resposta (15%) — fácil, SE o canal de contacto for nosso
Mensurável apenas se o primeiro contacto passar pela RealFairTrust e o consultor responder
através da RealFairTrust. Se a conversa passar para o telefone/WhatsApp, ficamos às cegas.
Requisito: o formulário de lead cria um evento de lead com data/hora; a primeira resposta do
consultor acontece na plataforma (uma mensagem na aplicação ou, no mínimo, uma ação de "marcar
como contactado"). Tempo até à primeira resposta = data/hora da resposta − data/hora do lead.
CONSEQUÊNCIA DE DESIGN: a Fase 5 precisa de um mecanismo de mensagens na plataforma ou de uma
caixa de entrada de leads no painel do consultor, ou a Resposta é imensurável.

### Conversão (15%) — passivamente mensurável mas escorregadia na definição
Leads → clientes envolvidos. O "lead" é capturável (submissão de formulário). O "cliente
envolvido" é o problema: que evento o marca? Autodeclarado pelo consultor é manipulável. v1
realista: um marco observável que a plataforma controla (por exemplo, uma visita agendada, ou
um lead ativamente trabalhado vs. ignorado). Provavelmente o sinal com definição mais fraca até
haver transações; assinalar para redefinição depois de dados reais.

### Atividade (10%) — passivamente mensurável; na verdade uma barreira de confiança
Não é "recompensar agentes ocupados" — mede "dados suficientes para uma medição justa." É o
denominador que torna os outros sinais fiáveis. Contar as oportunidades tratadas (leads +
imóveis ativos + visitas) na janela de 90 dias. Baixa atividade → baixa confiança → "a construir
histórico." Simples: é contar eventos da plataforma.

### Taxa de fecho (25%) — precisa de um "fecho" para existir como dado
O fecho efetivo (escritura) acontece num notário, fora da plataforma. Três opções, por ordem
crescente de fiabilidade/custo:
1. O consultor autodeclara o fecho — barato, imediato, manipulável.
2. O cliente confirma o fecho (o fluxo de avaliação serve também de confirmação de fecho) —
   melhor, depende de o cliente responder.
3. Validação por transação confirmada — o fecho só conta quando associado a um evento
   confirmado, idealmente o REGISTO DE COMISSÃO. Como a RealFairTrust recebe uma parte da
   comissão, temos um registo financeiro dos fechos reais. Esse evento de comissão é a verdade
   fundamental (ground truth) e o nosso maior trunfo anti-manipulação — já existe no modelo de
   negócio. Quando o dinheiro flui para a RealFairTrust, aconteceu uma transação real.

### Satisfação (35%) — o maior peso, depende de os clientes responderem a um formulário
O problema mais difícil, com o maior peso. As taxas de resposta a avaliações no imobiliário são
tipicamente baixas. Três perigos distintos, cada um a exigir o seu próprio mecanismo:

- Perigo 1 — Amostras pequenas mentem. Um consultor com 2 avaliações a 5★ não é melhor do que um
  com 40 avaliações a 4,6★. Mecanismo: barreira de confiança (já a Decisão #18) + ENCOLHIMENTO
  BAYESIANO (Bayesian shrinkage) — puxar as pontuações de amostra reduzida para a média da
  plataforma até acumularem avaliações suficientes. Técnica-padrão (rankings de "estimativa
  bayesiana verdadeira"). Recomendada como método de agregação da satisfação.
- Perigo 2 — Viés de resposta. Quem responde tende para os extremos; as experiências intermédias
  ficam por registar. Não pode ser totalmente resolvido sem taxas de resposta mais altas, mas as
  taxas de resposta podem ser aumentadas: acionar o pedido no pico emocional (logo após o
  fecho/entrega das chaves), mantê-lo curto (quatro dimensões, um ecrã, mobile-first), associá-lo
  à transação, ponderar um incentivo não corruptor (um sorteio, não pagamento por avaliação, que
  compra viés positivo).
- Perigo 3 — O silêncio é ambíguo. 30 oportunidades, 1 avaliação: mau serviço ou clientes que não
  respondem? Impossível de saber só a partir da satisfação. É POR ISTO que os outros quatro
  sinais existem e porque a satisfação, apesar dos 35% de peso, nunca é a história toda. O tempo
  de resposta e a taxa de fecho são medidos a partir dos nossos eventos, independentemente de o
  cliente alguma vez preencher um formulário. Um consultor que nunca recebe avaliações mas
  responde depressa e fecha bem continua a pontuar em 65% do modelo. O design multi-sinal é, em
  si mesmo, a defesa contra a não-resposta às avaliações.

## Recomendado fechar agora (barato, evita retrabalho) — AINDA A CONFIRMAR
- O evento de comissão é o sinal de fecho como verdade fundamental (ground truth). Desenhar o
  esquema da Fase 5 de modo a que uma Transação possa ser criada a partir de / associada a um
  registo de comissão.
- A Resposta exige um ponto de contacto de primeiro contacto na plataforma (caixa de entrada de
  leads / "marcar como contactado"). Afeta a construção do painel, por isso decidir antes de o
  construir.
- A Satisfação usa encolhimento bayesiano (Bayesian shrinkage) + barreira de confiança, não
  médias simples.
- Os pedidos de avaliação disparam no momento do fecho, acionados pelo evento de fecho.

## Explicitamente adiado (precisa de dados reais para definir bem)
- A definição exata de conversão (que evento = "envolvido"). Lançar provisório, esperar rever.
- Os limiares de confiança (já adiados, Decisão #88).
- Limites de taxa anti-manipulação e deteção de anomalias (Fase 2+ do motor, já planeado).

## Ressalva honesta
Estas recomendações refletem a forma como os sistemas de ranking/reputação são geralmente
construídos. Os atuais valores de referência de avaliações no imobiliário português e números
específicos de plataformas NÃO foram verificados; não se afirma qualquer valor de taxa de
resposta. A ESTRUTURA é robusta independentemente dos números exatos: os sinais passivos
sustentam o modelo quando as avaliações são escassas; comissão = fecho como verdade fundamental;
encolhimento bayesiano (Bayesian shrinkage) para a satisfação. Os próprios números virão da
primeira coorte real.

## PERGUNTAS EM ABERTO — têm de ser respondidas antes de isto ser um plano efetivo
1. Está planeada uma mensageria / caixa de entrada de leads na plataforma para a Fase 5, ou
   assume-se que o contacto acontece fora da plataforma? (Decisivo — determina se a Resposta 15%
   é sequer mensurável.)
2. Que evento observável define um cliente "convertido / envolvido" para a Conversão 15%?
3. Confirmar que o registo de comissão pode servir de verdade fundamental do fecho, e como se
   associa a uma Transação no esquema.
4. Que controlos anti-manipulação são v1 vs. posteriores?
5. Mecânica do pedido de avaliação: gatilho de temporização, comprimento do formulário,
   incentivo (se algum)?
6. Confirmar o encolhimento bayesiano (Bayesian shrinkage) como método de agregação da
   satisfação, e definir (mais tarde) os limiares.
