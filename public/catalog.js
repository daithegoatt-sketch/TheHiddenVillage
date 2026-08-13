export const STORES = {
  accounts: {
    id: 'accounts',
    name: 'Account Emporium',
    shortName: 'Accounts',
    enterLabel: 'Enter Accounts',
    clerk: 'Mira',
    clerkRole: 'Account Keeper',
    building: 'timber',
    categories: [
      {
        id: 'genshin',
        name: 'Genshin Impact',
        subtitle: 'Teyvat accounts',
        mark: 'GI',
        keywords: ['genshin', 'genshin impact', 'teyvat'],
        products: [
          {
            id: 'gi-sandrone-yae',
            title: 'Sandrone + Yae Miko',
            price: '$42',
            badge: 'EU • AR 18',
            description: 'Fresh Europe account with Sandrone and Yae Miko. Story progress is intentionally low for players who want to explore themselves.',
            tags: ['Sandrone', 'Yae Miko', 'Europe', 'EU', 'AR18', 'fresh'],
            stock: '1 available'
          },
          {
            id: 'gi-skirk-furina',
            title: 'Skirk + Furina',
            price: '$35',
            badge: 'EU • AR 12',
            description: 'Low adventure-rank starter featuring Skirk and Furina, ready for early exploration.',
            tags: ['Skirk', 'Furina', 'Europe', 'EU', 'AR12', 'starter'],
            stock: '1 available'
          },
          {
            id: 'gi-mavuika-citlali',
            title: 'Mavuika + Citlali',
            price: '$58',
            badge: 'EU • AR 25',
            description: 'Europe account centered on Mavuika and Citlali with enough progression to skip the earliest grind.',
            tags: ['Mavuika', 'Citlali', 'Europe', 'EU', 'AR25'],
            stock: '1 available'
          },
          {
            id: 'gi-columbina-zibai',
            title: 'Columbina + Zi Bai',
            price: '$64',
            badge: 'EU • AR 34',
            description: 'Mid-progress account featuring Columbina and Zi Bai with a broader roster foundation.',
            tags: ['Columbina', 'Zi Bai', 'Europe', 'EU', 'AR34'],
            stock: '1 available'
          }
        ]
      },
      {
        id: 'mlbb',
        name: 'Mobile Legends',
        subtitle: 'MLBB accounts',
        mark: 'ML',
        keywords: ['mobile legends', 'mlbb', 'bang bang'],
        products: [
          {
            id: 'ml-mythic-skins',
            title: 'Mythic • 86 Skins',
            price: '$27',
            badge: 'SEA • Mythic',
            description: 'Mythic-ready Mobile Legends account with 86 skins and a flexible hero pool.',
            tags: ['Mythic', '86 skins', 'SEA', 'MLBB'],
            stock: '2 available'
          },
          {
            id: 'ml-collector',
            title: 'Collector Starter',
            price: '$49',
            badge: 'EU • 4 Collector',
            description: 'Cosmetic-focused account with four Collector skins and several Epic skins.',
            tags: ['Collector', 'Epic', 'Europe', 'EU', 'skins'],
            stock: '1 available'
          }
        ]
      },
      {
        id: 'codm',
        name: 'Call of Duty Mobile',
        subtitle: 'CODM accounts',
        mark: 'CD',
        keywords: ['codm', 'call of duty', 'call of duty mobile'],
        products: [
          {
            id: 'codm-legendary',
            title: 'Legendary Loadout',
            price: '$39',
            badge: 'Global • 5 Legendary',
            description: 'Global COD Mobile profile with five Legendary weapon blueprints.',
            tags: ['CODM', 'Legendary', 'Global', 'weapon'],
            stock: '1 available'
          }
        ]
      },
      {
        id: 'crk',
        name: 'Cookie Run Kingdom',
        subtitle: 'Kingdom accounts',
        mark: 'CR',
        keywords: ['cookie run', 'cookie run kingdom', 'crk'],
        products: [
          {
            id: 'crk-ancient',
            title: 'Ancient Collection',
            price: '$22',
            badge: 'Global • Late Game',
            description: 'Developed Cookie Run Kingdom account with a strong Ancient roster.',
            tags: ['CRK', 'Ancient', 'Global', 'late game'],
            stock: '1 available'
          }
        ]
      }
    ]
  },

  services: {
    id: 'services',
    name: 'Adventurer Guild',
    shortName: 'Game Services',
    enterLabel: 'Enter Services',
    clerk: 'Rowan',
    clerkRole: 'Guild Clerk',
    building: 'guild',
    categories: [
      {
        id: 'genshin-services',
        name: 'Genshin Services',
        subtitle: 'Exploration & progress',
        mark: 'GS',
        keywords: ['genshin', 'exploration', 'quests'],
        products: [
          {
            id: 'gi-exploration',
            title: 'Exploration Package',
            price: 'from $15',
            badge: 'Manual service',
            description: 'A configurable exploration service. Final scope and price can be selected before checkout.',
            tags: ['exploration', 'oculi', 'chests', 'genshin'],
            stock: 'Booking open'
          },
          {
            id: 'gi-questing',
            title: 'Quest Completion',
            price: 'from $10',
            badge: 'Manual service',
            description: 'Quest-progress service with scope selected per order.',
            tags: ['quests', 'story', 'world quest', 'genshin'],
            stock: 'Booking open'
          }
        ]
      },
      {
        id: 'ml-services',
        name: 'Mobile Legends Services',
        subtitle: 'Rank & coaching',
        mark: 'MS',
        keywords: ['mlbb', 'mobile legends', 'rank', 'coaching'],
        products: [
          {
            id: 'ml-coaching',
            title: '1-on-1 Coaching',
            price: '$18',
            badge: '60 minutes',
            description: 'One-hour gameplay review and coaching session focused on decisions, lane habits and drafting.',
            tags: ['MLBB', 'coaching', 'rank', 'review'],
            stock: 'Booking open'
          }
        ]
      }
    ]
  },

  subscriptions: {
    id: 'subscriptions',
    name: 'Arcane Subscriptions',
    shortName: 'Subscriptions',
    enterLabel: 'Enter Subscriptions',
    clerk: 'Elowen',
    clerkRole: 'Subscription Merchant',
    building: 'arcane',
    categories: [
      {
        id: 'gaming-subscriptions',
        name: 'Gaming Memberships',
        subtitle: 'Digital memberships',
        mark: 'GM',
        keywords: ['game pass', 'playstation', 'membership', 'subscription'],
        products: [
          {
            id: 'game-pass',
            title: 'Game Pass',
            price: 'from $12',
            badge: 'Digital delivery',
            description: 'Digital gaming membership. Region and duration are selected during order confirmation.',
            tags: ['game pass', 'xbox', 'membership', 'subscription'],
            stock: 'Available'
          },
          {
            id: 'ps-plus',
            title: 'PlayStation Plus',
            price: 'from $11',
            badge: 'Digital delivery',
            description: 'PlayStation membership options with region and duration confirmed before fulfillment.',
            tags: ['playstation', 'ps plus', 'membership', 'subscription'],
            stock: 'Available'
          }
        ]
      }
    ]
  },

  support: {
    id: 'support',
    name: 'Village Support',
    shortName: 'Support',
    enterLabel: 'Enter Support',
    clerk: 'Aster',
    clerkRole: 'Village Steward',
    building: 'support',
    categories: [
      {
        id: 'support-desk',
        name: 'Support Desk',
        subtitle: 'Choose what you need help with',
        mark: '?',
        keywords: ['support', 'order', 'payment', 'account'],
        products: [
          {
            id: 'support-order',
            title: 'Order Help',
            price: 'Support',
            badge: 'Ticket',
            description: 'For delivery questions, order status, or a problem with a completed purchase.',
            tags: ['order', 'delivery', 'status', 'support'],
            stock: 'Open a ticket'
          },
          {
            id: 'support-payment',
            title: 'Payment Help',
            price: 'Support',
            badge: 'Ticket',
            description: 'For checkout or payment questions. Never share passwords or card details in a support ticket.',
            tags: ['payment', 'checkout', 'support'],
            stock: 'Open a ticket'
          },
          {
            id: 'support-general',
            title: 'General Question',
            price: 'Support',
            badge: 'Ticket',
            description: 'Use this for anything that does not fit the other support categories.',
            tags: ['general', 'question', 'support'],
            stock: 'Open a ticket'
          }
        ]
      }
    ]
  }
};
