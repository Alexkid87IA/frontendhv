export default {
  name: 'universe',
  title: 'Univers Éditorial',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'string',
      description: 'Ex: Pour t\'inspirer'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description courte de l\'univers'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'gradient',
      title: 'Gradient',
      type: 'string',
      description: 'Classes Tailwind pour le gradient (ex: from-amber-500 to-orange-500)'
    },
    {
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Ordre d\'affichage dans la liste des univers'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'logo'
    }
  }
}
