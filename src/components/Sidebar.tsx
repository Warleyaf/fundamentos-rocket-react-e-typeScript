import { PencilLine } from 'phosphor-react'
import { Avatar } from './Avatar';

import styles from './Sidebar.module.css';

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <img
        className={styles.cover}
        src="https://images.unsplash.com/photo-1503437313881-503a91226402?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=532&q=500"
      />

      <div className={styles.profile}>
        <Avatar src="https://github.com/maykbrito.png" />

        <strong>Warley Afonso</strong>
        <span>Web Developer</span>
      </div>

      <footer>
        <a href="#">
          <PencilLine size={20} /> {/* é o meu ícone que importei da biblioteca phosphor */}
          Editar seu perfil
        </a>
      </footer>
    </aside>
  )
}