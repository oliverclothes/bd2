// for card games
class poker_cards {
    deck
    constructor() {
        this.reset_deck()
    }
    take_random() {
        var index = Math.floor(Math.random() * this.deck.length)
        return this.deck.splice(index, 1)[0]
    }
    take_card(pos) {
        return array.splice(pos, 1)[0]
    }
    reset_deck() {
        this.deck = []
        for(var i = 0; i < 52; i++) {
            this.deck.push(i)
        }
    }
    bj(card) {
        var rank = card % 13
        if (rank == 0 || rank == 11 || rank == 12) return 10
        return rank
    }
    min_bj_value(cards) {
        var value = 0
        for (card of cards) {
            value += this.bj(card)
        }
        return value
    }
    best_bj_value(cards) {
        var min_value = this.min_bj_value(cards)
        if (min_value <= 11 && cards.indexOf(1) != -1) {
            return min_value + 10
        }
        return min_value
    }
    to_string(card) {
        var suit
        if (card < 13) {
            suit = "c"
        }
        else if (card < 26) {
            suit = "d"
        }
        else if (card < 39) {
            suit = "h"
        }
        else {
            suit = "s"
        }
        var rank
        if(card % 13 == 1) {
            rank = "a"
        }
        else if(card % 13 == 11) {
            rank = "j"
        }
        else if(card % 13 == 12) {
            rank = "q"
        }
        else if(card % 13 == 0) {
            rank = "k"
        }
        else {
            rank = card % 13
        }
        return suit + rank
    }
}