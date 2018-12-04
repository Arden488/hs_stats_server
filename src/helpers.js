import { decode } from 'deckstrings'
import { find as _find } from 'lodash'
import fetch from 'node-fetch'

function getCardById(id, data) {
  const card = _find(data, { dbfId: id })
  return {
    cost: card.cost,
    dbfId: card.dbfId,
    id: card.id,
    name: card.name,
    type: card.type
  }
}

function decodeDeck(deckstring) {
  return decode(deckstring)
}

function fetchAllCards(code, cardsData) {
  const deckData = decodeDeck(code)

  return updateCardsData(deckData.cards, cardsData)
}

function updateCardsData(cardsIds, cardsData) {
  return cardsIds.map(card => {
    const cardInfo = getCardById(card[0], cardsData)
    cardInfo.count = card[1]
    return cardInfo
  })
}

function fetchDeckCards() {
  const request = fetch(
    'https://api.hearthstonejson.com/v1/latest/enUS/cards.json',
    {
      method: 'GET',
      mode: 'cors'
    }
  )

  return request
}

export { fetchAllCards, fetchDeckCards }
