import classnames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import Icon from '@/components/icon/Icon'
import styles from './index.module.scss'

type Props = {
  src: string
  className?: string
}
/**
 * 拥有懒加载特性的图片组件
 * @param {String} props.src 图片地址
 * @param {String} props.className 样式类
 */
const Image = ({ src, className }: Props) => {
  // 记录图片加载是否出错的状态
  const [isError, setIsError] = useState(false)

  // 记录图片是否正在加载的状态
  const [isLoading, setIsLoading] = useState(true)

  // 对图片元素的引用
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const img = imgRef.current!
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      if (isIntersecting) {
        img.src = img.getAttribute('data-src')!
        observer.unobserve(img)
      }
    })
    observer.observe(img)
    // 记得在组件卸载时移除监听
    return () => {
      observer.unobserve(img)
    }
  }, [])

  return (
    <div className={classnames(styles.root, className)}>
      {/* 正在加载时显示的内容 */}
      {isLoading && (
        <div className="image-icon">
          <Icon type="iconPhoto" />
        </div>
      )}

      {/* 加载出错时显示的内容 */}
      {isError && (
        <div className="image-icon">
          <Icon type="iconphoto-fail" />
        </div>
      )}

      {/* 加载成功时显示的内容 */}
      {!isError && (
        <img
          alt=""
          data-src={src}
          ref={imgRef}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsError(true)}
        />
      )}
    </div>
  )
}

export default Image
