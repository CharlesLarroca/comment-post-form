const timeSince = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000)
  let interval = seconds / 31536000

  if(interval > 1){
    return Math.floor(interval)+' years ago'
  }

  interval = seconds / 2592000
  if(interval > 1){
    return Math.floor(interval)+' months ago'
  }

  interval = seconds / 86400
  if(interval > 1){
    return Math.floor(interval)+' days ago'
  }

  interval = seconds / 3600
  if(interval > 1){
    return Math.floor(interval)+' hours ago'
  }

  interval = seconds / 60
  if(interval > 1){
    return Math.floor(interval)+' minutes ago'
  }

  if(interval < 10){
    return 'just now'
  }

  return Math.floor(interval)+' seconds ago'
}

// Defined initial users
const users = {
  'alex1': {
    name: 'Alex Cooper',
    src: 'assets/alex.jpg'
  },
  'anna1': {
      name: 'Anna Smith',
      src: 'assets/anna.jpg'
  },
  'drew1': {
      name: 'Drew Parker',
      src: 'assets/drew.jpg'
  },
  'liliya': {
      name: 'Liliya Nováková',
      src: 'assets/liliya.jpg'
  }
}

//current legged user
const userLogged = users['alex1']

//initial comments
const comments = [
  {
      id: 1,
      text: 'I am on it, will get back to you at the end of the week &#128526.',
      author: users['liliya'],
      createdAt: '2023-09-03 12:00:00',
  },
  {
      id: 2,
      text: 'I will prepare Instagram strategy, Liliya will take care about Facebook.',
      author: users['anna1'],
      createdAt: '2023-09-03 11:00:00',
  },
  {
      id: 3,
      text: 'I would love to get on that marketing campaign &#128522;. What are the next steps?',
      author: users['drew1'],
      createdAt: '2023-09-02 10:00:00',
  },
]

const authedUser = document.querySelector('.authed-user')

const authorHTML = DOMPurify.sanitize(`<img class='avatar' src='${userLogged.src}' alt='${userLogged.name}'>`)

authedUser.innerHTML = authorHTML

const commentsWrapper = document.querySelector('.discussion-comments')


const createComment = (comment) => {
  const newDate = new Date(comment.createdAt)
  return DOMPurify.sanitize(`
  <div class='comment'>
    <div class='avatar'>
      <img class='avatar' src='${comment.author.src}' alt='${comment.author.name}'>
    </div>
    <div class='comment-body'>
      <div class='comment-author'>
        ${comment.author.name}
        <time datetime='${comment.createdAt}' class='comment-date'>
        ${timeSince(newDate)}
        </time>
      </div>
      <div class='comment-text'>
        <p>${comment.text}</p>
      </div>
    </div>
  </div>
  `)
}

//preparing comments to be insert on DOM
const commentsMapped = comments.map(comment => 
  createComment(comment))

const innerComments = commentsMapped.join('')
commentsWrapper.innerHTML = innerComments


const newCommentForm = document.querySelector('#newcomment-form')
const newCommentTextarea = document.querySelector('#newcomment-form textarea')

document.getElementById('reset-button').addEventListener('click', () =>{
  newCommentForm.reset()
})

const submitButton = document.querySelector('#submit-button')

newCommentForm.addEventListener('submit', (e) =>{
  e.stopPropagation()
  e.preventDefault()

  const newCommentTextareaValue = newCommentTextarea.value

  const newComment = {
    id: comments.length+1,
    text: newCommentTextareaValue,
    author: userLogged,
    createdAt: new Date(),
  }

  console.log(newComment)

  const comment = document.createElement('div')
  comment.innerHTML = createComment(newComment)

  if(commentsWrapper.hasChildNodes()){
    commentsWrapper.insertBefore(comment, commentsWrapper.childNodes[0])
  } else {
    commentsWrapper.appendChild(comment)
  }

  newCommentForm.reset()
})