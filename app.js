const express = require("express");
const path = require("path");

const app = express();
//var pple = require('data.json');
//const router = express.Router();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://127.0.0.1/imgid', {useNewUrlParser: true});




const port = 4000;

//Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
   username: String,
   password: String
  });
  const Contacts = mongoose.model('Contact', contactSchema);


  const contactSchemaa = new mongoose.Schema({
    
    question: String,
    option1: String,
    option2: String,
    option3: String,
    option4: String,
    number: Number,
    code: Number,
    answer: Number
   });
  const quiz = mongoose.model('quiz', contactSchemaa);

 
  const contactSchema2 = new mongoose.Schema({
    code: Number
  });
  const code = mongoose.model('code', contactSchema);

// EXPRESS SPECIFIC STUFF
//app.use(express.static('static',option))
app.use(bodyparser.urlencoded({ extended: true }));
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

//app.set('view engine', 'html') // Set the template engine as html
//
//app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    
    const params = {}
    res.status(200).render('login.pug', params);
})

app.get('/register', (req, res)=>{
    
    const params = {}
    res.status(200).render('register.pug', params);
})


app.get('/login', (req, res)=>{
    
    const params = {}
    res.status(200).render('login.pug', params);
})
app.get('/base3', (req, res)=>{
    
    const params = {}
    res.status(200).render('base3.pug', params);
})



app.post('/register', (req, res)=>{
    var myData = new Contacts(req.body);
    myData.save().then(()=>{
        res.status(200).render('base.pug');
    }).catch(()=>{
        res.status(400).send("Item was not saved to the Database")
    });
});





app.post('/login', async (req, res)=>{
    try{
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
        const user = await Contact.findOne({email:email});
        if(user.password === password){
            res.status(200).render("home.pug");
        }else{
            res.status(200).render("base1.pug")
        }
    }catch(error){
        res.status(400).send("invalid Email")
    }
    
    
})

    
app.get('/mcqform', (req, res)=>{
    
    const params = {}
    res.status(200).render('mcqform.pug', params);
})
app.get('/scqform', (req, res)=>{
    
    const params = {}
    res.status(200).render('scqform.pug', params);
})
app.get('/yesno', (req, res)=>{
    
    const params = {}
    res.status(200).render('yesno.pug', params);
})

app.post('/mcqform', (req, res)=>{
    var ques = new quiz(req.body);
    ques.save().then(()=>{
        res.status(200).render('base2.pug');
    }).catch(()=>{
        res.status(400).send("Item was not saved to the Database")
    });
});

app.post('/scqform', (req, res)=>{
    var myData = new quiz(req.body);
    myData.save().then(()=>{
        res.status(200).render('base2.pug');
    }).catch(()=>{
        res.status(400).send("Item was not saved to the Database")
    });
});

app.post('/yesno', (req, res)=>{
    var ques = new quiz(req.body);
    ques.save().then(()=>{
        res.status(200).render('base2.pug');
    }).catch(()=>{
        res.status(400).send("Item was not saved to the Database")
    });
});
    app.get('/f1', (req, res)=>{
    
        const params = {}
        res.status(200).render('f1.pug', params);
    })

app.get('/scqform', (req, res)=>{
    
        
        res.status(200).render('scqform.pug');
    })

 app.get('/mcqform', (req, res)=>{
    
        
        res.status(200).render('mcqform.pug');
    })
app.get('/yesno', (req, res)=>{
    
        
        res.status(200).render('yesno.pug');
    })
    app.get('/a1', (req, res)=>{
    
        const params = {}
        res.status(200).render('a1.pug', params);
    })
    app.get('/home', (req, res)=>{
    
        const params = {}
        res.status(200).render('home.pug', params);
    })

    app.get('/base2', (req, res)=>{
    
        
        res.status(200).render('base2.pug');
    })

    app.get('/index', (req, res)=>{
        res.status(200).render('index.pug');
    })
    app.get('/attemptmcq', (req, res)=>{
    
        const params = {}
        res.status(200).render('attemptmcq.pug', params);
    })
    app.post('/attemptmcq',async(req,res)=>{
        const ques=await quiz.find({code:req.body.code});
        console.log(ques);
        if(ques.length!=0){
            res.render('index.pug',{ques});
        }
        else{
            let s='INVALID CODE!!'
            res.render('home',{s})
        }
    })
   
app.get('/trialcode', (req, res)=>{
    
    const params = {}
    res.status(200).render('trialcode.ejs', params);
})
app.get('/index1', (req, res)=>{
    
    const params = {}
    res.status(200).render('index1.ejs', params);
})
app.get('/s1', (req, res)=>{
    
    
    res.status(200).render('s1.html');
})















//
//
// Route to get all the questions from the database 
//p.get('/questions',(req,res)=>{
//  quiz.find().then(questions=>{
//      res.status(200).json(questions);
//  })
//  .catch(err=>{
//      console.log(err);
//      res.status(500).json({error: err});
//  });
//;
//
//Route to post the users selected answer and check if it is correct or not
//p.post('/questions/:id/answers',(req,res)=>{
//  const id = req.params.id;
//  const userAnswer= req.body.answer;
//
//
//find the question by id
//iz.findById(id).then(question=>{
//  //check if users answer is correct or wrong
//  if(question.answer === userAnswer){
//      res.status(200).json({result:'correct'});
//
//  }else{
//      res.status(200).json({result:'wrong'});
//  }
//
//atch(err=>{
//  console.log(err);
//  res.status(500).json({error:err});
//  
//
   

    
    
  //  res.status(200).render('contact.pug'); give error as do baar send krne ke koshish kr rhe hai


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
 