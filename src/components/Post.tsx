import {format, formatDistanceToNow} from 'date-fns'; // adicionando a biblioteca de formataçãode datas que é o date-fns
import ptBr from 'date-fns/locale/pt-BR' 
import { useState } from 'react';

import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';

//ao invés de utilizar o props eu irei utilizar a desestruturação no lugar de props
export function Post({author, publishedAt, content}) { // dessa forma ai que uso a desestruturação

  const [comments, setComments] = useState([
    'Post muito legal o seu comentário!!'
  ]);

  const [newCommentText, setNewCommentText] = useState('')


  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBr,
  }) // adicionando a data, ver bilioteca do date-fns

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBr,
    addSuffix: true, // aqui meio que vai colocar o "há 8 dias" no para dizer quanto tempo foi publicado a minha postagem
  })

  const handleCreateNewComment = () => { // por padrão quando fazemos um submit no formulário do HTML, ele faz com que redirecione o usuário para uma página, mas queremos evitar isso, e pra fazer que um eventos padrão seja usado, utilizamos o event.preventDefault()
    event.preventDefault()

    setComments([...comments, newCommentText]); // aqui estou utilizando o spread operator que é ler os valores que ja existia e copia, e depois uso o comments.length + 1 que vai ler as posições do array e acrescentar mais 1
    setNewCommentText('')

  }

  function handleNewCommentChange() {
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value)  // o event.target vai me retornar o elemento text area, caso eu queira o valor da text area, eu coloco value no final, ficando dessa maneira "event.target.value". e coloquei esse event dentro da função setNewCommentText, que vai armazenar o valor na minha variável newCommentText.
  }

  function handleNewCommentInvalid() {
    event.target.setCustomValidity('Esse campo é obrigatório!!')
  }

  // função para deletar os comentários
  function deleteComment(commentToDelete) {
    //Imutabilidade -> as variáveis não sofrem mutação, nós criamos um novo valor (um novo espaço na memória)

    const commentsWithoutDeleteOne = comments.filter(comment => {
      return comment != commentToDelete;
    })

    setComments(commentsWithoutDeleteOne);
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
       
          {content.map(line => {
            if (line.type === 'paragraph') {
              return <p key={line.content}>{line.content}</p>;
            } else if (line.type === 'link') {
              return <p key={line.content}><a href="#">{line.content}</a></p>
            }
          })}

      </div>

      <form  onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name="comment"
          placeholder='Deixe seu comentário'
          value={newCommentText}
          onChange={handleNewCommentChange}  // aqui no onChange meio que vou monitorar toda vez que estiver uma mudança no conteúdo da minha text área, eu vou chamar essa função "handleNewCommentChange"
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button type='submit'>Publicar</button>
        </footer>


      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
          return<Comment key={comment} content={comment} onDeleteComment={deleteComment}/> // posso passar função para as propriedades também como dessa forma ai no deleteComment
        })}
      </div>
    </article>
  )
}