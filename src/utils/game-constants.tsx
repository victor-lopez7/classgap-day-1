function renderEmoji(emoji: string){
  return <div className="emoji">{ emoji }</div>
}

const MAIN_CHARACTER = {
  maxHealth: 100,
  attack: 20,
  display: renderEmoji('🧙'),
}

const ENEMY = { 
  maxHealth: 300,
  attack: 5,
  display: renderEmoji('🧟‍♂️')
}

const ITEM_INFO = {
  fixedPotion: { healing: 20, display: renderEmoji('🧀') },
  percentualPotion: { healing: .1, display: renderEmoji('🥧') },
  enemy: { display: renderEmoji('⚔️') },
}

export { MAIN_CHARACTER, ITEM_INFO, ENEMY }