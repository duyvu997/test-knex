const { Story } = require('../../models');

exports.seed = (knex) =>
  knex('stories')
    .del()
    .then(() => [
      {
        trip_id: 1,
        title: 'first trips',
        publisher: '39aee2d0-a875-417f-a6fe-fc68ae9c8787',
        published_at: '2022-03-12 13:45:14.226 +0700',
        background:
          'https://bsmedia.business-standard.com/_media/bs/img/article/2020-12/11/full/1607655600-5776.jpg',
        photos: [
          'https://bsmedia.business-standard.com/_media/bs/img/article/2020-12/11/full/1607655600-5776.jpg',
        ],
        contents: 'Contrary',
      },
      {
        trip_id: 2,
        title: 'first trips',
        publisher: '39aee2d0-a875-417f-a6fe-fc68ae9c8787',
        published_at: '2022-03-12 13:45:14.226 +0700',
        background:
          'https://bsmedia.business-standard.com/_media/bs/img/article/2020-12/11/full/1607655600-5776.jpg',
        photos: [
          'https://bsmedia.business-standard.com/_media/bs/img/article/2020-12/11/full/1607655600-5776.jpg',
        ],
        contents: 'Contrary',
      },
      {
        trip_id: 3,
        title: 'first trips',
        publisher: '39aee2d0-a875-417f-a6fe-fc68ae9c8787',
        published_at: '2022-03-12 13:45:14.226 +0700',
        background:
          'https://bsmedia.business-standard.com/_media/bs/img/article/2020-12/11/full/1607655600-5776.jpg',
        photos: [
          'https://bsmedia.business-standard.com/_media/bs/img/article/2020-12/11/full/1607655600-5776.jpg',
        ],
        contents: 'Contrary',
      },
    ])
    .then((newStories) =>
      Promise.all(newStories.map((story) => Story.create(story)))
    )
    .catch((err) => console.log('err: ', err));
