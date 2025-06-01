export default {
  name: 'debate',
  title: 'Débat',
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
      validation: Rule => Rule.required()
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
      name: 'image',
      title: 'Image principale',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'opinions',
      title: 'Opinions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'position',
              title: 'Position',
              type: 'string',
              options: {
                list: [
                  { title: 'Pour', value: 'Pour' },
                  { title: 'Contre', value: 'Contre' }
                ]
              },
              validation: Rule => Rule.required()
            },
            {
              name: 'author',
              title: 'Auteur',
              type: 'object',
              fields: [
                {
                  name: 'name',
                  title: 'Nom',
                  type: 'string',
                  validation: Rule => Rule.required()
                },
                {
                  name: 'role',
                  title: 'Rôle',
                  type: 'string'
                },
                {
                  name: 'image',
                  title: 'Photo',
                  type: 'image',
                  options: {
                    hotspot: true
                  }
                }
              ]
            },
            {
              name: 'arguments',
              title: 'Arguments',
              type: 'array',
              of: [{ type: 'string' }],
              validation: Rule => Rule.required().min(1)
            },
            {
              name: 'votes',
              title: 'Votes',
              type: 'number',
              initialValue: 0
            }
          ]
        }
      ],
      validation: Rule => Rule.required().min(2).max(2)
    },
    {
      name: 'moderator',
      title: 'Modérateur',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Nom',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'role',
          title: 'Rôle',
          type: 'string'
        },
        {
          name: 'image',
          title: 'Photo',
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    },
    {
      name: 'stats',
      title: 'Statistiques',
      type: 'object',
      fields: [
        {
          name: 'totalVotes',
          title: 'Total des votes',
          type: 'number',
          initialValue: 0
        },
        {
          name: 'comments',
          title: 'Nombre de commentaires',
          type: 'number',
          initialValue: 0
        },
        {
          name: 'shares',
          title: 'Nombre de partages',
          type: 'string',
          initialValue: '0'
        }
      ]
    },
    {
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      initialValue: (new Date()).toISOString()
    },
    {
      name: 'featured',
      title: 'Débat à la une',
      type: 'boolean',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image'
    }
  }
}
