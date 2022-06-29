import styles from './Avatar.module.css';
//esse ponto de interrogação significa que é opcional
interface AvatarProps {
  hasBorder?: boolean;
  src: string;
  alt?: string;
}

export function Avatar({ hasBorder = true, src, alt }: AvatarProps) {
  return (
    <img className={hasBorder ? styles.avatarWithBorder : styles.avatar} src={src} alt={alt}/>
  )
}