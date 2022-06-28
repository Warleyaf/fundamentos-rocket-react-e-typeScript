import { ThumbsUp } from 'phosphor-react';
import { Trash } from 'phosphor-react';
import { useState } from 'react';
import { Avatar } from './Avatar';
import styles from './Comment.module.css';

export function Comment({content, onDeleteComment}) {
  const [likeCount, setLikeCount] = useState(0);

  function handleDeleteComment() {
    console.log('deletar')

    onDeleteComment(content)
  }

  function handleLikeComment() {
    setLikeCount((state) => {
      return state + 1
    }); //Sempre que eu for atualizar uma informação e essa informação depende do valor que ela tinha anteriormente, ou seja dependa dela mesma é sempre bom utilizar esse padrão de funções
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/warleyaf.png" alt="" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Warley Afonso</strong>
              <time title="11 de Maio às 8:13h" dateTime='2022-06-12 18:19:00'>Cerca de 2h atrás</time>
            </div>

            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>

        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>

      </div>
    </div>

  )

}