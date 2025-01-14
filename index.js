const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const profiles = [
    {
        id:1,
        name:'Saad',
        desc:'I am BCA student',
        link:'shk-saad'
    },
    {
        id:2,
        name:'Mohammad',
        desc: 'I am BCA student',
        link:'mohammad'
    },
    {
        id:3,
        name:'Prince',
        desc:'I am BSCIT student',
        link:'prince.03d'
    },
    {
        id:4,
        name:'Nawaf',
        desc:'I am studying in 11th',
        link:'shk-nawaf'
    },
    {
        id:5,
        name:'Basheer',
        desc:'I am BCA student',
        link:'basheer-binte-battu   '
    },
    {
        id:6,
        name:'Tehseen',
        desc:'I am Post graduate',
        link:'myInsta-id'
    },
]

// '/' user kis naam se server access krenga uske liya slash daalte hai access
app.get('/',(req,res)=>{
    res.send('test 5')
})

// get all profile 

app.get('/profiles',(req,res)=>{
    res.send(profiles)
})

// params dynamic cheezo ke data ko store krke rkh ta hai

// get single profile
app.get('/profile/:id',(req,res)=>{
    const id =
     req.params.id;
    const profile = profiles.find((profile)=>{
        return profile.id == id
    })
    res.send(profile??'Not Found');
}) 

// create new profile
app.post('/profileCreate/',(req,res)=>{
    const profile = req.body;
    profiles.push(profile);
    res.status(200).json(profiles);
})

// update the old profile  
app.put('/profileUpdate/',(req,res)=>{
    const profile = req.body;
    const updateProfile = profiles.find((item)=>{
        return item.id == profile.id
    })
    res.status(200).json(updateProfile??'Not Found`');
    
})

app.listen('8000',()=>{
    console.log('Server is running on port 8000...')
})

//http methods

// 1. get => to get data

// 2. post => to save/create values

// 3. put/patch => to update data 

// 4. delete => to delete data