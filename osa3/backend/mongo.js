const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('invalid arguments')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://Ulib0b:${password}@clustertest.tpkk5mr.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const objSchema = new mongoose.Schema({
  name: String,
  id: Number,
  number: String
})

const Obj = mongoose.model('Obj', objSchema)

if(process.argv.length == 5){



  const obj = new Obj({
    name: process.argv[3],
    id: Math.floor(Math.random() * 1000),
    number: process.argv[4]
  })

  obj.save().then(result => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
  })
}else if(process.argv.length==3){
  Obj.find({}).then(result => {
    result.forEach(obj => {
      console.log(obj.name +' '+ obj.number)
    })
    mongoose.connection.close()
  })

}
