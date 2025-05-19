import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt / Description courte',
      type: 'text',
      rows: 4,
      description: 'Un résumé court et accrocheur de l\'article (max 240 caractères recommandés).',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: {type: 'category'},
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'format',
      title: 'Format',
      type: 'string',
      options: {
        list: [
          {title: 'Standard', value: 'standard'},
          {title: 'Amuse-bouche', value: 'amuse-bouche'},
          // Ajoutez d\'autres formats si nécessaire
        ],
        layout: 'radio', // ou 'dropdown'
      },
      initialValue: 'standard',
    }),
    defineField({
      name: 'isEssential',
      title: 'Is Essential?',
      type: 'boolean',
      initialValue: false,
      description: 'Marquer cet article comme essentiel ?',
    }),
    defineField({
      name: 'orderInEssentials',
      title: 'Order in Essentials',
      type: 'number',
      description: 'Ordre d\'affichage pour les articles essentiels (ex: 1, 2, 3...).',
      hidden: ({document}) => !document?.isEssential,
      validation: (Rule) => Rule.integer().positive(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      isEssential: 'isEssential',
      order: 'orderInEssentials',
    },
    prepare(selection) {
      const {author, isEssential, order} = selection
      let subtitle = author ? `by ${author}` : ''
      if (isEssential) {
        subtitle += ` (Essential ${order || ''})`
      }
      return {
        ...selection,
        subtitle: subtitle.trim(),
      }
    },
  },
})

