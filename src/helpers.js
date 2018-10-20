import { decode } from 'deckstrings'
import HearthstoneJSON from 'hearthstonejson-client'
import { find } from 'lodash'

function getCardById(id, data) {
  const cards = JSON.parse(data).cards

  const card = find(cards, { dbfId: id })

  return card
}

function decodeDeck(deckstring) {
  return decode(deckstring)
}

function fetchAllCards(code) {
  const deckData = decodeDeck(code)
  const cards = fetchDeckCards(deckData.cards)
  return cards
}

function fetchDeckCards(cardsIds) {
  let deckCards = []
  const hsjson = new HearthstoneJSON()

  hsjson.get(13619, function(cards) {
    deckCards = cardsIds.map(card => {
      const cardInfo = getCardById(card[0], cards)
      cardInfo.count = card[1]
      return cardInfo
    })
  })

  return deckCards
}

export { fetchAllCards }
