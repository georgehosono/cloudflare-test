import React, { useState, useEffect } from 'react'

const POST_URL = 'https://backend.georgehosono.workers.dev/posts'

function App() {
  return (
    <div>
      <Heading />
      <Posts />
    </div>
  );
}

function Heading() {
  return (
    <h1>Welcome to my social network!</h1>
  )
}

class Post extends React.Component {
  render() {
    const post = this.props.post
    return ((<span><div className='post'>
        <h2>{post.title}</h2>
        <h3>{post.username}</h3>
        <p>{post.content}</p>
    </div><br/></span>)
    )
  }
}

function Posts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const Submission = (
    <div>
        <p>Submit a post!</p>
        <form onSubmit={(event) => {sendPost(event)}}>
          <label>Title:</label><br/>
          <input type='text' name='title'/><br/>
          <label>Username:</label><br/>
          <input type='text' name='username'/><br/>
          <label>Content:</label><br/>
          <textarea name='content'/><br/>
          <input type='submit' value='Submit'/><br/>
        </form>
      </div>
  )
 
  async function sendPost(event) {
    event.preventDefault()
    const title = event.target.title.value
    const username = event.target.username.value
    const content = event.target.content.value

    let req = {
      'title': title,
      'username': username,
      'content': content
    }

    await fetch(POST_URL, {
      'method': 'POST',
      'body': JSON.stringify(req)
    })
    setLoading(true)
    getPosts()
  }

  async function getPosts() {
    console.log('getting posts')
    const data = await fetch(POST_URL, { Accept: "application/json" })
    const json = await data.json()
    setPosts(json)
    setLoading(false)
  }

  useEffect(function() {
    getPosts()
  }, [])

  let i = 0
  let postList = []
  if (loading) {
    postList.push(<p key='0'>Loading...</p>)
  } else {
    posts.forEach(function(post) {
      postList.push(<Post post={post} key={i} />)
      i++
    })
    postList.reverse()
  }

  return (
    <div>
      <div key='sumbission'>{Submission}</div>
      <div key='posts'>{postList}</div>
    </div>
  );
}



export default App;
