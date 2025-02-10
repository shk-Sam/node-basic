const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose');

app.use(cors())
app.use(express.json())

// MongoDB connection (local)
const mongoURI = 'mongodb://localhost:27017/basic'; // Local MongoDB connection string

//{ useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(mongoURI,)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

  //database me jo field jaane wali hai usey define schema krti hai... in simple data me kya jaaega wo schema krta hai 
// MongoDB schema and model for profiles
const profileSchema = new mongoose.Schema({
    id: Number,
    name: String,
    desc: String,
    link: String
});

// Create a Profile model
const Profile = mongoose.model('Profile', profileSchema);


// const profiles = [
//     {
//         id:1,
//         name:'Saad',
//         desc:'I am BCA student',
//         link:'shk-saad'
//     },
//     {
//         id:2,
//         name:"Mohammad",
//         desc: "I am BCA student",
//         link:"mohammad"
//     },
//     {
//         id:3,
//         name:"Prince",
//         desc:"I am BSCIT student",
//         link:"prince.03d"
//     },
//     {
//         id:4,
//         name:'Nawaf',
//         desc:'I am studying in 11th',
//         link:'shk-nawaf'
//     },
//     {
//         id:5,
//         name:'Basheer',
//         desc:'I am BCA student',
//         link:'basheer-binte-battu   '
//     },
//     {
//         id:6,
//         name:'Tehseen',
//         desc:'I am Post graduate',
//         link:'myInsta-id'
//     },
// ]

const data = [
    {
        "id" : 1,
        "name" : "Saad",
        "address" : {
            "city" : "Mumbra",
            "state" : "Maha"
        },
        "images" : [
            "img1",
            "img2"
        ],
        "imagesWithKey" : [
            {
                "path" : "/image/",
                "name" : "img1"
            },
            {
                "path" : "/image/",
                "name" : "img2"
            }
        ]
    },
    {
        id : 2,
        name : 'basheer',
        address : {
            city : 'Mumbra',
            state : 'Maha'
        },
        images : [
            'img1',
            'img2'
        ],
        imagesWithKey : [
            {
                path : '/image/',
                name : 'img2'
            },
            {
                path : '/image/',
                name : 'img1'
            }
        ]
    },
    {
        id : 3,
        name : 'prince',
        address : {
            city : 'Mumbra',
            state : 'Maha'
        },
        images : [
            'img1',
            'img2'
        ],
        imagesWithKey : [
            {
                path : '/image/',
                name : 'img3'
            },
            {
                path : '/image/',
                name : 'img4'
            }
        ]
    }
]

// '/' user kis naam se server access krenga uske liya slash daalte hai access
app.get('/',(req,res)=>{
    res.send('test 5')
})

app.get('/home' , (req,res) => {
    const result = data.filter((item) => {
        // return item.images.includes("img3")
        const naam = item.imagesWithKey.findIndex((obj) => {
            return obj.name == 'img1'
        })
        if(naam == -1){
            return false;
        }
        else{
            return true; 
        }
    })
    res.send(result)
})

// get all profile 

app.get('/profiles', async (req,res)=>{
    const profiles = await Profile.find(); // Fetch all profiles from the database
    // console.log(profiles)
    res.send(profiles.length !==  0 ? profiles : [])
})

// params dynamic cheezo ke data ko store krke rkh ta hai

// get single profile
app.get('/profile/:id', async (req,res)=>{
    const newId = req.params.id;
    // Find profile by ID
    const profile = await Profile.findOne({ id: newId })
    // const profile = profiles.find((profile)=>{
    //     return profile.id == id
    // })
    res.send(profile??'Not Found');
}) 

// create new profile
app.post('/profileCreate/', async (req,res)=>{
    const profile = req.body;
    // Create a new profile and save it to MongoDB
    const newProfile = new Profile(profile);// create a new profile document 
    await newProfile.save()// save the profile to mongodb
    const profiles = await Profile.find(); // Fetch all profiles from the database
    // profiles.push(profile);
    res.status(201).json(profiles); // res.status(201) 201 create ke liye hai...
})

// update the old profile  
app.put('/profileUpdate/', async (req,res) => {
    const profile = req.body;
    const result = await Profile.updateOne(
        { id: profile.id },
        { $set: profile }
    );
    if (result.matchedCount === 0 )
        res.status(404).json('Not Found...');
    const profiles = await Profile.find();
    res.status(200).json(profiles);
    // const profileIndex = profiles.findIndex((item)=>{
    //     return item.id == newProfile.id
    // })
    // if(profileIndex == -1) {
    //     res.status(404).json('Not Found...');
    // }
    // // profiles of profileIndex niche wale ka fullform ye [] bracket ka matlab of hai 
    // profiles[profileIndex] = newProfile;
})

// ! isey not sign kehte hai

// delete the old profile delete
app.delete('/profileDelete/:id', async (req,res) => {
    const id = req.params.id;
    const profile = await Profile.findOneAndDelete({ id: id }); // Find and delete profile by id
    // const profileIndex = profiles.findIndex((item)=>{
    //     return item.id == id
    // })
    if(!profile) {
        res.status(404).json('Not Found...');
    }
    const profiles = await Profile.find(); // Fetch all profiles from the database 
    // profiles.splice(profileIndex, 1)
    res.status(200).json(profiles);
})

app.listen('8000',()=>{
    console.log('Server is running on port 8000...')
})

//http methods

// 1. get => to get data

// 2. post => to save/create values

// 3. put/patch => to update data 

// 4. delete => to delete data


// I want to ask 

// 1. async/ await :  koi bhi cheez ya operation  ko jb rokna hoto 
// async or await ka use krte hai ye zyada tar mongo ke liye kaam aata hai...
 
// 2. framework : jo kaam bhot repeat hone wala hai to framework usey asaan krte hai or usme pehle se 
// define features rehte hai or express node ka framework hai... 

// 3. (.then) in fetch :  then me agr fetch complete ho gya to uska response then me aata hai...

// 4. learn a website similar like amazon or flipkart :

// 5. now about the email and pass that how programmer know that the gmail is correct

// 6. stringify/parse : jo object ya array me data hai stringify 
// us json data ko string me convert kr ke dega or parse string ko json me convert krke deta hai 

// 7. cors : do origin ke beech me data jo share hota hai usko allow ya block kr skta hai usey cors 
// kehte hai or usey use krta hai 

// 8. e.preventDefault : apna jo kaam hota hai usey agr rokna hai to isey 
// use krte hai e.preventDefault sirf a tag me hi istemaal krte hai

// 9. span: kisi bhi particular cheez ko styling krna hai to span use hota hai jese ki p tag me kisi 
// cheez ko styling ke liye to span use krenge by default span inline element hai  

// 10. div : predefine div block space leta hai 
// by default div blovck element  

// 11. &:hover :  defi chahiye div or span ka bhi

// 12. overlay : defi chahiye schema ka bhi defi 

// 13. schema : schema bata ta hai ki tumhare database me kitni value jaane waali hai 

// 14. howe to use routing 