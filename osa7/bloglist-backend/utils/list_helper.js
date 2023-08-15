
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if(blogs === undefined){
    return 0
  }else {  
    var likes = 0
    for (let i = 0; i < blogs.length; i++) {
      likes += blogs[i].likes;
      
    }

    return likes
  }
}

module.exports = {
  dummy, totalLikes, 
}