import { decode } from 'deckstrings'
import HearthstoneJSON from 'hearthstonejson-client'
import { find } from 'lodash'

const hsjson = new HearthstoneJSON()
const hsJsonData = hsjson.get('26996')['hsjson-26996_enUS']

function getCardById(id) {
  const data = hsJsonData
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
  const deckCards = cardsIds.map(card => {
    const cardInfo = getCardById(card[0])
    cardInfo.count = card[1]

    return cardInfo
  })

  return deckCards
}

export { fetchAllCards }
