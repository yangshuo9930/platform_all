import classnames from 'classnames'
import { useHistory } from 'react-router-dom'

import Icon from '@/components/icon/Icon'
import Image from '@/components/Image'

import styles from './index.module.scss'

type Props = {
  /**
   * 0 表示无图
   * 1 表示单图
   * 3 表示三图
   */
  type?: 0 | 1 | 3
  article: Article
}

const ArticleItem = ({ type = 0, article }: Props) => {
  return (
    <div className={styles.root}>
      <div className={classnames('article-content', type === 3 && 't3', type === 0 && 'none-mt')}>
        <h3>{article.title}</h3>
        {type !== 0 &&
          article.cover.images.map((item, index) => {
            return (
              <div className="article-imgs" key={index}>
                <div className="article-img-wrapper">
                  <Image src={item} />
                </div>
              </div>
            )
          })}
      </div>
      <div className={classnames('article-info', type === 0 && 'none-mt')}>
        <span>{article.aut_name}</span>
        <span>{article.comm_count} 评论</span>
        <span>{article.pubdate}</span>
        <span className="close">
          <Icon type="iconbtn_essay_close" />
        </span>
      </div>
    </div>
  )
}

export default ArticleItem
