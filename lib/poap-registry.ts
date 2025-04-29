import { keccak256, toBytes } from 'viem'

const listCollection = (collection: {
  imageURL: string
  title: string
  cid: string
  symbol: string
}) => {
  // Calculate keccak256 hash
  const collectionId = keccak256(
    toBytes(collection.title + collection.symbol + collection.cid)
  )

  return {
    ...collection,
    collectionId
  }
}

export const POAP_BLOCKCHAIN_MANIAC = listCollection({
  imageURL: '/paths/poaps/chain-master.png',
  title: 'Blockchain Maniac',
  cid: 'bafkreiga6442s762uaxf5pp6e7jdglt25lriztmc6kc4c4pqotwqv3dqfe',
  symbol: 'LEBM'
})

export const POAP_LEMON_CAMPER = listCollection({
  imageURL: '/paths/poaps/camp1.png',
  title: 'Lemon Camper',
  cid: 'bafkreialoaeoek6bsjtmazdzxakwihicdaqs5knlrlhazr5bsp6nfkcycm',
  symbol: 'LECAMP'
})

export const POAP_STYLUS_DEV = listCollection({
  imageURL: '/paths/poaps/arbpoap.png',
  title: 'Arbitrum Stylus Dev',
  cid: 'bafkreihkdaq5le5djdgy5lag6s53al7qshknljad3sbuha6q24g7epfrfm',
  symbol: 'LADEV'
})

export const POAP_CAMPERS_YAY = listCollection({
  imageURL: '/paths/poaps/campers.png',
  title: 'Camp<>Lemon',
  cid: 'bafybeien26qys6ebyjcnays2ta4sb5mvbxzb5rbtsm4pzaqyvaqznubwyi',
  symbol: 'LEYAY'
})

export const POAP_BETA_TESTER = listCollection({
  imageURL: '/paths/poaps/beta-tester.png',
  title: 'Learning Path Beta Tester',
  cid: 'bafkreicw572nunu62mxyacku4dsbrhug5j6msgzgpgux3qx2chiiskutii',
  symbol: 'LEBETA'
})

export const POAP_LEMON_EXPLORER = listCollection({
  imageURL: '/paths/poaps/explorer.png',
  title: 'Lemon Explorer',
  cid: 'bafkreiebnevp34iwlydczsjj5ll4iu53bwwfbehzeqvth3woasexkmoete',
  symbol: 'LXPLR'
})

export const POAP_MARKET_MASTER = listCollection({
  imageURL: '/paths/poaps/mbasics.png',
  title: 'MarketCap Master',
  cid: 'bafkreidags7oi52qku2sn3k74y4chjhi5jxtu6uk35f5oobt7a5omogfia',
  symbol: 'LEMCM'
})

export const POAP_LEMON_VOYAGER = listCollection({
  imageURL: '/paths/poaps/lvy.png',
  title: 'Lemon Voyager',
  cid: 'bafkreiev7zwaowukeg4j4smshxojzsdtaih45dqwjqjdfesu4tnmsvm3ui',
  symbol: 'LESCV'
})