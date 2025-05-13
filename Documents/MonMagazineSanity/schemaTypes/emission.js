 export default {
     name: 'emission',
     title: 'Émission',
     type: 'document',
     fields: [
       {
         name: 'title',
         title: 'Titre de l\u0027émission',
         type: 'string',
         validation: (Rule) => Rule.required().error('Un titre est requis.'),
       },
       {
         name: 'description',
         title: 'Description courte',
         type: 'text',
         rows: 3,
       },
       {
         name: 'coverImage',
         title: 'Image de couverture (paysage)',
         type: 'image',
         options: {
           hotspot: true,
         },
         validation: (Rule) => Rule.required().error('Une image de couverture est requise.'),
       },
       {
         name: 'slug',
         title: 'Slug (URL)',
         type: 'slug',
         options: {
           source: 'title',
           maxLength: 96,
         },
         validation: (Rule) => Rule.required().error('Un slug est requis pour l\u0027URL.'),
       },
       {
         name: 'duration',
         title: 'Durée de la vidéo (ex: 48:22)',
         type: 'string',
       },
       {
         name: 'publishedAt',
         title: 'Date de publication',
         type: 'datetime',
       },
       {
         name: 'videoUrlExternal',
         title: 'URL de la vidéo (externe, optionnel)',
         description: 'Si la vidéo est sur YouTube, Vimeo, etc.',
         type: 'url',
       },
       {
         name: 'detailedContent',
         title: 'Contenu détaillé de l\u0027émission (optionnel)',
         type: 'array',
         of: [{ type: 'block' }],
       },
     ],
     preview: {
       select: {
         title: 'title',
         media: 'coverImage',
       },
     },
   }
