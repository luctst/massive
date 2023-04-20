import formatDate from '@/utils/formatDate';
import formatTime from '@/utils/formatTime';
import formatUserName from '@/utils/formatUserName';

export default {
  formatDate,
  formatTime,
  formatUserName,
  populateUsersData: ['followers', 'followings', 'followings.articles', 'followings.articles.user', 'followings.articles.likes', 'followings.articles.comments', 'followings.media', 'followings.media.user', 'followings.media.likes', 'followings.media.comments', 'bookmarks_media', 'bookmarks_media.user', 'bookmarks_media.likes', 'bookmarks_media.comments', 'bookmarks_article', 'bookmarks_article.user', 'bookmarks_article.likes', 'bookmarks_article.comments', 'articles', 'articles.likes', 'articles.user', 'articles.comments', 'media', 'media.likes', 'media.comments', 'media.user']
}
