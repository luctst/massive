import users from '@/mocks/user';
import medias from '@/mocks/medias';
import comments from '@/mocks/comments';

const { user1, user2} = users;
const { media1, media2, article1, article2 } = medias;

// Add comments to medias
media1.comments?.push(comments.comment1);
media1.comments?.push(comments.comment3);

media2.comments?.push(comments.comment2);

article1.comments?.push(comments.comment1);
article1.comments?.push(comments.comment2);

// Add followers to users
user1.followers?.push(user2);
user1.following?.push(user2);
user2.following?.push(user1);
user2.followers?.push(user1);

// Add comments to users
user1.comments?.push(comments.comment1);
user1.comments?.push(comments.comment3);
user1.comments?.push(comments.comment2);
user2.comments?.push(comments.comment2);

// Add medias to users
user1.media?.push(media1, article1);
user2.media?.push(media2);
user2.media?.push(article2);
user2.media?.push(article1);

export default {
  user1: user1,
  user2: user2,
  media1: media1,
  media2: media2,
  article1: article1,
  article2: article2,
};
