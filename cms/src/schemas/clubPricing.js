export default {
  name: 'clubPricing',
  title: 'Tarification du Club',
  type: 'document',
  fields: [
    {
      name: 'price',
      title: 'Prix',
      type: 'number',
      validation: Rule => Rule.required()
    },
    {
      name: 'period',
      title: 'Période',
      type: 'string',
      options: {
        list: [
          {title: 'Mensuel', value: 'month'},
          {title: 'Annuel', value: 'year'}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'isPromotion',
      title: 'Est une promotion',
      type: 'boolean',
      description: 'Cocher si ce tarif est une offre promotionnelle'
    },
    {
      name: 'promotionLabel',
      title: 'Label de promotion',
      type: 'string',
      description: 'Ex: Offre de lancement limitée'
    },
    {
      name: 'regularPrice',
      title: 'Prix régulier',
      type: 'number',
      description: 'Prix après la promotion'
    },
    {
      name: 'limitDescription',
      title: 'Description de la limite',
      type: 'string',
      description: 'Ex: Pour les 100 premiers membres uniquement'
    },
    {
      name: 'isActive',
      title: 'Est actif',
      type: 'boolean',
      description: 'Cocher pour afficher ce tarif sur le site'
    }
  ],
  preview: {
    select: {
      title: 'price',
      period: 'period',
      isPromo: 'isPromotion'
    },
    prepare({title, period, isPromo}) {
      return {
        title: `${title}€/${period === 'month' ? 'mois' : 'an'}`,
        subtitle: isPromo ? 'Offre promotionnelle' : 'Tarif standard'
      }
    }
  }
}
