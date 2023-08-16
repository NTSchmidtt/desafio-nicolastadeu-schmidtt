class CaixaDaLanchonete {
  calcularValorDaCompra(formaDePagamento, itens) {
    const cardapio = {
      cafe: { descricao: 'Café', valor: 3.00 },
      chantily: { descricao: 'Chantily', valor: 1.50 },
      suco: { descricao: 'Suco Natural', valor: 6.20 },
      sanduiche: { descricao: 'Sanduíche', valor: 6.50 },
      queijo: { descricao: 'Queijo', valor: 2.00 },
      salgado: { descricao: 'Salgado', valor: 7.25 },
      combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
      combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.50 },
    };

    let total = 0;
    let cafeCount = 0;

    if (formaDePagamento !== 'dinheiro' && formaDePagamento !== 'debito' && formaDePagamento !== 'credito') {
      return "Forma de pagamento inválida!";
    }

    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    const extraItemCodes = new Set(['chantily', 'queijo']); // Lista de códigos de itens extras

    for (const itemInfo of itens) {
      const [codigo, quantidade] = itemInfo.split(',');
      const item = cardapio[codigo];

      if (!item) {
        return "Item inválido!";
      }

      if (codigo === 'cafe') {
        cafeCount += parseInt(quantidade);
      }

      if (extraItemCodes.has(codigo)) {
        const [itemCodigo] = itemInfo.split(',');

        if (!itens.includes(`${itemCodigo},${quantidade}`)) {
          return "Item extra não pode ser pedido sem o principal";
        }
      }

      total += item.valor * parseInt(quantidade);
    }

    if (formaDePagamento === 'dinheiro') {
      total *= 0.95; // 5% de desconto
    } else if (formaDePagamento === 'credito') {
      total *= 1.03; // 3% de acréscimo
    }

    if (total === 0) {
      return "Quantidade inválida!";
    }

    return `R$ ${total.toFixed(2).replace('.', ',')}`;
  }
}

export { CaixaDaLanchonete };
