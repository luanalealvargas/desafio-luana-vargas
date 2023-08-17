class CaixaDaLanchonete {
    constructor() {
        this.pagamento = ["dinheiro", "debito", "credito"];

        this.cardapio = {cafe: 3.00, chantily: 1.50, suco: 6.20,
                         sanduiche: 6.50, queijo: 2.00, salgado: 7.25,
                         combo1: 9.50, combo2: 7.50,};
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (!this.pagamento.includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        const pedido = {};

        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');

            if (!this.cardapio[codigo]) {
                return "Item inválido!";
            }

            if (quantidade <=0) {
                return "Quantidade inválida!";
            }

            pedido[codigo] = (pedido[codigo] || 0) + parseInt(quantidade);
           
            if (pedido.chantily && !pedido.cafe) {
                return "Item extra não pode ser pedido sem o principal";
            }

            if (pedido.queijo && !pedido.sanduiche) {
                return "Item extra não pode ser pedido sem o principal";
            }    
        }

        let total = 0;

        for (const codigo in pedido) {
            total += this.cardapio[codigo] * pedido[codigo];
        }

        if (metodoDePagamento === "dinheiro") {
            total *= 0.95;
        } else if (metodoDePagamento === "credito") {
            total *= 1.03;
        }

        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };
