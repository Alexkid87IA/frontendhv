export default {
  name: 'clubFeature',
  title: 'Fonctionnalité du Club',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description courte de la fonctionnalité'
    },
    {
      name: 'icon',
      title: 'Icône',
      type: 'string',
      description: 'Nom de l\'icône Lucide (ex: Calendar, Brain, Shield, Users)',
      options: {
        list: [
          {title: 'Calendar', value: 'Calendar'},
          {title: 'Brain', value: 'Brain'},
          {title: 'Shield', value: 'Shield'},
          {title: 'Users', value: 'Users'},
          {title: 'Zap', value: 'Zap'},
          {title: 'Target', value: 'Target'},
          {title: 'Star', value: 'Star'}
        ]
      }
    },
    {
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Ordre d\'affichage dans la liste des fonctionnalités'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description'
    },
    prepare({title, subtitle}) {
      return {
        title,
        subtitle: subtitle ? subtitle.substring(0, 50) + '...' : ''
      }
    }
  }
}
